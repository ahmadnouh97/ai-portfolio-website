// Performance monitoring utilities
export interface PerformanceMetrics {
  fcp?: number; // First Contentful Paint
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  ttfb?: number; // Time to First Byte
}

// Web Vitals measurement
export const measureWebVitals = (): Promise<PerformanceMetrics> => {
  return new Promise((resolve) => {
    const metrics: PerformanceMetrics = {};

    // Measure FCP (First Contentful Paint)
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        metrics.fcp = fcpEntry.startTime;
      }
    });

    // Measure LCP (Largest Contentful Paint)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        metrics.lcp = lastEntry.startTime;
      }
    });

    // Measure FID (First Input Delay)
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (entry.processingStart && entry.startTime) {
          metrics.fid = entry.processingStart - entry.startTime;
        }
      });
    });

    // Measure CLS (Cumulative Layout Shift)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      metrics.cls = clsValue;
    });

    // Measure TTFB (Time to First Byte)
    const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    if (navigationEntries.length > 0) {
      const navEntry = navigationEntries[0];
      metrics.ttfb = navEntry.responseStart - navEntry.requestStart;
    }

    try {
      fcpObserver.observe({ entryTypes: ['paint'] });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      fidObserver.observe({ entryTypes: ['first-input'] });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }

    // Resolve after a delay to collect metrics
    setTimeout(() => {
      fcpObserver.disconnect();
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
      resolve(metrics);
    }, 5000);
  });
};

// Resource loading performance
export const measureResourcePerformance = () => {
  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
  
  const resourceMetrics = resources.map(resource => ({
    name: resource.name,
    duration: resource.duration,
    size: resource.transferSize || 0,
    type: getResourceType(resource.name),
    cached: resource.transferSize === 0 && resource.decodedBodySize > 0,
  }));

  return {
    totalResources: resources.length,
    totalSize: resourceMetrics.reduce((sum, r) => sum + r.size, 0),
    slowestResource: resourceMetrics.reduce((slowest, current) => 
      current.duration > slowest.duration ? current : slowest, resourceMetrics[0]),
    cachedResources: resourceMetrics.filter(r => r.cached).length,
    resourcesByType: groupResourcesByType(resourceMetrics),
  };
};

// Helper function to determine resource type
const getResourceType = (url: string): string => {
  if (url.match(/\.(js|jsx|ts|tsx)$/)) return 'script';
  if (url.match(/\.(css|scss|sass)$/)) return 'stylesheet';
  if (url.match(/\.(jpg|jpeg|png|gif|svg|webp|avif)$/)) return 'image';
  if (url.match(/\.(woff|woff2|ttf|eot)$/)) return 'font';
  if (url.match(/\.(mp4|webm|ogg|mp3|wav)$/)) return 'media';
  return 'other';
};

// Group resources by type
const groupResourcesByType = (resources: any[]) => {
  return resources.reduce((groups, resource) => {
    const type = resource.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(resource);
    return groups;
  }, {} as Record<string, any[]>);
};

// Bundle size analyzer
export const analyzeBundleSize = () => {
  const scripts = Array.from(document.querySelectorAll('script[src]')) as HTMLScriptElement[];
  const stylesheets = Array.from(document.querySelectorAll('link[rel="stylesheet"]')) as HTMLLinkElement[];
  
  return {
    scriptCount: scripts.length,
    stylesheetCount: stylesheets.length,
    scripts: scripts.map(script => ({
      src: script.src,
      async: script.async,
      defer: script.defer,
    })),
    stylesheets: stylesheets.map(link => ({
      href: link.href,
      media: link.media,
    })),
  };
};

// Performance recommendations
export const getPerformanceRecommendations = (metrics: PerformanceMetrics) => {
  const recommendations: string[] = [];

  if (metrics.fcp && metrics.fcp > 2500) {
    recommendations.push('Consider optimizing First Contentful Paint (FCP) - current: ' + Math.round(metrics.fcp) + 'ms');
  }

  if (metrics.lcp && metrics.lcp > 2500) {
    recommendations.push('Consider optimizing Largest Contentful Paint (LCP) - current: ' + Math.round(metrics.lcp) + 'ms');
  }

  if (metrics.fid && metrics.fid > 100) {
    recommendations.push('Consider optimizing First Input Delay (FID) - current: ' + Math.round(metrics.fid) + 'ms');
  }

  if (metrics.cls && metrics.cls > 0.1) {
    recommendations.push('Consider reducing Cumulative Layout Shift (CLS) - current: ' + metrics.cls.toFixed(3));
  }

  if (metrics.ttfb && metrics.ttfb > 600) {
    recommendations.push('Consider optimizing Time to First Byte (TTFB) - current: ' + Math.round(metrics.ttfb) + 'ms');
  }

  return recommendations;
};

// Log performance metrics to console (development only)
export const logPerformanceMetrics = async () => {
  if (process.env.NODE_ENV !== 'development') return;

  try {
    const webVitals = await measureWebVitals();
    const resourceMetrics = measureResourcePerformance();
    const bundleInfo = analyzeBundleSize();
    const recommendations = getPerformanceRecommendations(webVitals);

    console.group('🚀 Performance Metrics');
    console.table(webVitals);
    console.log('📦 Bundle Info:', bundleInfo);
    console.log('📊 Resource Metrics:', resourceMetrics);
    if (recommendations.length > 0) {
      console.warn('⚠️ Recommendations:', recommendations);
    }
    console.groupEnd();
  } catch (error) {
    console.warn('Performance monitoring error:', error);
  }
};