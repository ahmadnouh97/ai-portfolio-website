import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useIntersectionObserver = (
  options: UseIntersectionObserverOptions = {}
) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
  } = options;

  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isCurrentlyIntersecting = entry.isIntersecting;
          setIsIntersecting(isCurrentlyIntersecting);

          if (isCurrentlyIntersecting && !hasIntersected) {
            setHasIntersected(true);
            if (triggerOnce) {
              observer.unobserve(target);
            }
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [threshold, rootMargin, triggerOnce, hasIntersected]);

  return {
    targetRef,
    isIntersecting,
    hasIntersected,
  };
};

// Hook for lazy loading images
export const useLazyImage = (src: string, options?: UseIntersectionObserverOptions) => {
  const { targetRef, hasIntersected } = useIntersectionObserver(options);
  const [imageSrc, setImageSrc] = useState<string | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasIntersected && !imageSrc) {
      setImageSrc(src);
    }
  }, [hasIntersected, src, imageSrc]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  return {
    targetRef,
    imageSrc,
    isLoaded,
    hasError,
    handleLoad,
    handleError,
  };
};

// Hook for lazy loading components
export const useLazyComponent = (options?: UseIntersectionObserverOptions) => {
  const { targetRef, hasIntersected } = useIntersectionObserver(options);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (hasIntersected) {
      setShouldRender(true);
    }
  }, [hasIntersected]);

  return {
    targetRef,
    shouldRender,
  };
};