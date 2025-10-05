from django.contrib import admin
from django.utils.html import format_html
from .models import Profile, Skill, Experience, Project, ContactMessage


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Personal Information', {
            'fields': ['full_name', 'title', 'bio', 'location']
        }),
        ('Contact Information', {
            'fields': ['email', 'phone']
        }),
        ('Social Media', {
            'fields': ['linkedin_url', 'github_url', 'twitter_url']
        }),
        ('Media Files', {
            'fields': ['profile_image', 'resume_file']
        }),
        ('SEO Settings', {
            'fields': ['meta_description', 'meta_keywords']
        }),
    ]
    
    list_display = ['full_name', 'title', 'email', 'updated_at']
    readonly_fields = ['created_at', 'updated_at']
    
    def has_add_permission(self, request):
        # Only allow one profile instance
        return not Profile.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # Don't allow deletion of profile
        return False


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'proficiency', 'years_experience', 'is_featured', 'order']
    list_filter = ['category', 'proficiency', 'is_featured']
    list_editable = ['proficiency', 'years_experience', 'is_featured', 'order']
    search_fields = ['name', 'category']
    ordering = ['category', 'order', 'name']
    
    fieldsets = [
        (None, {
            'fields': ['name', 'category', 'proficiency']
        }),
        ('Experience & Display', {
            'fields': ['years_experience', 'is_featured', 'order']
        }),
    ]


class SkillInline(admin.TabularInline):
    model = Experience.technologies.through
    extra = 1
    verbose_name = "Technology"
    verbose_name_plural = "Technologies Used"


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ['position', 'company', 'start_date', 'end_date', 'is_current', 'order']
    list_filter = ['is_current', 'start_date']
    list_editable = ['order']
    search_fields = ['position', 'company']
    ordering = ['-start_date', 'order']
    
    fieldsets = [
        ('Basic Information', {
            'fields': ['profile', 'position', 'company', 'location']
        }),
        ('Duration', {
            'fields': ['start_date', 'end_date', 'is_current']
        }),
        ('Details', {
            'fields': ['description', 'achievements']
        }),
        ('Display Settings', {
            'fields': ['order']
        }),
    ]
    
    filter_horizontal = ['technologies']
    
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        # Auto-select the profile if only one exists
        if Profile.objects.count() == 1:
            form.base_fields['profile'].initial = Profile.objects.first()
        return form
    
    # Optimize technologies queryset
    def formfield_for_manytomany(self, db_field, request, **kwargs):
        if db_field.name == "technologies":
            kwargs["queryset"] = Skill.objects.all().order_by('category', 'name')
        return super().formfield_for_manytomany(db_field, request, **kwargs)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_date', 'is_featured', 'has_github', 'has_demo', 'order']
    list_filter = ['is_featured', 'created_date']
    list_editable = ['is_featured', 'order']
    search_fields = ['title', 'description']
    ordering = ['-created_date', 'order']
    
    fieldsets = [
        ('Basic Information', {
            'fields': ['profile', 'title', 'description', 'detailed_description']
        }),
        ('Media & Links', {
            'fields': ['image', 'github_url', 'demo_url']
        }),
        ('Technologies', {
            'fields': ['technologies']
        }),
        ('Metadata', {
            'fields': ['created_date', 'is_featured', 'order']
        }),
    ]
    
    # Use filter_horizontal for better compatibility
    filter_horizontal = ['technologies']
    
    # Optimize database queries
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('profile').prefetch_related('technologies')
    
    # Limit the number of technologies shown in the widget
    def formfield_for_manytomany(self, db_field, request, **kwargs):
        if db_field.name == "technologies":
            kwargs["queryset"] = Skill.objects.all().order_by('category', 'name')
        return super().formfield_for_manytomany(db_field, request, **kwargs)
    
    def has_github(self, obj):
        return bool(obj.github_url)
    has_github.boolean = True
    has_github.short_description = 'GitHub'
    
    def has_demo(self, obj):
        return bool(obj.demo_url)
    has_demo.boolean = True
    has_demo.short_description = 'Demo'
    
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        # Auto-select the profile if only one exists
        if Profile.objects.count() == 1:
            form.base_fields['profile'].initial = Profile.objects.first()
        return form


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at', 'is_read']
    list_filter = ['is_read', 'created_at']
    list_editable = ['is_read']
    search_fields = ['name', 'email', 'subject']
    readonly_fields = ['name', 'email', 'subject', 'message', 'created_at']
    ordering = ['-created_at']
    
    fieldsets = [
        ('Message Details', {
            'fields': ['name', 'email', 'subject', 'message', 'created_at']
        }),
        ('Status', {
            'fields': ['is_read']
        }),
    ]
    
    def has_add_permission(self, request):
        # Don't allow adding messages through admin
        return False
    
    def message_preview(self, obj):
        return obj.message[:100] + "..." if len(obj.message) > 100 else obj.message
    message_preview.short_description = 'Message Preview'


# Customize admin site
admin.site.site_header = "AI Engineer Portfolio Admin"
admin.site.site_title = "Portfolio Admin"
admin.site.index_title = "Welcome to Portfolio Administration"