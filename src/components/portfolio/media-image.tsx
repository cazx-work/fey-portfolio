'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

type MediaImageProps = ImageProps & {
  loadingLabel?: string;
};

export function MediaImage({ loadingLabel = 'Loading image', onLoad, onError, ...props }: MediaImageProps) {
  const [state, setState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const optimizedSrc = typeof props.src === 'string' && props.src.startsWith('/images/') && !props.src.startsWith('/images/optimized/')
    ? props.src.replace(/^\/images\//, '/images/optimized/').replace(/\.(png|jpe?g)$/i, '.jpg')
    : props.src;

  return (
    <span className={`media-image media-image--${state} ${props.fill ? 'media-image--fill' : ''}`}>
      {state === 'loading' && <span className="media-loading-indicator" role="status" aria-label={loadingLabel} />}
      {state === 'error' ? (
        <span className="media-image__error" role="img" aria-label="Image unavailable">Image unavailable</span>
      ) : (
        <Image
          {...props}
          src={optimizedSrc}
          onLoad={(event) => {
            setState('loaded');
            onLoad?.(event);
          }}
          onError={(event) => {
            setState('error');
            onError?.(event);
          }}
        />
      )}
    </span>
  );
}
