import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Layout } from './components/layout'
import { HomePage, AboutPage, ProjectsPage, ContactPage } from './pages'
import SEOHead from './components/SEO/SEOHead'
import PerformanceMonitor from './components/dev/PerformanceMonitor'
import { logPerformanceMetrics } from './utils/performance'

function App() {
  useEffect(() => {
    // Remove loading spinner when app loads
    document.body.classList.add('app-loaded')
    
    // Log performance metrics in development
    if (process.env.NODE_ENV === 'development') {
      // Delay to allow initial render
      setTimeout(() => {
        logPerformanceMetrics()
      }, 2000)
    }
    
    // Preload critical images
    const criticalImages = [
      '/og-image.jpg',
      '/projects/arabic-nlp-1.jpg',
      '/projects/spam-detection-1.jpg'
    ]
    
    criticalImages.forEach(src => {
      const img = new Image()
      img.src = src
    })
  }, [])

  return (
    <HelmetProvider>
      <Router>
        <SEOHead />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Layout>
        <PerformanceMonitor />
      </Router>
    </HelmetProvider>
  )
}

export default App
