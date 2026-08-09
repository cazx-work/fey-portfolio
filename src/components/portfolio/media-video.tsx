'use client';

import { useState } from 'react';

type MediaVideoProps = React.VideoHTMLAttributes<HTMLVideoElement>;

export function MediaVideo({ children, ...props }: MediaVideoProps) {
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');

  return (
    <span className={`media-video media-video--${state}`}>
      {state === 'loading' && <span className="media-loading-indicator" role="status" aria-label="Loading video" />}
      {state === 'error' && <span className="media-video__error" role="status">Video unavailable. Use the still sequence below instead.</span>}
      <video
        {...props}
        onCanPlay={(event) => {
          setState('ready');
          props.onCanPlay?.(event);
        }}
        onError={(event) => {
          setState('error');
          props.onError?.(event);
        }}
      >
        {children}
      </video>
    </span>
  );
}