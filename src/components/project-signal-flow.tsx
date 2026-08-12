'use client';

import { useState } from 'react';
import { InlineIcon } from '@/components/inline-icon';

type SignalStage = {
  title: string;
  detail: string;
  active?: boolean;
};

type ProjectSignalFlowProps = {
  stages: SignalStage[];
};

export function ProjectSignalFlow({ stages }: ProjectSignalFlowProps) {
  const initialIndex = Math.max(
    0,
    stages.findIndex((stage) => stage.active),
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  if (stages.length === 0) {
    return (
      <div
        className="signal-flow__region signal-flow__region--empty"
        role="region"
        aria-label="Control flow stages"
      >
        <p className="signal-flow__empty">
          No control flow stages are available.
        </p>
      </div>
    );
  }

  return (
    <div
      className="signal-flow__region"
      role="region"
      aria-label="Control flow stages"
    >
      <p className="signal-flow__instruction">
        Scroll horizontally to explore all stages.
      </p>
      <div className="signal-flow">
        {stages.map((stage, index) => {
          const isActive = index === activeIndex;

          return (
            <div className="signal-flow__item" key={stage.title}>
              <button
                type="button"
                className={`signal-flow__card ${isActive ? 'signal-flow__active' : ''}`}
                aria-pressed={isActive}
                onClick={() => setActiveIndex(index)}
              >
                <span className="signal-flow__number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <strong>{stage.title}</strong>
                <small>{stage.detail}</small>
              </button>
              {/* Decorative connector between stages; hidden from assistive technology. */}
              {index < stages.length - 1 && (
                <InlineIcon name="arrow-right" className="signal-flow__arrow" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
