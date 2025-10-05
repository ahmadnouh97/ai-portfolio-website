#!/usr/bin/env python
"""
Final Polish Script for AI Engineer Portfolio

This script performs final checks and optimizations before deployment.
Run this script after completing development to ensure everything is ready for production.
"""

import os
import sys
import subprocess
import json
from pathlib import Path

# Add the project root to Python path
project_root = Path(__file__).parent.parent
sys.path.insert(0, str(project_root))

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portfolio.settings')

import django
django.setup()

from django.core.management import call_command
from django.conf import settings
from portfolio_app.models import Profile, Skill, Experience, Project


class Colors:
    """ANSI color codes for terminal output"""
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BLUE = '\033[94m'
    BOLD = '\033[1m'
    END = '\033[0m'


def print_header(text):
    """Print a formatted header"""
    print(f"\n{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.END}")
    print(f"{Colors.BLUE}{Colors.BOLD}{text.center(60)}{Colors.END}")
    print(f"{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.END}\n")


def print_success(text):
    """Print success message"""
    print(f"{Colors.GREEN}✓ {text}{Colors.END}")


def print_warning(text):
    """Print warning message"""
    print(f"{Colors.YELLOW}⚠ {text}{Colors.END}")


def print_error(text):
    """Print error message"""
    print(f"{Colors.RED}✗ {text}{Colors.END}")


def print_info(text):
    """Print info message"""
    print(f"{Colors.BLUE}ℹ {text}{Colors.END}")


def check_environment():
    """Check if environment is properly configured"""
    print_header("Environment Check")
    
    # Check Python version
    python_version = sys.version_info
    if python_version >= (3, 8):
        print_success(f"Python version: {python_version.major}.{python_version.minor}.{python_version.micro}")
    else:
        print_error(f"Python version {python_version.major}.{python_version.minor} is too old. Requires 3.8+")
        return False
    
    # Check Django installation
    try:
        import django
        print_success(f"Django version: {django.get_version()}")
    except ImportError:
        print_error("Django is not installed")
        return False
    
    # Check Node.js and npm
    try:
        node_version = subprocess.check_output(['node', '--version'], text=True).strip()
        npm_version = subprocess.check_output(['npm', '--version'], text=True).strip()
        print_success(f"Node.js version: {node_version}")
        print_success(f"npm version: {npm_version}")
    except (subprocess.CalledProcessError, FileNotFoundError):
        print_error("Node.js or npm is not installed")
        return False
    
    return True


def check_database():
    """Check database configuration and data"""
    print_header("Database Check")
    
    try:
        # Check if migrations are applied
        call_command('migrate', '--check', verbosity=0)
        print_success("All migrations are applied")
    except:
        print_warning("Migrations need to be applied")
        try:
            call_command('migrate', verbosity=0)
            print_success("Migrations applied successfully")
        except Exception as e:
            print_error(f"Failed to apply migrations: {e}")
            return False
    
    # Check if profile exists
    profile_count = Profile.objects.count()
    if profile_count == 0:
        print_warning("No profile found. Creating sample data...")
        try:
            call_command('populate_sample_data', verbosity=0)
            print_success("Sample data created successfully")
        except Exception as e:
            print_error(f"Failed to create sample data: {e}")
            return False
    else:
        print_success(f"Profile exists ({profile_count} profile(s))")
    
    # Check data completeness
    skills_count = Skill.objects.count()
    experiences_count = Experience.objects.count()
    projects_count = Project.objects.count()
    
    print_info(f"Skills: {skills_count}")
    print_info(f"Experiences: {experiences_count}")
    print_info(f"Projects: {projects_count}")
    
    if skills_count == 0:
        print_warning("No skills found. Consider adding skills through admin panel.")
    
    return True


