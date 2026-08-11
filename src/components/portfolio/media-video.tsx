'use client';

import { useState } from 'react';
import { useEffect, useRef } from 'react';

type MediaVideoProps = React.VideoHTMLAttributes<HTMLVideoElement> & {
  lazy?: boolean;
};

export function MediaVideo({ children, lazy = false, ...props }: MediaVideoProps) {
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [isNearViewport, setIsNearViewport] = useState(!lazy);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!lazy || isNearViewport || !videoRef.current || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '320px 0px' },
    );

    observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, [isNearViewport, lazy]);

  return (
    <span className={`media-video media-video--${state}`}>
      {state === 'loading' && <span className="media-loading-indicator" role="status" aria-label="Loading video" />}
      {state === 'error' && <span className="media-video__error" role="status">Video unavailable. Use the still sequence below instead.</span>}
      <video
        ref={videoRef}
        {...props}
        preload={lazy && !isNearViewport ? 'none' : props.preload}
        onCanPlay={(event) => {
          setState('ready');
          props.onCanPlay?.(event);
        }}
        onError={(event) => {
          setState('error');
          props.onError?.(event);
        }}
      >
        {isNearViewport && children}
      </video>
    </span>
  );
}