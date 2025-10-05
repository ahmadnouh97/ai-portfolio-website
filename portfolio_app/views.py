from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_protect
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from django.core.cache import cache
from datetime import timedelta
import re
import logging
from .models import Profile, Skill, Experience, Project, ContactMessage
from .forms import ContactForm

# Get logger for this module
logger = logging.getLogger(__name__)


def get_client_ip(request):
    """Get the client's IP address"""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def is_rate_limited(request):
    """Check if the client is rate limited"""
    ip = get_client_ip(request)
    cache_key = f"contact_rate_limit_{ip}"
    
    # Get current submission count for this IP
    submissions = cache.get(cache_key, [])
    now = timezone.now()
    
    # Remove submissions older than 1 minute
    submissions = [sub_time for sub_time in submissions if now - sub_time < timedelta(minutes=1)]
    
    # Check if too many submissions
    if len(submissions) >= 3:  # Max 3 submissions per minute
        return True
    
    # Add current submission
    submissions.append(now)
    cache.set(cache_key, submissions, 300)  # Cache for 5 minutes
    
    return False


def is_too_soon(request):
    """Check if submission is too soon after the last one"""
    ip = get_client_ip(request)
    last_submission_key = f"contact_last_submission_{ip}"
    
    last_submission = cache.get(last_submission_key)
    if last_submission:
        time_diff = timezone.now() - last_submission
        if time_diff < timedelta(seconds=10):  # Minimum 10 seconds between submissions
            return True
    
    cache.set(last_submission_key, timezone.now(), 300)  # Cache for 5 minutes
    return False


def contains_spam_content(name, email, subject, message):
    """Check if content contains spam patterns"""
    # Combine all text for analysis
    all_text = f"{name} {email} {subject} {message}".lower()
    
    # Common spam patterns
    spam_patterns = [
        # URLs (multiple or suspicious domains)
        r'https?://[^\s]+.*https?://[^\s]+',  # Multiple URLs
        r'\b\w+\.(tk|ml|ga|cf|gq|bit\.ly|tinyurl)\b',  # Suspicious domains
        
        # Excessive repetition
        r'(.)\1{4,}',  # Same character 5+ times
        r'(\b\w+\b)(\s+\1){3,}',  # Same word 4+ times
        
        # Excessive caps or punctuation
        r'[A-Z]{10,}',  # 10+ consecutive caps
        r'[!?]{3,}',    # Excessive punctuation
        
        # Common spam keywords
        r'\b(viagra|cialis|casino|lottery|winner|urgent|act now|limited time|free money|make money|work from home|click here|buy now|guaranteed|risk free|call now|bitcoin|cryptocurrency|investment opportunity|loan|credit|pharmacy|pills|weight loss|dating|singles|adult|xxx|replica|rolex|seo|backlinks|traffic|followers|likes|marketing|advertising|spam|bulk email|business opportunity|mlm|pyramid|scam|fraud|phishing|malware|virus)\b',
        
        # Suspicious patterns
        r'\b(dear friend|beneficiary|inheritance|million dollars|congratulations|you have won|claim your prize|limited offer|act fast|don\'t delete|urgent response|time sensitive|confidential|business proposal)\b'
    ]
    
    for pattern in spam_patterns:
        if re.search(pattern, all_text, re.IGNORECASE):
            return True
    
    return False


def has_honeypot_content(request):
    """Check if honeypot field is filled"""
    return bool(request.POST.get('website', '').strip())


