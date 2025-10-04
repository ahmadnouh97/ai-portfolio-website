# AI Engineer Portfolio

A modern, responsive portfolio website built with Django and Tailwind CSS, featuring a comprehensive admin dashboard for easy content management.

## Features

- **Responsive Design**: Mobile-first design that works on all devices
- **Dark/Light Theme**: Toggle between themes with system preference detection
- **Admin Dashboard**: Easy content management through Django admin
- **Contact Form**: Functional contact form with email notifications
- **SEO Optimized**: Meta tags, Open Graph tags, and structured data
- **Performance Optimized**: Image optimization, lazy loading, and caching

## Models

- **Profile**: Personal information, bio, social links, and media files
- **Skills**: Categorized skills with proficiency levels
- **Experience**: Work history with achievements and technologies
- **Projects**: Portfolio projects with images and links
- **Contact Messages**: Form submissions management

## Quick Start

### Prerequisites
- Python 3.8+
- Node.js 14+ (for Tailwind CSS)
- npm (comes with Node.js)

### Installation

1. **Install Python Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Install Node.js Dependencies**
   ```bash
   npm install
   ```

3. **Build Tailwind CSS**
   ```bash
   # For development (with watch mode)
   npm run build-css
   
   # For production (minified)
   npm run build-css-prod
   
   # Or use the build scripts
   # Windows:
   build-css.bat
   
   # Unix/Linux/macOS:
   chmod +x build-css.sh
   ./build-css.sh
   ```

4. **Run Django Setup**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py collectstatic
   ```

5. **Create Superuser**
   ```bash
   python manage.py createsuperuser
   ```

6. **Run Development Server**
   ```bash
   python manage.py runserver
   ```

7. **Access Admin Panel**
   - Go to `http://127.0.0.1:8000/admin/`
   - Login with your superuser credentials
   - Start adding your profile information, skills, experience, and projects

### Development Workflow

For active development with live CSS rebuilding:

1. **Terminal 1 - Django Server:**
   ```bash
   python manage.py runserver
   ```

2. **Terminal 2 - Tailwind CSS Watch:**
   ```bash
   npm run build-css
   ```

This setup will automatically rebuild your CSS when you make changes to templates or the Tailwind configuration.

## Configuration

1. **Environment Variables** (Optional)
   - Copy `.env.example` to `.env`
   - Update the values as needed

2. **Admin Setup**
   - Create your profile in the admin panel
   - Add your skills, categorized by type
   - Add your work experience
   - Upload and configure your projects
   - Customize the theme settings

## Project Structure

```
portfolio/
├── portfolio/              # Django project settings
├── portfolio_app/          # Main application
│   ├── models.py          # Database models
│   ├── admin.py           # Admin configuration
│   ├── views.py           # View functions
│   ├── forms.py           # Form definitions
│   └── urls.py            # URL patterns
├── templates/             # HTML templates
│   └── base.html          # Base template with Tailwind CSS
├── static/                # Static files
│   ├── src/
│   │   └── input.css      # Tailwind CSS source
│   ├── css/
│   │   └── output.css     # Generated CSS (do not edit)
│   └── js/
│       └── main.js        # JavaScript functionality
├── node_modules/          # Node.js dependencies (auto-generated)
├── media/                 # User uploaded files
├── package.json           # Node.js dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── requirements.txt       # Python dependencies
└── TAILWIND_SETUP.md      # Detailed Tailwind CSS setup guide
```

## Technologies Used

- **Backend**: Django 4.2+
- **Frontend**: HTML5, Tailwind CSS 3.4+, Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS with custom configuration, dark mode support
- **Build Tools**: Node.js, npm, Tailwind CLI
- **Database**: SQLite (development), PostgreSQL (production ready)
- **Image Processing**: Pillow
- **Static Files**: WhiteNoise

### Frontend Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark/Light Mode**: System preference detection with localStorage persistence
- **Modern JavaScript**: ES6+ features, modular architecture
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
- **Performance**: Lazy loading, optimized animations, minimal JavaScript
- **Cross-browser**: Support for modern browsers (Chrome 88+, Firefox 78+, Safari 14+)

## Deployment

The application is configured for easy deployment with:
- WhiteNoise for static file serving
- Environment-based configuration
- SQLite database (easily switchable to PostgreSQL)
- Comprehensive security settings

## Admin Features

- **Profile Management**: Single profile instance with all personal information
- **Skills Organization**: Categorized skills with proficiency levels and featured status
- **Experience Timeline**: Work history with achievements and technology tags
- **Project Showcase**: Featured projects with images, descriptions, and links
- **Contact Management**: View and manage contact form submissions
- **Media Handling**: Automatic image optimization and file management

## Customization

### Django Admin Customization
The portfolio is highly customizable through the Django admin:
- Update personal information and bio
- Manage skills and their categories
- Add/edit work experience and achievements
- Upload project images and descriptions
- Configure social media links
- Set SEO meta tags and descriptions

### Tailwind CSS Customization
The design system can be customized through Tailwind CSS:

**Colors**: Edit `tailwind.config.js` to modify the color palette:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom primary colors
        500: '#your-color',
      }
    }
  }
}
```

**Components**: Add custom component styles in `static/src/input.css`:
```css
@layer components {
  .your-component {
    @apply bg-primary-500 text-white p-4 rounded-lg;
  }
}
```

**Typography**: The project uses Inter font by default. To change fonts:
1. Update the Google Fonts link in `templates/base.html`
2. Modify `fontFamily` in `tailwind.config.js`

For detailed Tailwind CSS setup and customization instructions, see `TAILWIND_SETUP.md`.

## License

This project is open source and available under the MIT License.