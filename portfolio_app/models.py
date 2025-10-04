from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Profile(models.Model):
    """Main profile model for the portfolio owner"""
    # Personal Information
    full_name = models.CharField(max_length=100)
    title = models.CharField(max_length=200)
    bio = models.TextField()
    location = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    
    # Social Links
    linkedin_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    twitter_url = models.URLField(blank=True)
    
    # Media
    profile_image = models.ImageField(upload_to='profile/', blank=True)
    resume_file = models.FileField(upload_to='documents/', blank=True)
    
    # SEO
    meta_description = models.TextField(max_length=160, blank=True)
    meta_keywords = models.CharField(max_length=255, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Profile"
        verbose_name_plural = "Profile"
    
    def __str__(self):
        return self.full_name


class Skill(models.Model):
    """Skills model with categories and proficiency levels"""
    CATEGORY_CHOICES = [
        ('programming', 'Programming Languages'),
        ('ai_ml', 'AI/ML Frameworks'),
        ('backend', 'Backend/Data'),
        ('tools', 'Engineering Tools'),
        ('cloud', 'Cloud/MLOps'),
    ]
    
    PROFICIENCY_CHOICES = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
        ('expert', 'Expert'),
    ]
    
    name = models.CharField(max_length=50)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    proficiency = models.CharField(max_length=20, choices=PROFICIENCY_CHOICES)
    years_experience = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0), MaxValueValidator(50)])
    is_featured = models.BooleanField(default=False, help_text="Display prominently on the homepage")
    order = models.PositiveIntegerField(default=0, help_text="Order for display (lower numbers first)")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['category', 'order', 'name']
        verbose_name = "Skill"
        verbose_name_plural = "Skills"
    
    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"


class Experience(models.Model):
    """Work experience model"""
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='experiences')
    company = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    location = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    is_current = models.BooleanField(default=False, help_text="Check if this is your current position")
    description = models.TextField()
    achievements = models.JSONField(default=list, help_text="List of key achievements")
    technologies = models.ManyToManyField(Skill, blank=True, help_text="Technologies used in this role")
    order = models.PositiveIntegerField(default=0, help_text="Order for display (lower numbers first)")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-start_date', 'order']
        verbose_name = "Experience"
        verbose_name_plural = "Experiences"
    
    def __str__(self):
        return f"{self.position} at {self.company}"
    
    @property
    def duration(self):
        """Calculate duration of employment"""
        from datetime import date
        end = self.end_date or date.today()
        start = self.start_date
        years = end.year - start.year
        months = end.month - start.month
        
        if months < 0:
            years -= 1
            months += 12
            
        if years > 0 and months > 0:
            return f"{years} year{'s' if years > 1 else ''}, {months} month{'s' if months > 1 else ''}"
        elif years > 0:
            return f"{years} year{'s' if years > 1 else ''}"
        elif months > 0:
            return f"{months} month{'s' if months > 1 else ''}"
        else:
            return "Less than a month"


class Project(models.Model):
    """Portfolio projects model"""
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='projects')
    title = models.CharField(max_length=100)
    description = models.TextField(help_text="Brief description for project cards")
    detailed_description = models.TextField(blank=True, help_text="Detailed description for project pages")
    image = models.ImageField(upload_to='projects/', blank=True)
    technologies = models.ManyToManyField(Skill, help_text="Technologies used in this project")
    github_url = models.URLField(blank=True)
    demo_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=False, help_text="Display prominently on the homepage")
    created_date = models.DateField()
    order = models.PositiveIntegerField(default=0, help_text="Order for display (lower numbers first)")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_date', 'order']
        verbose_name = "Project"
        verbose_name_plural = "Projects"
    
    def __str__(self):
        return self.title


class ContactMessage(models.Model):
    """Contact form submissions"""
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = "Contact Message"
        verbose_name_plural = "Contact Messages"
    
    def __str__(self):
        return f"Message from {self.name} - {self.subject}"