def home(request):
    """Main portfolio homepage with error handling and logging"""
    try:
        profile = Profile.objects.first()
        logger.info(f"Portfolio homepage accessed by {get_client_ip(request)}")
    except Profile.DoesNotExist:
        profile = None
        logger.warning("No profile found in database")
    except Exception as e:
        logger.error(f"Error fetching profile: {str(e)}")
        profile = None
    
    try:
        # Get featured skills by category
        skills_by_category = {}
        for category, display_name in Skill.CATEGORY_CHOICES:
            skills = Skill.objects.filter(category=category, is_featured=True)
            if skills.exists():
                skills_by_category[display_name] = skills
        
        # Get recent experiences (limit to 3)
        experiences = Experience.objects.select_related('profile').prefetch_related('technologies')[:3]
        
        # Get featured projects (limit to 6)
        projects = Project.objects.filter(is_featured=True).prefetch_related('technologies')[:6]
        
    except Exception as e:
        logger.error(f"Error fetching portfolio data: {str(e)}")
        skills_by_category = {}
        experiences = []
        projects = []
    
    context = {
        'profile': profile,
        'skills_by_category': skills_by_category,
        'experiences': experiences,
        'projects': projects,
        'emailjs_public_key': settings.EMAILJS_PUBLIC_KEY,
        'emailjs_service_id': settings.EMAILJS_SERVICE_ID,
        'emailjs_template_id': settings.EMAILJS_TEMPLATE_ID,
        'emailjs_to_email': settings.EMAILJS_TO_EMAIL,
    }
    
    return render(request, 'portfolio/home.html', context)


@csrf_protect
def contact(request):
    """Handle contact form submissions with anti-spam protection"""
    if request.method == 'POST':
        # Server-side anti-spam checks
        error_message = None
        
        # Check honeypot
        if has_honeypot_content(request):
            error_message = 'Invalid submission detected.'
        
        # Check rate limiting
        elif is_rate_limited(request):
            error_message = 'Too many submissions. Please wait a minute before trying again.'
        
        # Check if too soon
        elif is_too_soon(request):
            error_message = 'Please wait at least 10 seconds before submitting again.'
        
        if error_message:
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({'success': False, 'error': error_message})
            else:
                messages.error(request, error_message)
                return redirect('portfolio:home')
        
        form = ContactForm(request.POST)
        if form.is_valid():
            # Additional spam content check
            if contains_spam_content(
                form.cleaned_data['name'],
                form.cleaned_data['email'],
                form.cleaned_data['subject'],
                form.cleaned_data['message']
            ):
                error_message = 'Your message contains content that appears to be spam. Please revise and try again.'
                if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                    return JsonResponse({'success': False, 'error': error_message})
                else:
                    messages.error(request, error_message)
                    return redirect('portfolio:home')
            
            # Save the message
            contact_message = ContactMessage.objects.create(
                name=form.cleaned_data['name'],
                email=form.cleaned_data['email'],
                subject=form.cleaned_data['subject'],
                message=form.cleaned_data['message']
            )
            
            # Send email notification (optional)
            try:
                profile = Profile.objects.first()
                if profile and profile.email:
                    send_mail(
                        subject=f"Portfolio Contact: {form.cleaned_data['subject']}",
                        message=f"From: {form.cleaned_data['name']} ({form.cleaned_data['email']})\n\n{form.cleaned_data['message']}",
                        from_email=settings.DEFAULT_FROM_EMAIL,
                        recipient_list=[profile.email],
                        fail_silently=True,
                    )
            except Exception:
                pass  # Email sending is optional
            
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({'success': True, 'message': 'Thank you for your message! I\'ll get back to you soon.'})
            else:
                messages.success(request, 'Thank you for your message! I\'ll get back to you soon.')
                return redirect('portfolio:home')
        else:
            if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
                return JsonResponse({'success': False, 'errors': form.errors})
            else:
                messages.error(request, 'Please correct the errors below.')
    else:
        form = ContactForm()
    
    return render(request, 'portfolio/contact.html', {'form': form})


def custom_404(request, exception):
    """Custom 404 error handler with logging"""
    logger.warning(f"404 error for URL: {request.path} from IP: {get_client_ip(request)}")
    return render(request, '404.html', status=404)


def custom_500(request):
    """Custom 500 error handler with logging"""
    logger.error(f"500 error for URL: {request.path} from IP: {get_client_ip(request)}")
    return render(request, '500.html', status=500)


def health_check(request):
    """Health check endpoint for Docker and load balancers"""
    try:
        # Basic database connectivity check
        from django.db import connection
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        
        # Check if we can access the Profile model
        Profile.objects.exists()
        
        return HttpResponse("OK", status=200, content_type="text/plain")
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return HttpResponse("FAIL", status=503, content_type="text/plain")