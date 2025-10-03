import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

const SEOHead: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  image = '/og-image.jpg',
  url = 'https://ahmadnouh.dev',
  type = 'website',
  author = 'Ahmad Nouh',
  publishedTime,
  modifiedTime,
}) => {
  const location = useLocation();
  
  // Dynamic content based on route
  const getPageContent = () => {
    switch (location.pathname) {
      case '/about':
        return {
          title: 'About - Ahmad Nouh',
          description: 'Learn about Ahmad Nouh, an AI Engineer and Backend Developer with 5+ years of experience in machine learning, NLP, and scalable system architecture.',
          keywords: ['About Ahmad Nouh', 'AI Engineer Biography', 'Machine Learning Expert', 'Backend Developer Experience', 'Professional Background']
        };
      case '/projects':
        return {
          title: 'Projects - Ahmad Nouh',
          description: 'Explore Ahmad Nouh\'s portfolio of AI and backend development projects, including machine learning models, NLP applications, and scalable web solutions.',
          keywords: ['AI Projects', 'Machine Learning Portfolio', 'Backend Development Projects', 'NLP Applications', 'Ahmad Nouh Work']
        };
      case '/contact':
        return {
          title: 'Contact - Ahmad Nouh',
          description: 'Get in touch with Ahmad Nouh for AI engineering, machine learning consulting, and backend development opportunities.',
          keywords: ['Contact Ahmad Nouh', 'AI Engineer Contact', 'Machine Learning Consultant', 'Backend Developer Hire', 'Professional Services']
        };
      default:
        return {
          title: 'Ahmad Nouh - AI Engineer & Backend Developer',
          description: 'AI and Backend engineer with 5+ years of experience building intelligent systems and scalable solutions. Specializing in machine learning, NLP, and backend architecture.',
          keywords: ['AI Engineer', 'Machine Learning', 'Backend Developer', 'NLP', 'Python', 'TensorFlow', 'FastAPI', 'Data Science', 'Ahmad Nouh', 'Artificial Intelligence']
        };
    }
  };

  const pageContent = getPageContent();
  const finalTitle = title || pageContent.title;
  const finalDescription = description || pageContent.description;
  const finalKeywords = keywords || pageContent.keywords;
  const fullTitle = finalTitle.includes('Ahmad Nouh') ? finalTitle : `${finalTitle} | Ahmad Nouh`;
  const fullImageUrl = image.startsWith('http') ? image : `${url}${image}`;
  const currentUrl = `${url}${location.pathname}`;

  // Structured data for person/professional
  const personStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ahmad Nouh',
    jobTitle: 'AI Engineer & Backend Developer',
    description: finalDescription,
    url: url,
    image: fullImageUrl,
    sameAs: [
      'https://linkedin.com/in/ahmadnouh',
      'https://github.com/ahmadnouh',
      'https://twitter.com/ahmadnouh'
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'Natural Language Processing',
      'Backend Development',
      'Python Programming',
      'Data Science',
      'Deep Learning',
      'Software Architecture'
    ],
    alumniOf: {
      '@type': 'Organization',
      name: 'University'
    },
    worksFor: {
      '@type': 'Organization',
      name: 'MENT'
    }
  };

  // Structured data for website
  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ahmad Nouh Portfolio',
    description: finalDescription,
    url: url,
    author: {
      '@type': 'Person',
      name: 'Ahmad Nouh'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };

  // Structured data for professional service
  const professionalServiceData = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Ahmad Nouh - AI & Backend Development Services',
    description: 'Professional AI engineering and backend development services',
    provider: {
      '@type': 'Person',
      name: 'Ahmad Nouh'
    },
    areaServed: 'Worldwide',
    serviceType: [
      'AI Development',
      'Machine Learning Consulting',
      'Backend Development',
      'NLP Solutions',
      'Data Science'
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Viewport and Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#3b82f6" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${author} - AI Engineer Portfolio`} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content="Ahmad Nouh Portfolio" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={`${author} - AI Engineer Portfolio`} />
      <meta name="twitter:creator" content="@ahmadnouh" />
      <meta name="twitter:site" content="@ahmadnouh" />
      
      {/* Article specific meta tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(personStructuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteStructuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(professionalServiceData)}
      </script>
      
      {/* Additional SEO Meta Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Performance hints */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEOHead;