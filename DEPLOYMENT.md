# Deployment Guide

Simple deployment options for the AI Engineer Portfolio.

## Prerequisites
- Docker (recommended) OR Python 3.8+ and Node.js 16+
- 1GB RAM minimum
- Domain name (for production)

## Quick Deployment

### Docker (Recommended)
```bash
# 1. Clone and configure
git clone <repository-url>
cd ai-engineer-portfolio
cp .env.example .env
# Edit .env with your production settings

# 2. Deploy
docker-compose up -d

# 3. Access
# Portfolio: http://localhost:8000
# Admin: http://localhost:8000/admin (admin/admin123)
```

### Traditional Hosting
```bash
# 1. Install dependencies
pip install -r requirements.txt
npm install

# 2. Configure
cp .env.production .env
# Edit .env with your settings

# 3. Build and deploy
npm run build-css-prod
python manage.py migrate
python manage.py collectstatic --noinput
gunicorn portfolio.wsgi:application --bind 0.0.0.0:8000
```

## Environment Configuration

### Required Settings (.env file)
```bash
# Basic settings
DEBUG=False
SECRET_KEY=your-very-secure-secret-key-change-this
ALLOWED_HOSTS=yourdomain.com,www.yourdomain.com

# Contact form (get from https://www.emailjs.com/)
EMAILJS_PUBLIC_KEY=your-emailjs-public-key
EMAILJS_SERVICE_ID=your-emailjs-service-id
EMAILJS_TEMPLATE_ID=your-emailjs-template-id
EMAILJS_TO_EMAIL=your-email@domain.com

# Admin
ADMIN_EMAIL=admin@yourdomain.com
DJANGO_SUPERUSER_USERNAME=admin
DJANGO_SUPERUSER_PASSWORD=secure-password
```

## Docker Commands

### Building

```bash
# Build production image
docker build -t portfolio:latest .

# Build with specific tag
docker build -t portfolio:v1.0.0 .
```

### Running

```bash
# Run production container
docker run -d \
  --name portfolio \
  -p 8000:8000 \
  --env-file .env \
  -v portfolio_media:/app/media \
  -v portfolio_db:/app/db.sqlite3 \
  portfolio:latest

# Run with custom port
docker run -d \
  --name portfolio \
  -p 80:8000 \
  -e PORT=8000 \
  --env-file .env \
  portfolio:latest
```

### Management

```bash
# View logs
docker logs portfolio

# Execute commands in container
docker exec -it portfolio python manage.py shell

# Create superuser manually
docker exec -it portfolio python manage.py createsuperuser

# Collect static files
docker exec -it portfolio python manage.py collectstatic --noinput

# Run migrations
docker exec -it portfolio python manage.py migrate
```

## Docker Compose Profiles

### Production Profile (default)

```bash
docker-compose up -d
```

Features:
- Production-optimized settings
- Persistent volumes for media and database
- Health checks enabled
- Automatic restart policy

### Development Profile

```bash
docker-compose --profile dev up web-dev
```

Features:
- Debug mode enabled
- Hot reload with volume mounting
- Development-friendly settings
- Console email backend

## Volume Management

### Persistent Data

The application uses volumes for:
- `media_data`: User-uploaded files (profile images, project images)
- `db_data`: SQLite database file
- `./logs`: Application logs (mounted from host)

### Backup

```bash
# Backup database
docker run --rm \
  -v portfolio_db_data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/db-backup-$(date +%Y%m%d).tar.gz -C /data .

# Backup media files
docker run --rm \
  -v portfolio_media_data:/data \
  -v $(pwd):/backup \
  alpine tar czf /backup/media-backup-$(date +%Y%m%d).tar.gz -C /data .
```

### Restore

```bash
# Restore database
docker run --rm \
  -v portfolio_db_data:/data \
  -v $(pwd):/backup \
  alpine tar xzf /backup/db-backup-YYYYMMDD.tar.gz -C /data

# Restore media files
docker run --rm \
  -v portfolio_media_data:/data \
  -v $(pwd):/backup \
  alpine tar xzf /backup/media-backup-YYYYMMDD.tar.gz -C /data
```

## Health Checks

The application includes built-in health checks:

- **Endpoint:** `/health/`
- **Interval:** 30 seconds
- **Timeout:** 30 seconds
- **Start period:** 40 seconds
- **Retries:** 3

Health check validates:
- Database connectivity
- Django application status
- Model accessibility

## Security Best Practices

### Container Security

1. **Non-root user:** Application runs as `django` user
2. **Minimal base image:** Uses Python slim image
3. **Security updates:** Regularly update base images
4. **Secrets management:** Use environment variables for sensitive data

### Production Security

1. **HTTPS:** Always use HTTPS in production
2. **Firewall:** Restrict access to necessary ports only
3. **Secrets:** Use Docker secrets or external secret management
4. **Updates:** Keep Docker and images updated

### Environment Security

```bash
# Use Docker secrets (Docker Swarm)
echo "your-secret-key" | docker secret create django_secret_key -

# Or use external secret management
docker run -d \
  --name portfolio \
  -e SECRET_KEY_FILE=/run/secrets/django_secret_key \
  portfolio:latest
```