def check_static_files():
    """Check static files configuration"""
    print_header("Static Files Check")
    
    # Check if node_modules exists
    node_modules_path = project_root / 'node_modules'
    if not node_modules_path.exists():
        print_warning("node_modules not found. Installing npm dependencies...")
        try:
            subprocess.run(['npm', 'install'], cwd=project_root, check=True)
            print_success("npm dependencies installed")
        except subprocess.CalledProcessError as e:
            print_error(f"Failed to install npm dependencies: {e}")
            return False
    else:
        print_success("node_modules directory exists")
    
    # Check if CSS is built
    css_output_path = project_root / 'static' / 'css' / 'output.css'
    if not css_output_path.exists():
        print_warning("CSS not built. Building Tailwind CSS...")
        try:
            subprocess.run(['npm', 'run', 'build-css-prod'], cwd=project_root, check=True)
            print_success("Tailwind CSS built successfully")
        except subprocess.CalledProcessError as e:
            print_error(f"Failed to build CSS: {e}")
            return False
    else:
        print_success("CSS output file exists")
    
    # Collect static files
    try:
        call_command('collectstatic', '--noinput', verbosity=0)
        print_success("Static files collected successfully")
    except Exception as e:
        print_error(f"Failed to collect static files: {e}")
        return False
    
    return True


def check_security():
    """Check security configuration"""
    print_header("Security Check")
    
    # Check DEBUG setting
    if settings.DEBUG:
        print_warning("DEBUG is True. Set DEBUG=False for production")
    else:
        print_success("DEBUG is False (production ready)")
    
    # Check SECRET_KEY
    if settings.SECRET_KEY == "django-insecure-sz9=jlsaxp8%u5lrqrp2_itt0q^&adfi&7u+e!ak+r@6d2b$(0":
        print_error("SECRET_KEY is using default value. Change it for production!")
    elif len(settings.SECRET_KEY) < 50:
        print_warning("SECRET_KEY is too short. Use at least 50 characters for production")
    else:
        print_success("SECRET_KEY is properly configured")
    
    # Check ALLOWED_HOSTS
    if not settings.DEBUG and not settings.ALLOWED_HOSTS:
        print_error("ALLOWED_HOSTS is empty. Configure it for production")
    elif settings.ALLOWED_HOSTS:
        print_success(f"ALLOWED_HOSTS configured: {settings.ALLOWED_HOSTS}")
    
    return True


def check_email_configuration():
    """Check email configuration"""
    print_header("Email Configuration Check")
    
    # Check EmailJS settings
    emailjs_settings = [
        'EMAILJS_PUBLIC_KEY',
        'EMAILJS_SERVICE_ID',
        'EMAILJS_TEMPLATE_ID',
        'EMAILJS_TO_EMAIL'
    ]
    
    missing_settings = []
    for setting in emailjs_settings:
        value = getattr(settings, setting, '')
        if not value:
            missing_settings.append(setting)
    
    if missing_settings:
        print_warning(f"Missing EmailJS settings: {', '.join(missing_settings)}")
        print_info("Contact form will not work without EmailJS configuration")
    else:
        print_success("EmailJS settings are configured")
    
    # Check email backend
    if hasattr(settings, 'EMAIL_BACKEND'):
        print_info(f"Email backend: {settings.EMAIL_BACKEND}")
    
    return True


def run_tests():
    """Run Django tests"""
    print_header("Running Tests")
    
    try:
        call_command('test', verbosity=1)
        print_success("All tests passed")
        return True
    except Exception as e:
        print_error(f"Tests failed: {e}")
        return False


def check_performance():
    """Check performance-related settings"""
    print_header("Performance Check")
    
    # Check if WhiteNoise is configured
    if 'whitenoise.middleware.WhiteNoiseMiddleware' in settings.MIDDLEWARE:
        print_success("WhiteNoise middleware is configured")
    else:
        print_warning("WhiteNoise middleware not found")
    
    # Check static files storage
    if hasattr(settings, 'STATICFILES_STORAGE'):
        print_info(f"Static files storage: {settings.STATICFILES_STORAGE}")
    
    # Check caching configuration
    if 'default' in settings.CACHES and settings.CACHES['default']['BACKEND'] != 'django.core.cache.backends.dummy.DummyCache':
        print_success("Caching is configured")
    else:
        print_info("No caching configured (consider Redis for production)")
    
    return True


