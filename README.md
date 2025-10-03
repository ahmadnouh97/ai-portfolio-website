# AI Portfolio Website

A modern, responsive portfolio website showcasing AI engineering expertise, built with cutting-edge web technologies and featuring a comprehensive content management system.

![Portfolio Preview](https://via.placeholder.com/800x400/3b82f6/ffffff?text=AI+Portfolio+Website)

## ✨ Features

### 🎨 Modern Design & User Experience
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **AI-Themed Animations**: Smooth animations with Framer Motion
- **Interactive Elements**: Engaging micro-interactions and visual feedback
- **Professional Branding**: Consistent color scheme and typography
- **Dark/Light Theme**: Adaptive design for user preference

### 🚀 Performance & SEO
- **Lightning Fast**: Sub-2-second load times with Vite optimization
- **SEO Optimized**: Meta tags, structured data, and Open Graph support
- **Progressive Web App**: Offline support and app-like experience
- **Image Optimization**: WebP format with lazy loading
- **Bundle Optimization**: Code splitting and tree shaking

### 📝 Content Management System
- **JSON-Based**: Easy content updates without code changes
- **Schema Validation**: Automatic validation of content structure
- **CLI Tools**: Command-line interface for content management
- **Backup System**: Automated content backup and restore
- **Version Control**: Track content changes with Git integration

### 🛠️ Developer Experience
- **TypeScript**: Full type safety and IntelliSense support
- **Modern Tooling**: Vite, ESLint, and automated testing
- **Component Architecture**: Reusable and maintainable components
- **Hot Reload**: Instant development feedback
- **Path Aliases**: Clean import statements with @ aliases

## 🏗️ Technology Stack

### Frontend Framework
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **Lucide React** - Beautiful & consistent icons
- **Custom Design System** - Professional color palette and typography

### Performance & SEO
- **React Helmet Async** - Dynamic meta tag management
- **Vite PWA Plugin** - Progressive Web App capabilities
- **Sitemap Generation** - Automated SEO sitemap creation
- **Bundle Analyzer** - Performance monitoring tools

### Development Tools
- **ESLint** - Code linting and formatting
- **Vitest** - Fast unit testing framework
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Path Aliases** - Clean import organization

### Content Management
- **AJV** - JSON schema validation
- **Custom CLI Tools** - Content management utilities
- **JSON Configuration** - Structured content storage

## 📁 Project Structure

```
ai-portfolio-website/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── layout/        # Header, Footer, Navigation
│   │   ├── sections/      # Hero, About, Projects, Contact
│   │   ├── ui/           # Reusable UI components
│   │   ├── interactive/  # Interactive elements
│   │   └── SEO/          # SEO components
│   ├── data/
│   │   ├── content/      # JSON content files
│   │   └── schemas/      # JSON validation schemas
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript definitions
│   └── assets/           # Images and media
├── scripts/              # Build and automation scripts
├── docs/                 # Documentation
└── dist/                 # Production build output
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 20.19+ or 22.12+
- **npm** or **yarn** package manager
- **Git** for version control

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### Development Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run preview         # Preview production build
npm run lint            # Run ESLint
npm run test            # Run tests once
npm run test:watch      # Run tests in watch mode

# Content Management
npm run content         # Content management CLI
npm run content:validate # Validate all content
npm run content:backup  # Create content backup

# Analysis & Optimization
npm run analyze         # Analyze bundle size
npm run generate:sitemap # Generate SEO sitemap
```

## 📝 Content Management

The portfolio uses a JSON-based content management system for easy updates without code changes.

### Quick Content Updates

1. **Edit JSON files** in `src/data/content/`:
   - `personal-info.json` - Personal information and contact details
   - `skills.json` - Skills and technologies
   - `experience.json` - Work experience and education
   - `projects.json` - Portfolio projects

2. **Use CLI tools** for advanced management:
   ```bash
   # List all content files
   npm run content list
   
   # Show specific content
   npm run content show personal-info.json
   
   # Validate content structure
   npm run content:validate
   
   # Create backup before changes
   npm run content:backup
   ```

### Content Structure Examples

#### Personal Information
```json
{
  "name": "Your Name",
  "title": "AI Engineer & Developer",
  "bio": "Passionate about artificial intelligence...",
  "contact": {
    "email": "your.email@example.com",
    "phone": "+1 (555) 123-4567",
    "location": "City, Country"
  },
  "socialLinks": [
    {
      "name": "LinkedIn",
      "url": "https://linkedin.com/in/yourprofile",
      "icon": "linkedin"
    }
  ]
}
```

#### Projects
```json
{
  "projects": [
    {
      "id": "unique-project-id",
      "title": "AI Project Name",
      "description": "Brief project description",
      "longDescription": "Detailed project explanation...",
      "technologies": ["Python", "TensorFlow", "React"],
      "category": "ai-ml",
      "featured": true,
      "images": ["project-image.jpg"],
      "demoUrl": "https://demo.example.com",
      "githubUrl": "https://github.com/username/project"
    }
  ]
}
```

For detailed content management documentation, see [CONTENT_MANAGEMENT_README.md](./CONTENT_MANAGEMENT_README.md).

## 🚀 Deployment

### Environment Configuration

Create environment files for different deployment stages:

```bash
# .env.local (development)
VITE_APP_TITLE="AI Portfolio - Dev"
VITE_CONTACT_EMAIL="dev@example.com"
VITE_ANALYTICS_ID="GA_MEASUREMENT_ID"

# .env.production (production)
VITE_APP_TITLE="John Doe - AI Engineer"
VITE_CONTACT_EMAIL="contact@Johndoe.com"
VITE_ANALYTICS_ID="G-XXXXXXXXXX"
```

### Deployment Platforms

#### Vercel (Recommended)
1. **Connect repository** to Vercel
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
3. **Set environment variables** in Vercel dashboard
4. **Deploy** automatically on push to main branch

#### Netlify
1. **Connect repository** to Netlify
2. **Configure build settings**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
3. **Set environment variables** in Netlify dashboard
4. **Enable form handling** for contact form

#### Manual Deployment
```bash
# Build for production
npm run build

# Upload dist/ folder to your hosting provider
# Ensure proper redirects for SPA routing
```

### Build Optimization

The build process includes several optimizations:

- **Code Splitting**: Vendor, animations, and icons are split into separate chunks
- **Minification**: JavaScript and CSS are minified with Terser
- **Source Maps**: Generated for production debugging
- **PWA Features**: Service worker and manifest generation
- **Sitemap**: Automatically generated for SEO

## 🧪 Testing

### Running Tests

```bash
# Run all tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test -- --coverage
```

### Test Structure

```
src/
├── components/
│   └── __tests__/        # Component tests
├── utils/
│   └── __tests__/        # Utility function tests
└── hooks/
    └── __tests__/        # Custom hook tests
```

### Testing Guidelines

- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test component interactions
- **Accessibility Tests**: Ensure WCAG compliance
- **Performance Tests**: Monitor Core Web Vitals

## 🔧 Troubleshooting

### Common Issues

#### Build Errors

**Issue**: TypeScript compilation errors
```bash
# Solution: Check type definitions
npm run lint
# Fix type errors in reported files
```

**Issue**: Missing dependencies
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### Development Server Issues

**Issue**: Port already in use
```bash
# Solution: Use different port
npm run dev -- --port 3001
```

**Issue**: Hot reload not working
```bash
# Solution: Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

#### Content Management Issues

**Issue**: Content validation errors
```bash
# Solution: Validate and fix content
npm run content:validate
# Check error messages and fix JSON structure
```

**Issue**: Content not updating
```bash
# Solution: Clear cache and rebuild
rm -rf dist/
npm run build
```

### Performance Issues

#### Slow Build Times
- Check bundle size: `npm run analyze`
- Remove unused dependencies
- Optimize images and assets

#### Runtime Performance
- Use React DevTools Profiler
- Check for unnecessary re-renders
- Optimize heavy animations

### Getting Help

1. **Check the documentation** in the `docs/` folder
2. **Run diagnostics**: `npm run content:validate`
3. **Check browser console** for runtime errors
4. **Review build logs** for compilation issues
5. **Use React DevTools** for component debugging

## 🤝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Make changes** and test thoroughly
4. **Run linting**: `npm run lint`
5. **Run tests**: `npm run test`
6. **Commit changes**: `git commit -m 'Add amazing feature'`
7. **Push to branch**: `git push origin feature/amazing-feature`
8. **Open Pull Request**

### Code Standards

- **TypeScript**: Use strict type checking
- **ESLint**: Follow configured linting rules
- **Prettier**: Use consistent code formatting
- **Conventional Commits**: Use semantic commit messages
- **Testing**: Write tests for new features

### Content Guidelines

- **JSON Structure**: Follow existing schema patterns
- **Image Optimization**: Use WebP format when possible
- **Accessibility**: Include alt text and ARIA labels
- **Performance**: Optimize file sizes and loading

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Vite Team** for the lightning-fast build tool
- **Tailwind CSS** for the utility-first approach
- **Framer Motion** for smooth animations
- **Open Source Community** for inspiration and tools

---

**Built with ❤️ by John Doe**

*Showcasing the intersection of AI engineering and modern web development*