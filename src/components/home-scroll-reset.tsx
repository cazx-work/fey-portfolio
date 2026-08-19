'use client';

import { useLayoutEffect } from 'react';

export function HomeScrollReset() {
  useLayoutEffect(() => {
    if (window.location.hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return null;
}