def generate_deployment_summary():
    """Generate deployment summary"""
    print_header("Deployment Summary")
    
    # Get data counts
    profile_count = Profile.objects.count()
    skills_count = Skill.objects.count()
    experiences_count = Experience.objects.count()
    projects_count = Project.objects.count()
    
    # Get profile info if exists
    profile_info = "Not configured"
    if profile_count > 0:
        profile = Profile.objects.first()
        profile_info = f"{profile.full_name} - {profile.title}"
    
    summary = f"""
Portfolio Configuration Summary:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Profile: {profile_info}
Skills: {skills_count} configured
Experiences: {experiences_count} configured  
Projects: {projects_count} configured

Debug Mode: {'ON' if settings.DEBUG else 'OFF'}
Secret Key: {'Default (CHANGE!)' if settings.SECRET_KEY.startswith('django-insecure') else 'Configured'}
Allowed Hosts: {settings.ALLOWED_HOSTS if settings.ALLOWED_HOSTS else 'Not configured'}

Static Files: {'Collected' if (project_root / 'staticfiles').exists() else 'Not collected'}
CSS Built: {'Yes' if (project_root / 'static' / 'css' / 'output.css').exists() else 'No'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"""
    
    print(summary)
    
    # Deployment readiness check
    ready_for_production = True
    issues = []
    
    if settings.DEBUG:
        issues.append("DEBUG is True")
        ready_for_production = False
    
    if settings.SECRET_KEY.startswith('django-insecure'):
        issues.append("Using default SECRET_KEY")
        ready_for_production = False
    
    if not settings.ALLOWED_HOSTS and not settings.DEBUG:
        issues.append("ALLOWED_HOSTS not configured")
        ready_for_production = False
    
    if profile_count == 0:
        issues.append("No profile configured")
        ready_for_production = False
    
    if ready_for_production:
        print_success("✅ Portfolio is ready for production deployment!")
    else:
        print_warning("⚠️  Portfolio has issues that should be addressed before production:")
        for issue in issues:
            print_error(f"   • {issue}")
    
    return ready_for_production


def main():
    """Main function to run all checks"""
    print_header("AI Engineer Portfolio - Final Polish")
    print("This script will check your portfolio configuration and prepare it for deployment.\n")
    
    all_checks_passed = True
    
    # Run all checks
    checks = [
        ("Environment", check_environment),
        ("Database", check_database),
        ("Static Files", check_static_files),
        ("Security", check_security),
        ("Email Configuration", check_email_configuration),
        ("Performance", check_performance),
    ]
    
    for check_name, check_function in checks:
        try:
            if not check_function():
                all_checks_passed = False
        except Exception as e:
            print_error(f"Error in {check_name} check: {e}")
            all_checks_passed = False
    
    # Run tests if all checks passed
    if all_checks_passed:
        print_info("All checks passed. Running tests...")
        try:
            run_tests()
        except Exception as e:
            print_warning(f"Tests could not be run: {e}")
    
    # Generate deployment summary
    ready_for_production = generate_deployment_summary()
    
    # Final recommendations
    print_header("Next Steps")
    
    if ready_for_production:
        print_success("Your portfolio is ready for deployment!")
        print_info("Recommended next steps:")
        print("  1. Review the PRODUCTION_CHECKLIST.md")
        print("  2. Configure your production environment (.env file)")
        print("  3. Set up your web server (see DEPLOYMENT.md)")
        print("  4. Configure SSL/HTTPS")
        print("  5. Set up monitoring and backups")
    else:
        print_warning("Please address the issues above before deploying to production.")
        print_info("For development, you can start the server with:")
        print("  python manage.py runserver")
    
    print_info("\nFor detailed deployment instructions, see:")
    print("  • README.md - General setup and usage")
    print("  • DEPLOYMENT.md - Comprehensive deployment guide")
    print("  • PRODUCTION_CHECKLIST.md - Production readiness checklist")
    print("  • BROWSER_TESTING.md - Cross-browser testing guide")
    
    return 0 if all_checks_passed else 1


if __name__ == '__main__':
    sys.exit(main())