from django import forms
from django.core.validators import EmailValidator
from .models import ContactMessage


class ContactForm(forms.ModelForm):
    """Contact form with validation"""
    
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Your Name',
                'required': True
            }),
            'email': forms.EmailInput(attrs={
                'class': 'form-input',
                'placeholder': 'your.email@example.com',
                'required': True
            }),
            'subject': forms.TextInput(attrs={
                'class': 'form-input',
                'placeholder': 'Subject',
                'required': True
            }),
            'message': forms.Textarea(attrs={
                'class': 'form-textarea',
                'placeholder': 'Your message...',
                'rows': 5,
                'required': True
            }),
        }
    
    def clean_name(self):
        name = self.cleaned_data.get('name')
        if len(name) < 2:
            raise forms.ValidationError("Name must be at least 2 characters long.")
        return name
    
    def clean_message(self):
        message = self.cleaned_data.get('message')
        if len(message) < 10:
            raise forms.ValidationError("Message must be at least 10 characters long.")
        return message