## Monitoring

### Logs

```bash
# Follow logs
docker logs -f portfolio

# View specific number of lines
docker logs --tail 100 portfolio

# View logs with timestamps
docker logs -t portfolio
```

### Health Monitoring

```bash
# Check health status
docker inspect --format='{{.State.Health.Status}}' portfolio

# View health check logs
docker inspect --format='{{range .State.Health.Log}}{{.Output}}{{end}}' portfolio
```

### Resource Usage

```bash
# View resource usage
docker stats portfolio

# View detailed container info
docker inspect portfolio
```

## Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Use different port
   docker run -p 8080:8000 portfolio:latest
   ```

2. **Permission denied:**
   ```bash
   # Check file permissions
   ls -la docker-entrypoint.sh
   chmod +x docker-entrypoint.sh
   ```

3. **Database locked:**
   ```bash
   # Stop container and restart
   docker stop portfolio
   docker start portfolio
   ```

4. **Static files not loading:**
   ```bash
   # Recollect static files
   docker exec -it portfolio python manage.py collectstatic --noinput --clear
   ```

### Debug Mode

```bash
# Run with debug enabled
docker run -e DEBUG=True -p 8000:8000 portfolio:latest

# Access container shell
docker exec -it portfolio bash
```

## Production Deployment

### Reverse Proxy Setup (Nginx)

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    location /static/ {
        alias /var/www/portfolio/staticfiles/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    location /media/ {
        alias /var/www/portfolio/media/;
        expires 1y;
        add_header Cache-Control "public";
    }
}
```

### SSL/TLS with Let's Encrypt

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Process Management

```bash
# Using systemd
sudo tee /etc/systemd/system/portfolio.service > /dev/null <<EOF
[Unit]
Description=Portfolio Docker Container
Requires=docker.service
After=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
ExecStart=/usr/bin/docker-compose -f /path/to/docker-compose.yml up -d
ExecStop=/usr/bin/docker-compose -f /path/to/docker-compose.yml down
WorkingDirectory=/path/to/portfolio

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable portfolio
sudo systemctl start portfolio
```

## Performance Optimization

### Resource Limits

```yaml
# docker-compose.yml
services:
  web:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

### Caching

```bash
# Add Redis for caching
docker run -d --name redis redis:alpine
docker run --link redis:redis portfolio:latest
```

### Database Optimization

```bash
# SQLite optimization
docker exec -it portfolio python manage.py shell
>>> from django.db import connection
>>> cursor = connection.cursor()
>>> cursor.execute("PRAGMA journal_mode=WAL;")
>>> cursor.execute("PRAGMA synchronous=NORMAL;")
>>> cursor.execute("PRAGMA cache_size=10000;")
```

## Scaling

### Horizontal Scaling

```yaml
# docker-compose.yml
services:
  web:
    deploy:
      replicas: 3
    ports:
      - "8000-8002:8000"
```

### Load Balancing

```nginx
upstream portfolio_backend {
    server localhost:8000;
    server localhost:8001;
    server localhost:8002;
}

server {
    location / {
        proxy_pass http://portfolio_backend;
    }
}
```

## Cloud Deployment

### Heroku
```bash
# 1. Install Heroku CLI and login
heroku login
heroku create your-portfolio-app

# 2. Set environment variables
heroku config:set DEBUG=False
heroku config:set SECRET_KEY=your-secret-key
heroku config:set ALLOWED_HOSTS=your-portfolio-app.herokuapp.com

# 3. Deploy
git push heroku main
heroku run python manage.py migrate
heroku run python manage.py populate_sample_data
```

### Railway
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard:
   - `DEBUG=False`
   - `SECRET_KEY=your-secret-key`
   - `ALLOWED_HOSTS=your-app.railway.app`

### DigitalOcean App Platform
1. Create app from GitHub repository
2. Set environment variables in dashboard
3. Deploy automatically

## SSL/HTTPS Setup

### Let's Encrypt (Free SSL)
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Cloudflare (Alternative)
1. Add your domain to Cloudflare
2. Set SSL/TLS mode to "Full (strict)"
3. Enable "Always Use HTTPS"

## Backup (Optional)

### Simple Backup Script
```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d)
cp db.sqlite3 backups/db-$DATE.sqlite3
tar -czf backups/media-$DATE.tar.gz media/

# Add to crontab: 0 2 * * * /path/to/backup.sh
```

## Troubleshooting

### Common Issues
```bash
# Static files not loading
npm run build-css-prod
python manage.py collectstatic --noinput --clear

# Database errors
python manage.py migrate

# Permission errors (Linux)
sudo chown -R $USER:$USER .
chmod +x docker-entrypoint.sh

# Check logs
tail -f logs/portfolio.log
docker logs portfolio  # For Docker
```

### Health Check
```bash
# Test if app is running
curl http://localhost:8000/health/

# Check Docker status
docker-compose ps
```

That's it! Keep it simple. For complex setups, consider hiring a DevOps consultant.