# Multi-stage Dockerfile for Django AI Engineer Portfolio

# Build stage for static assets
FROM node:18-alpine AS static-builder

WORKDIR /app

# Copy package files for Node.js dependencies (Tailwind CSS)
COPY package*.json ./
RUN npm ci

# Copy files needed for Tailwind CSS build
COPY static/ ./static/
COPY templates/ ./templates/
COPY portfolio_app/ ./portfolio_app/
COPY tailwind.config.js ./

# Build CSS with Tailwind for production
RUN npm run build-css-prod

# Production stage
FROM python:3.11-slim AS production

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    DJANGO_SETTINGS_MODULE=portfolio.settings \
    PORT=8000 \
    DJANGO_SUPERUSER_USERNAME=admin \
    DJANGO_SUPERUSER_EMAIL=admin@portfolio.com \
    DJANGO_SUPERUSER_PASSWORD=admin123

# Create non-root user for security
RUN groupadd -r django && useradd -r -g django django

# Install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        libpq-dev \
        curl \
        bash \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Set work directory
WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip \
    && pip install --no-cache-dir -r requirements.txt

# Copy entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Copy project files
COPY . .

# Copy built static assets from static-builder stage
COPY --from=static-builder /app/static/css/ ./static/css/

# Create necessary directories and set permissions
RUN mkdir -p /app/staticfiles /app/media /app/logs /app/data \
    && chown -R django:django /app \
    && chmod -R 755 /app

# Switch to non-root user
USER django

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:$PORT/health/ || exit 1

# Expose port
EXPOSE $PORT

# Set entrypoint
ENTRYPOINT ["docker-entrypoint.sh"]

# Default command
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--workers", "3", "--timeout", "120", "--access-logfile", "-", "--error-logfile", "-", "portfolio.wsgi:application"]