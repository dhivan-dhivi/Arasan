import React, { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Ensure high-performance optimized parameters for Unsplash images
  const getOptimizedSrc = (url: string) => {
    if (!url) return 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=640&q=70';
    if (url.includes('images.unsplash.com')) {
      // Remove any oversized dimension and replace with responsive web optimized format
      if (!url.includes('auto=format')) {
        return `${url}&auto=format&fit=crop&w=720&q=75`;
      }
      return url.replace(/w=\d+/, 'w=720').replace(/q=\d+/, 'q=75');
    }
    return url;
  };

  const finalSrc = hasError
    ? 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=640&q=70'
    : getOptimizedSrc(src);

  return (
    <div className={`relative overflow-hidden bg-slate-800 ${className}`}>
      {/* Subtle skeleton shimmer before load */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-pulse" />
      )}
      <img
        src={finalSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        referrerPolicy="no-referrer"
        {...props}
      />
    </div>
  );
};
