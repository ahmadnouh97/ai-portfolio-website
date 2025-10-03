interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = (baseUrl: string = 'https://ahmadnouh.dev'): string => {
  const urls: SitemapUrl[] = [
    {
      loc: baseUrl,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: 1.0,
    },
    {
      loc: `${baseUrl}/#about`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${baseUrl}/#projects`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: 0.9,
    },
    {
      loc: `${baseUrl}/#contact`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.7,
    },
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`;

  return sitemapXml;
};

export const generateRobotsTxt = (baseUrl: string = 'https://ahmadnouh.dev'): string => {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for respectful crawling
Crawl-delay: 1

# Disallow admin or private areas (if any)
# Disallow: /admin/
# Disallow: /private/`;
};

// Function to save sitemap (for build process)
export const saveSitemap = (outputPath: string, baseUrl?: string): void => {
  if (typeof window !== 'undefined') {
    console.warn('saveSitemap should only be called during build process');
    return;
  }

  try {
    const fs = require('fs');
    const path = require('path');
    
    const sitemapContent = generateSitemap(baseUrl);
    const robotsContent = generateRobotsTxt(baseUrl);
    
    // Ensure directory exists
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write sitemap.xml
    fs.writeFileSync(path.join(dir, 'sitemap.xml'), sitemapContent);
    
    // Write robots.txt
    fs.writeFileSync(path.join(dir, 'robots.txt'), robotsContent);
    
    console.log('✅ Sitemap and robots.txt generated successfully');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
  }
};