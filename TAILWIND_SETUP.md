# Tailwind CSS Setup Guide

This project uses Tailwind CSS for styling with dark mode support and custom configurations.

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation

1. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

2. **Build Tailwind CSS:**
   
   **For development (with watch mode):**
   ```bash
   npm run build-css
   ```
   
   **For production (minified):**
   ```bash
   npm run build-css-prod
   ```
   
   **On Windows, you can also use:**
   ```cmd
   build-css.bat
   ```
   
   **On Unix/Linux/macOS:**
   ```bash
   chmod +x build-css.sh
   ./build-css.sh
   ```

## File Structure

```
├── tailwind.config.js          # Tailwind configuration
├── package.json                # Node.js dependencies
├── static/
│   ├── src/
│   │   └── input.css          # Tailwind source file
│   ├── css/
│   │   └── output.css         # Generated CSS (do not edit)
│   └── js/
│       └── main.js            # JavaScript functionality
└── templates/
    └── base.html              # Base template with Tailwind
```

## Features Included

### Dark Mode Support
- Class-based dark mode strategy
- System preference detection
- localStorage persistence
- Smooth theme transitions

### Custom Color Palette
- Primary colors (blue theme)
- Secondary colors (gray theme)
- Accent colors (amber theme)
- Full color scale (50-900)

### Custom Components
- Navigation links with active states
- Form inputs and textareas
- Buttons (primary/secondary)
- Cards with hover effects
- Glass morphism effects

### Responsive Design
- Mobile-first approach
- Custom breakpoints
- Responsive navigation
- Mobile hamburger menu

### Animations
- Fade in animations
- Slide up/down effects
- Scroll-triggered animations
- Smooth transitions

## Customization

### Colors
Edit `tailwind.config.js` to modify the color palette:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom primary colors
      }
    }
  }
}
```

### Components
Add custom component styles in `static/src/input.css`:

```css
@layer components {
  .your-component {
    @apply bg-primary-500 text-white p-4 rounded-lg;
  }
}
```

### Fonts
The project uses Inter font by default. To change:

1. Update the Google Fonts link in `base.html`
2. Modify `fontFamily` in `tailwind.config.js`

## Development Workflow

1. **Start development server:**
   ```bash
   python manage.py runserver
   ```

2. **In another terminal, start Tailwind watch mode:**
   ```bash
   npm run build-css
   ```

3. **Make changes to:**
   - `static/src/input.css` for custom styles
   - `tailwind.config.js` for configuration
   - Template files for HTML structure

4. **Tailwind will automatically rebuild CSS when files change**

## Production Deployment

Before deploying:

1. **Build production CSS:**
   ```bash
   npm run build-css-prod
   ```

2. **Collect static files:**
   ```bash
   python manage.py collectstatic
   ```

## Troubleshooting

### CSS not updating
- Ensure Tailwind build process is running
- Check that `static/css/output.css` exists
- Verify `STATIC_URL` and `STATICFILES_DIRS` in Django settings

### Dark mode not working
- Check browser console for JavaScript errors
- Verify theme toggle button has correct IDs
- Ensure `main.js` is loaded properly

### Mobile menu issues
- Check that mobile menu button and menu have correct IDs
- Verify JavaScript is loaded
- Test on actual mobile device, not just browser dev tools

## Browser Support

- Chrome/Edge 88+
- Firefox 78+
- Safari 14+
- Mobile browsers with CSS Grid support

## Performance Notes

- Production CSS is minified and optimized
- Unused CSS classes are purged automatically
- Font loading is optimized with `font-display: swap`
- Critical CSS is inlined for faster loading