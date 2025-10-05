# EmailJS Setup Guide

EmailJS is a secure, client-side email service that doesn't require exposing your email credentials. Here's how to set it up:

## Step 1: Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Connect Your Email Service

1. **Go to Email Services** in your EmailJS dashboard
2. **Click "Add New Service"**
3. **Choose Gmail** (or your preferred email provider)
4. **Connect your Gmail account** (`johndoe@gmail.com`)
5. **Note the Service ID** (you'll need this later)

## Step 3: Create Email Template

1. **Go to Email Templates** in your EmailJS dashboard
2. **Click "Create New Template"**
3. **Use this template structure**:

```
Subject: Portfolio Contact: {{subject}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. **Template Variables to use**:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Message subject
   - `{{message}}` - Message content
   - `{{to_email}}` - Your email (johndoe@gmail.com)

5. **Note the Template ID** (you'll need this later)

## Step 4: Get Your Public Key

1. **Go to Account** in your EmailJS dashboard
2. **Find your Public Key** (starts with something like `user_...` or similar)
3. **Copy this key**

## Step 5: Update Your Environment Variables

Add your EmailJS credentials to your `.env` file:

```bash
# EmailJS Settings
EMAILJS_PUBLIC_KEY=your-actual-public-key-from-step-4
EMAILJS_SERVICE_ID=your-actual-service-id-from-step-2
EMAILJS_TEMPLATE_ID=your-actual-template-id-from-step-3
EMAILJS_TO_EMAIL=ahmadnouh428@gmail.com
```

The code will automatically use these environment variables - no need to modify the template files!

## Step 6: Test the Setup

1. **Save your changes**
2. **Restart your Django server**
3. **Test the contact form**
4. **Check your email** (`johndoe@gmail.com`)

## Example Configuration

Here's what your `.env` file should look like after setup:

```bash
# EmailJS Settings
EMAILJS_PUBLIC_KEY=user_abc123def456
EMAILJS_SERVICE_ID=service_gmail_xyz
EMAILJS_TEMPLATE_ID=template_contact_123
EMAILJS_TO_EMAIL=ahmadnouh428@gmail.com
```

The application will automatically use these values - no code changes needed!

## Benefits of EmailJS

✅ **Secure**: No email credentials in your code
✅ **Free**: 200 emails/month on free plan
✅ **Reliable**: Handles email delivery
✅ **Client-side**: Works without server configuration
✅ **Analytics**: Track email delivery in dashboard

## Troubleshooting

### Emails not sending?
1. Check browser console for errors
2. Verify your Service ID, Template ID, and Public Key
3. Make sure your email service is connected in EmailJS dashboard
4. Check EmailJS dashboard for delivery status

### Emails going to spam?
1. Add your domain to EmailJS allowed origins
2. Consider using a custom domain for `from_email`
3. Ask recipients to whitelist your email

### Rate limiting?
- Free plan: 200 emails/month
- Paid plans available for higher volumes

## Security Notes

- EmailJS runs client-side, so your credentials are safe
- Your Public Key can be visible in the code (this is normal and safe)
- EmailJS handles all the secure email transmission
- No sensitive data is exposed in your application

## Next Steps

After setting up EmailJS:

1. **Test thoroughly** with different email providers
2. **Monitor the EmailJS dashboard** for delivery statistics
3. **Consider upgrading** if you need more than 200 emails/month
4. **Set up email templates** for different types of messages

This approach is much more secure than using SMTP credentials and is perfect for portfolio websites!