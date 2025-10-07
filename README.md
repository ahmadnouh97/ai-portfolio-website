# AI Engineer Portfolio

A modern, responsive portfolio website built with Django and Tailwind CSS. Features an admin dashboard for easy content management and is perfect for showcasing AI/ML work.

## ✨ Features

- Modern responsive design with dark/light theme
- Admin dashboard for content management
- Contact form with EmailJS integration
- Resume upload and download functionality
- SEO optimized and accessible
- Docker ready

## 🚀 Quick Start

### Docker (Recommended)
```bash
git clone <your-repository-url>
cd my-portfolio
docker-compose up -d
```
Access at http://localhost:8000 (admin: `admin` / `admin123`)

### Local Development
```bash
git clone <your-repository-url>
cd my-portfolio
pip install -r requirements.txt
npm install
python manage.py migrate
python manage.py populate_sample_data
npm run build-css
python manage.py runserver
```

## ⚙️ Configuration

### Environment Variables (Optional)

Create a `.env` file for custom settings:

```bash
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1

# EmailJS (for contact form)
EMAILJS_PUBLIC_KEY=your-emailjs-public-key
EMAILJS_SERVICE_ID=your-emailjs-service-id
EMAILJS_TEMPLATE_ID=your-emailjs-template-id
```

## 📊 Admin Panel

Access the admin panel at `/admin/` to manage:

- **Profile**: Personal info, bio, social links, resume upload
- **Skills**: Categorized skills with proficiency levels
- **Experience**: Work history with achievements
- **Projects**: Portfolio projects with images and links
- **Messages**: Contact form submissions

### Sample Data
```bash
python manage.py populate_sample_data
```

## 🚀 Deployment

```bash
# Set production environment
DEBUG=False
SECRET_KEY=your-secure-key
ALLOWED_HOSTS=yourdomain.com

# Deploy with Docker
docker-compose up -d
```

## 🎨 Customization

- **Colors**: Edit `tailwind.config.js`
- **Templates**: Modify files in `templates/`
- **Content**: Use Django admin panel
- **Styles**: Update `static/src/input.css`

## 🛠️ Development

### Commands
```bash
# Django
python manage.py runserver
python manage.py migrate
python manage.py createsuperuser

# CSS
npm run build-css

# Docker
docker-compose up -d
```

### Project Structure
```
my-portfolio/
├── portfolio/          # Django settings
├── portfolio_app/      # Main app
├── templates/          # HTML templates
├── static/            # CSS, JS, images
├── media/             # User uploads
└── docker-compose.yml
```

## 🔧 Troubleshooting

**CSS not loading**: `npm run build-css`  
**Database errors**: `rm db.sqlite3 && python manage.py migrate`  
**Port in use**: `python manage.py runserver 8080`