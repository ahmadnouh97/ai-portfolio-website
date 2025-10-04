from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_protect
from django.core.mail import send_mail
from django.conf import settings
from .models import Profile, Skill, Experience, Project, ContactMessage
from .forms import ContactForm


def home(request):
    """Main portfolio homepage"""
    try:
        profile = Profile.objects.first()
    except Profile.DoesNotExist:
        profile = None
    
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
    
    context = {
        'profile': profile,
        'skills_by_category': skills_by_category,
        'experiences': experiences,
        'projects': projects,
    }
    
    return render(request, 'portfolio/home.html', context)


@csrf_protect
def contact(request):
    """Handle contact form submissions"""
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
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