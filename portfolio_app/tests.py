from django.test import TestCase, Client
from django.urls import reverse
from django.core import mail
from .models import ContactMessage, Profile
from .forms import ContactForm


class ContactFormTests(TestCase):
    def setUp(self):
        self.client = Client()
        self.contact_url = reverse('portfolio:contact')
        
        # Create a test profile
        self.profile = Profile.objects.create(
            full_name="Test User",
            title="AI Engineer",
            bio="Test bio",
            location="Test Location",
            email="test@example.com"
        )
    
    def test_contact_form_valid_submission(self):
        """Test that a valid contact form submission works"""
        form_data = {
            'name': 'John Doe',
            'email': 'john@example.com',
            'subject': 'Test Subject',
            'message': 'This is a test message with enough content.'
        }
        
        response = self.client.post(self.contact_url, form_data)
        
        # Check that the message was saved
        self.assertEqual(ContactMessage.objects.count(), 1)
        
        # Check the saved message
        message = ContactMessage.objects.first()
        self.assertEqual(message.name, 'John Doe')
        self.assertEqual(message.email, 'john@example.com')
        self.assertEqual(message.subject, 'Test Subject')
        self.assertEqual(message.message, 'This is a test message with enough content.')
        self.assertFalse(message.is_read)
    
    def test_contact_form_ajax_submission(self):
        """Test AJAX contact form submission"""
        form_data = {
            'name': 'Jane Doe',
            'email': 'jane@example.com',
            'subject': 'AJAX Test',
            'message': 'This is an AJAX test message with enough content.'
        }
        
        response = self.client.post(
            self.contact_url, 
            form_data,
            HTTP_X_REQUESTED_WITH='XMLHttpRequest'
        )
        
        # Check JSON response
        self.assertEqual(response.status_code, 200)
        json_response = response.json()
        self.assertTrue(json_response['success'])
        self.assertIn('Thank you for your message', json_response['message'])
        
        # Check that the message was saved
        self.assertEqual(ContactMessage.objects.count(), 1)
    
    def test_contact_form_validation_errors(self):
        """Test contact form validation"""
        # Test with invalid data
        form_data = {
            'name': 'A',  # Too short
            'email': 'invalid-email',  # Invalid email
            'subject': 'Test',
            'message': 'Short'  # Too short
        }
        
        response = self.client.post(
            self.contact_url,
            form_data,
            HTTP_X_REQUESTED_WITH='XMLHttpRequest'
        )
        
        # Check JSON response
        self.assertEqual(response.status_code, 200)
        json_response = response.json()
        self.assertFalse(json_response['success'])
        self.assertIn('errors', json_response)
        
        # Check that no message was saved
        self.assertEqual(ContactMessage.objects.count(), 0)
    
    def test_contact_form_display(self):
        """Test that the contact form displays correctly"""
        response = self.client.get(self.contact_url)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Contact Me')
        self.assertContains(response, 'form')
    
    def test_contact_form_csrf_protection(self):
        """Test that CSRF protection is enabled"""
        form_data = {
            'name': 'Test User',
            'email': 'test@example.com',
            'subject': 'Test Subject',
            'message': 'Test message with enough content.'
        }
        
        # Submit without CSRF token (enforce_csrf_checks=True)
        client = Client(enforce_csrf_checks=True)
        response = client.post(self.contact_url, form_data)
        # Should be forbidden due to CSRF protection
        self.assertEqual(response.status_code, 403)


class ContactFormModelTests(TestCase):
    def test_contact_form_validation(self):
        """Test ContactForm validation"""
        # Valid form
        form_data = {
            'name': 'John Doe',
            'email': 'john@example.com',
            'subject': 'Test Subject',
            'message': 'This is a test message with enough content.'
        }
        form = ContactForm(data=form_data)
        self.assertTrue(form.is_valid())
        
        # Invalid form - name too short
        form_data['name'] = 'A'
        form = ContactForm(data=form_data)
        self.assertFalse(form.is_valid())
        self.assertIn('name', form.errors)
        
        # Invalid form - message too short
        form_data['name'] = 'John Doe'
        form_data['message'] = 'Short'
        form = ContactForm(data=form_data)
        self.assertFalse(form.is_valid())
        self.assertIn('message', form.errors)


class ContactMessageModelTests(TestCase):
    def test_contact_message_creation(self):
        """Test ContactMessage model creation"""
        message = ContactMessage.objects.create(
            name='Test User',
            email='test@example.com',
            subject='Test Subject',
            message='Test message content'
        )
        
        self.assertEqual(str(message), 'Message from Test User - Test Subject')
        self.assertFalse(message.is_read)
        self.assertIsNotNone(message.created_at)
    
    def test_contact_message_ordering(self):
        """Test that contact messages are ordered by creation date (newest first)"""
        import time
        
        # Create two messages with a small delay
        message1 = ContactMessage.objects.create(
            name='User 1',
            email='user1@example.com',
            subject='First Message',
            message='First message content'
        )
        
        # Small delay to ensure different timestamps
        time.sleep(0.01)
        
        message2 = ContactMessage.objects.create(
            name='User 2',
            email='user2@example.com',
            subject='Second Message',
            message='Second message content'
        )
        
        # Get all messages
        messages = list(ContactMessage.objects.all())
        
        # Second message should come first (newest first)
        self.assertEqual(messages[0], message2)
        self.assertEqual(messages[1], message1)
