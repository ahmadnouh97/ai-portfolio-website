"""
Production settings for AI Engineer Portfolio

This file contains production-specific settings that override the base settings.
Import this in production environments or use DJANGO_SETTINGS_MODULE.
"""

from .settings import *
import os

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# Production hosts - update with your domain
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=['localhost', '127.0.0.1'])

# Security settings for production
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True
SECURE_SSL_REDIRECT = False
X_FRAME_OPTIONS = 'DENY'

# Session security
SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_AGE = 3600  # 1 hour
SESSION_EXPIRE_AT_BROWSER_CLOSE = True

# CSRF security
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = True

# Database configuration for production
# Uncomment and configure for PostgreSQL in production
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': env('DB_NAME', default='portfolio'),
#         'USER': env('DB_USER', default='portfolio_user'),
#         'PASSWORD': env('DB_PASSWORD'),
#         'HOST': env('DB_HOST', default='localhost'),
#         'PORT': env('DB_PORT', default='5432'),
#         'OPTIONS': {
#             'sslmode': 'require',
#         },
#     }
# }

# Static files configuration for production
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# Media files configuration
MEDIA_ROOT = BASE_DIR / 'media'

# Email configuration for production
EMAIL_BACKEND = env('EMAIL_BACKEND', default='django.core.mail.backends.smtp.EmailBackend')
EMAIL_HOST = env('EMAIL_HOST', default='smtp.gmail.com')
EMAIL_PORT = env('EMAIL_PORT', default=587)
EMAIL_USE_TLS = env('EMAIL_USE_TLS', default=True)
EMAIL_HOST_USER = env('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD', default='')
DEFAULT_FROM_EMAIL = env('DEFAULT_FROM_EMAIL', default='noreply@portfolio.com')

# Logging configuration for production
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '{levelname} {asctime} {module} {process:d} {thread:d} {message}',
            'style': '{',
        },
        'simple': {
            'format': '{levelname} {message}',
            'style': '{',
        },
    },
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse',
        },
    },
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': BASE_DIR / 'logs' / 'portfolio.log',
            'maxBytes': 1024*1024*10,  # 10 MB
            'backupCount': 10,
            'formatter': 'verbose',
        },
        'error_file': {
            'level': 'ERROR',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': BASE_DIR / 'logs' / 'portfolio_errors.log',
            'maxBytes': 1024*1024*10,  # 10 MB
            'backupCount': 5,
            'formatter': 'verbose',
        },
        'mail_admins': {
            'level': 'ERROR',
            'filters': ['require_debug_false'],
            'class': 'django.utils.log.AdminEmailHandler',
            'formatter': 'verbose',
        },
    },
    'root': {
        'handlers': ['file'],
        'level': 'INFO',
    },
    'loggers': {
        'django': {
            'handlers': ['file', 'error_file', 'mail_admins'],
            'level': 'INFO',
            'propagate': False,
        },
        'django.request': {
            'handlers': ['error_file', 'mail_admins'],
            'level': 'ERROR',
            'propagate': False,
        },
        'portfolio_app': {
            'handlers': ['file', 'error_file'],
            'level': 'INFO',
            'propagate': False,
        },
    },
}

# Cache configuration for production
# Uncomment to use Redis caching
# CACHES = {
#     'default': {
#         'BACKEND': 'django.core.cache.backends.redis.RedisCache',
#         'LOCATION': env('REDIS_URL', default='redis://127.0.0.1:6379/1'),
#         'OPTIONS': {
#             'CLIENT_CLASS': 'django_redis.client.DefaultClient',
#         },
#         'KEY_PREFIX': 'portfolio',
#         'TIMEOUT': 300,  # 5 minutes
#     }
# }

# Performance optimizations
USE_TZ = True
USE_I18N = False  # Disable if not using internationalization

# File upload settings
FILE_UPLOAD_MAX_MEMORY_SIZE = 5 * 1024 * 1024  # 5MB
DATA_UPLOAD_MAX_MEMORY_SIZE = 5 * 1024 * 1024  # 5MB
DATA_UPLOAD_MAX_NUMBER_FIELDS = 1000

# Admin settings
ADMINS = [
    ('Admin', env('ADMIN_EMAIL', default='admin@portfolio.com')),
]
MANAGERS = ADMINS

# Error reporting
SERVER_EMAIL = env('SERVER_EMAIL', default='server@portfolio.com')

# Content Security Policy (optional)
# Uncomment and configure if using django-csp
# CSP_DEFAULT_SRC = ("'self'",)
# CSP_SCRIPT_SRC = ("'self'", "'unsafe-inline'", "https://cdn.emailjs.com")
# CSP_STYLE_SRC = ("'self'", "'unsafe-inline'", "https://fonts.googleapis.com")
# CSP_FONT_SRC = ("'self'", "https://fonts.gstatic.com")
# CSP_IMG_SRC = ("'self'", "data:", "https:")
# CSP_CONNECT_SRC = ("'self'", "https://api.emailjs.com")

# Additional security headers
SECURE_REFERRER_POLICY = 'strict-origin-when-cross-origin'
SECURE_CROSS_ORIGIN_OPENER_POLICY = 'same-origin'