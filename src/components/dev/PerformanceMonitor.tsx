import React, { useEffect, useState } from 'react';
import { measureWebVitals, measureResourcePerformance, type PerformanceMetrics } from '../../utils/performance';

interface PerformanceMonitorProps {
  enabled?: boolean;
}

const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({ 
  enabled = process.env.NODE_ENV === 'development' 
}) => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const loadMetrics = async () => {
      try {
        const webVitals = await measureWebVitals();
        setMetrics(webVitals);
      } catch (error) {
        console.warn('Failed to load performance metrics:', error);
      }
    };

    // Load metrics after initial render
    setTimeout(loadMetrics, 2000);

    // Add keyboard shortcut to toggle visibility (Ctrl/Cmd + Shift + P)
    const handleKeyPress = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'P') {
        event.preventDefault();
        setIsVisible(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [enabled]);

  if (!enabled || !isVisible) {
    return null;
  }

  const getScoreColor = (value: number, thresholds: { good: number; needs: number }) => {
    if (value <= thresholds.good) return 'text-green-600';
    if (value <= thresholds.needs) return 'text-yellow-600';
    return 'text-red-600';
  };

  const formatTime = (time?: number) => {
    if (!time) return 'N/A';
    return `${Math.round(time)}ms`;
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">Performance Metrics</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span>FCP (First Contentful Paint):</span>
          <span className={getScoreColor(metrics.fcp || 0, { good: 1800, needs: 3000 })}>
            {formatTime(metrics.fcp)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>LCP (Largest Contentful Paint):</span>
          <span className={getScoreColor(metrics.lcp || 0, { good: 2500, needs: 4000 })}>
            {formatTime(metrics.lcp)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>FID (First Input Delay):</span>
          <span className={getScoreColor(metrics.fid || 0, { good: 100, needs: 300 })}>
            {formatTime(metrics.fid)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>CLS (Cumulative Layout Shift):</span>
          <span className={getScoreColor((metrics.cls || 0) * 1000, { good: 100, needs: 250 })}>
            {metrics.cls ? metrics.cls.toFixed(3) : 'N/A'}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>TTFB (Time to First Byte):</span>
          <span className={getScoreColor(metrics.ttfb || 0, { good: 800, needs: 1800 })}>
            {formatTime(metrics.ttfb)}
          </span>
        </div>
      </div>
      
      <div className="mt-3 pt-2 border-t border-gray-200">
        <button
          onClick={() => {
            const resourceMetrics = measureResourcePerformance();
            console.log('📊 Resource Performance:', resourceMetrics);
          }}
          className="text-xs text-blue-600 hover:text-blue-800"
        >
          Log Resource Metrics
        </button>
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        Press Ctrl+Shift+P to toggle
      </div>
    </div>
  );
};

export default PerformanceMonitor;