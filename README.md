# AI Engineer Portfolio

A modern, responsive portfolio website built with Django and Tailwind CSS, featuring a comprehensive admin dashboard for easy content management. Perfect for AI engineers, data scientists, and ML practitioners who want to showcase their work professionally.

## 🚀 Features

- **🎨 Modern Design**: Clean, professional interface with smooth animations
- **📱 Fully Responsive**: Mobile-first design that works perfectly on all devices
- **🌙 Dark/Light Theme**: Toggle between themes with system preference detection
- **⚡ High Performance**: Optimized for speed with lazy loading and efficient caching
- **🔧 Admin Dashboard**: Easy content management through Django admin interface
- **📧 Contact Form**: Functional contact form with EmailJS integration
- **🔍 SEO Optimized**: Meta tags, Open Graph tags, and structured data markup
- **♿ Accessible**: WCAG 2.1 compliant with proper ARIA labels and keyboard navigation
- **🐳 Docker Ready**: Complete Docker setup for development and production

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Installation Methods](#installation-methods)
- [Configuration](#configuration)
- [Data Management](#data-management)
- [Deployment](#deployment)
- [Customization](#customization)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🚀 Quick Start

### Docker (Recommended)
```bash
git clone <your-repository-url>
cd ai-engineer-portfolio

# Configure environment (optional)
cp .env.example .env
# Edit .env with your settings

docker-compose up -d
```
Access at http://localhost:8000 (admin: `admin` / `admin123`)

### Local Development
```bash
# Install dependencies
pip install -r requirements.txt
npm install

# Setup and run
python manage.py migrate
python manage.py populate_sample_data
npm run build-css
python manage.py runserver
```

## 📦 Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- Git

### Local Setup
```bash
git clone <your-repository-url>
cd ai-engineer-portfolio
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
npm install
python manage.py migrate
python manage.py populate_sample_data
npm run build-css
python manage.py collectstatic
python manage.py runserver
```

### Docker Setup
```bash
# Configure environment
cp .env.example .env
# Edit .env with your settings

# Run
docker-compose up -d  # Production
docker-compose --profile dev up web-dev  # Development
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root:

```bash
# Django Core Settings
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1,yourdomain.com

# EmailJS Configuration (for contact form)
EMAILJS_PUBLIC_KEY=your-emailjs-public-key
EMAILJS_SERVICE_ID=your-emailjs-service-id
EMAILJS_TEMPLATE_ID=your-emailjs-template-id
EMAILJS_TO_EMAIL=your-email@domain.com

# Admin Settings
ADMIN_EMAIL=admin@yourdomain.com

# Optional: Email Backend (for server-side emails)
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
DEFAULT_FROM_EMAIL=noreply@yourdomain.com
```

### EmailJS Setup

For the contact form to work, you need to set up EmailJS:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create an email service and template
3. Add your credentials to the `.env` file
4. See [EMAILJS_SETUP.md](EMAILJS_SETUP.md) for detailed instructions

### Production Settings

For production deployment:

```bash
# Production environment
DEBUG=False
SECRET_KEY=your-very-secure-secret-key
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Security settings (automatically applied in production)
SECURE_SSL_REDIRECT=True
SECURE_HSTS_SECONDS=31536000
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
```

## 📊 Data Management

### Models Overview

The portfolio uses five main models:

- **👤 Profile**: Personal information, bio, social links, and media files
- **🛠️ Skills**: Categorized technical skills with proficiency levels
- **💼 Experience**: Work history with achievements and technologies used
- **🚀 Projects**: Portfolio projects with images, descriptions, and links
- **📧 Contact Messages**: Form submissions from visitors

### Admin Interface

Access the admin panel at `/admin/` to manage your content:

1. **Profile Management**
   - Single profile instance with all personal information
   - Upload profile image and resume
   - Configure social media links
   - Set SEO meta tags

2. **Skills Organization**
   - Categorized skills (Programming, AI/ML, Backend/Data, Tools, Cloud/MLOps)
   - Proficiency levels (Beginner, Intermediate, Advanced, Expert)
   - Years of experience tracking
   - Featured skills for homepage display

3. **Experience Timeline**
   - Work history with company details
   - Achievement lists in JSON format
   - Technology tags linking to skills
   - Automatic duration calculation

4. **Project Showcase**
   - Project descriptions and detailed information
   - Image uploads with automatic optimization
   - GitHub and demo links
   - Technology stack tagging

5. **Contact Management**
   - View and manage contact form submissions
   - Mark messages as read/unread
   - Export capabilities

### Sample Data

Load sample data to get started quickly:

```bash
python manage.py populate_sample_data
```

This creates:
- A sample profile for "Alex Chen"
- 25+ categorized skills
- 2 work experiences with achievements
- 3 featured projects

### Data Import/Export

```bash
# Export data
python manage.py dumpdata portfolio_app --indent 2 > portfolio_data.json

# Import data
python manage.py loaddata portfolio_data.json
```

## 🚀 Deployment

### Production Setup
```bash
# 1. Configure environment
cp .env.production .env
# Edit .env with your settings

# 2. Deploy with Docker
docker-compose up -d

# 3. Or deploy traditionally
pip install -r requirements.txt
npm run build-css-prod
python manage.py collectstatic --noinput
gunicorn portfolio.wsgi:application
```

### Production Checklist
- [ ] Set `DEBUG=False`
- [ ] Configure `SECRET_KEY` and `ALLOWED_HOSTS`
- [ ] Set up EmailJS for contact form
- [ ] Configure SSL/HTTPS

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🎨 Customization

### Theme Customization

The portfolio uses Tailwind CSS for styling. Customize colors, fonts, and components:

1. **Colors**: Edit `tailwind.config.js`
   ```javascript
   theme: {
     extend: {
       colors: {
         primary: {
           50: '#eff6ff',
           500: '#3b82f6',
           900: '#1e3a8a',
         }
       }
     }
   }
   ```

2. **Typography**: Update font families
   ```javascript
   fontFamily: {
     sans: ['Inter', 'system-ui', 'sans-serif'],
     mono: ['JetBrains Mono', 'monospace'],
   }
   ```

3. **Custom Components**: Add to `static/src/input.css`
   ```css
   @layer components {
     .btn-primary {
       @apply bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg;
     }
   }
   ```

### Layout Customization

1. **Templates**: Modify HTML templates in `templates/`
2. **Components**: Update individual sections
3. **Navigation**: Customize menu items and structure
4. **Footer**: Add additional links and information

### Content Customization

Through the Django admin interface:
- Update personal information and bio
- Manage skills and categories
- Add/edit work experience
- Upload project images and descriptions
- Configure social media links
- Set SEO meta tags

## 🛠️ Development

### Development Workflow

1. **Start Development Environment**
   ```bash
   # Terminal 1: Django development server
   python manage.py runserver
   
   # Terminal 2: Tailwind CSS watch mode
   npm run build-css
   ```

2. **Making Changes**
   - **Python/Django**: Changes auto-reload with `runserver`
   - **Templates**: Changes reflect immediately
   - **CSS/Tailwind**: Rebuilds automatically in watch mode
   - **JavaScript**: Changes reflect on page refresh

3. **Database Changes**
   ```bash
   # After model changes
   python manage.py makemigrations
   python manage.py migrate
   ```

### Project Structure

```
ai-engineer-portfolio/
├── 📁 portfolio/              # Django project settings
│   ├── settings.py           # Main settings file
│   ├── urls.py              # URL routing
│   └── wsgi.py              # WSGI configuration
├── 📁 portfolio_app/          # Main Django application
│   ├── models.py            # Database models
│   ├── views.py             # View functions
│   ├── admin.py             # Admin configuration
│   ├── forms.py             # Form definitions
│   ├── urls.py              # App URL patterns
│   └── 📁 management/        # Custom management commands
├── 📁 templates/              # HTML templates
│   ├── base.html            # Base template
│   ├── 404.html             # Error pages
│   └── 📁 portfolio/         # App-specific templates
├── 📁 static/                 # Static files
│   ├── 📁 src/               # Source files
│   │   └── input.css        # Tailwind CSS source
│   ├── 📁 css/               # Generated CSS
│   ├── 📁 js/                # JavaScript files
│   └── 📁 images/            # Static images
├── 📁 media/                  # User uploads
├── 📁 logs/                   # Application logs
├── 🐳 Dockerfile             # Docker configuration
├── 🐳 docker-compose.yml     # Docker Compose setup
├── 📦 package.json           # Node.js dependencies
├── 🎨 tailwind.config.js     # Tailwind configuration
├── 📋 requirements.txt       # Python dependencies
└── 📚 README.md              # This file
```

### Available Commands

```bash
# Django commands
python manage.py runserver          # Start development server
python manage.py migrate            # Apply database migrations
python manage.py createsuperuser    # Create admin user
python manage.py collectstatic      # Collect static files
python manage.py populate_sample_data # Load sample data

# Node.js commands
npm run build-css               # Build Tailwind CSS (watch mode)
npm run build-css-prod         # Build for production (minified)

# Docker commands
docker-compose up -d           # Start production environment
docker-compose --profile dev up # Start development environment
```

### Testing

```bash
# Run Django tests
python manage.py test

# Run with coverage
pip install coverage
coverage run --source='.' manage.py test
coverage report
coverage html
```

## 🔧 Troubleshooting

### Common Issues

1. **CSS not loading**
   ```bash
   # Rebuild CSS
   npm run build-css
   python manage.py collectstatic --noinput
   ```

2. **Database errors**
   ```bash
   # Reset database (development only)
   rm db.sqlite3
   python manage.py migrate
   python manage.py createsuperuser
   ```

3. **Permission errors (Linux/macOS)**
   ```bash
   # Fix file permissions
   chmod +x build-css.sh
   chmod +x docker-entrypoint.sh
   ```

4. **Port already in use**
   ```bash
   # Use different port
   python manage.py runserver 8080
   ```

5. **Node.js/npm issues**
   ```bash
   # Clear npm cache
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

### Debug Mode

Enable debug mode for development:

```bash
# In .env file
DEBUG=True

# Or set environment variable
export DEBUG=True
python manage.py runserver
```

### Logs

Check application logs:

```bash
# View logs
tail -f logs/portfolio.log

# Docker logs
docker logs portfolio
```

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup for Contributors

```bash
# Clone your fork
git clone https://github.com/yourusername/ai-engineer-portfolio.git
cd ai-engineer-portfolio

# Set up development environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
npm install

# Run tests
python manage.py test
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Django](https://djangoproject.com/) and [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Deployment made easy with [Docker](https://docker.com/)

## 📞 Support

- 📧 Email: [your-email@domain.com](mailto:your-email@domain.com)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/ai-engineer-portfolio/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/ai-engineer-portfolio/discussions)

---

**Made with ❤️ for the AI/ML community**