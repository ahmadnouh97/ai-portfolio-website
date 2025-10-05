# Contact Form Setup Guide

This document explains how the contact form functionality is implemented and how to configure email sending.

## Features Implemented

### ✅ Contact Form with Validation
- **Form Fields**: Name, Email, Subject, Message
- **Validation**: 
  - Name must be at least 2 characters
  - Valid email format required
  - Message must be at least 10 characters
- **CSRF Protection**: Enabled for security

### ✅ Email Functionality
- **Email Backend**: Configurable via environment variables
- **Development**: Uses console backend (emails appear in terminal)
- **Production**: Supports SMTP backend for real email sending
- **Notification**: Sends email to profile owner when form is submitted

### ✅ Contact Information Display
- **Contact Details**: Email, phone, location from profile
- **Social Media Links**: GitHub, LinkedIn, Twitter
- **Response Time**: Shows expected response time
- **Professional Layout**: Modern design with icons

### ✅ AJAX Form Submission
- **Seamless UX**: Form submits without page reload
- **Real-time Feedback**: Success/error messages appear instantly
- **Form Reset**: Clears form after successful submission
- **Error Handling**: Shows validation errors inline

### ✅ Admin Integration
- **Message Management**: View all contact messages in Django admin
- **Read Status**: Mark messages as read/unread
- **Search & Filter**: Find messages by name, email, subject, date
- **Read-only Fields**: Prevent accidental message modification

## Configuration

### Environment Variables

Add these to your `.env` file:

```bash
# Email Settings (Optional)
# For development, use console backend to see emails in terminal
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend

# For production, use SMTP backend
# EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=noreply@yourportfolio.com
```

### Gmail Setup (for production)

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. Use the generated password in `EMAIL_HOST_PASSWORD`

### Profile Configuration

1. Go to Django Admin (`/admin/`)
2. Add/edit your Profile with:
   - Email address (for receiving contact messages)
   - Phone number (optional)
   - Location (optional)
   - Social media links (optional)

## Usage

### For Visitors
1. Navigate to the contact section on the homepage
2. Fill out the contact form
3. Submit the form
4. Receive confirmation message

### For Portfolio Owner
1. Receive email notification when someone contacts you
2. View all messages in Django Admin
3. Mark messages as read after responding
4. Use contact information for follow-up

## Testing

Run the test suite to verify functionality:

```bash
# Run all contact-related tests
python manage.py test portfolio_app.tests

# Run specific test
python manage.py test portfolio_app.tests.ContactFormTests.test_contact_form_valid_submission
```

## Security Features

- **CSRF Protection**: All form submissions are protected
- **Input Validation**: Server-side validation prevents malicious input
- **Email Sanitization**: Email content is properly escaped
- **Rate Limiting**: Consider adding rate limiting for production use

## Customization

### Form Fields
Edit `portfolio_app/forms.py` to modify form fields or validation rules.

### Email Templates
The email content is currently plain text. You can enhance it by:
1. Creating HTML email templates
2. Using Django's email template system
3. Adding rich formatting

### Styling
The contact section uses Tailwind CSS classes. Modify the template in `templates/portfolio/home.html` to change the appearance.

## Troubleshooting

### Emails Not Sending
1. Check email backend configuration in settings
2. Verify SMTP credentials
3. Check spam folder
4. Review Django logs for errors

### Form Not Submitting
1. Check browser console for JavaScript errors
2. Verify CSRF token is present
3. Check Django logs for validation errors

### Admin Access Issues
1. Create superuser: `python manage.py createsuperuser`
2. Ensure ContactMessage is registered in admin
3. Check admin URL configuration

## Requirements Satisfied

This implementation satisfies the following requirements:

- **5.1**: Multiple contact methods (email, social media links)
- **5.2**: Contact form with validation and confirmation
- **5.3**: Professional contact information display
- **8.1**: Secure form handling with CSRF protection

The contact functionality is now fully implemented and ready for use!