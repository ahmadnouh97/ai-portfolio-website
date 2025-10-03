import { writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const generateSitemap = (baseUrl = 'https://ahmadnouh.dev') => {
  const urls = [
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

const generateRobotsTxt = (baseUrl = 'https://ahmadnouh.dev') => {
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

// Generate files
const distPath = resolve(__dirname, '../dist');
const publicPath = resolve(__dirname, '../public');

try {
  // Create directories if they don't exist
  try {
    mkdirSync(distPath, { recursive: true });
  } catch (e) {
    // Directory might already exist
  }

  try {
    mkdirSync(publicPath, { recursive: true });
  } catch (e) {
    // Directory might already exist
  }

  const sitemapContent = generateSitemap();
  const robotsContent = generateRobotsTxt();

  // Write to both public (for development) and dist (for production)
  writeFileSync(resolve(publicPath, 'sitemap.xml'), sitemapContent);
  writeFileSync(resolve(publicPath, 'robots.txt'), robotsContent);
  
  try {
    writeFileSync(resolve(distPath, 'sitemap.xml'), sitemapContent);
    writeFileSync(resolve(distPath, 'robots.txt'), robotsContent);
  } catch (e) {
    // Dist folder might not exist during development
    console.log('Note: Could not write to dist folder (this is normal during development)');
  }

  console.log('✅ Sitemap and robots.txt generated successfully');
  console.log('📁 Files created:');
  console.log('   - public/sitemap.xml');
  console.log('   - public/robots.txt');
  if (distPath) {
    console.log('   - dist/sitemap.xml (if dist exists)');
    console.log('   - dist/robots.txt (if dist exists)');
  }
} catch (error) {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
}