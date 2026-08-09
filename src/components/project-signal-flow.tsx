'use client';

import { useState } from 'react';

type SignalStage = {
  title: string;
  detail: string;
  active?: boolean;
};

type ProjectSignalFlowProps = {
  stages: SignalStage[];
};

export function ProjectSignalFlow({ stages }: ProjectSignalFlowProps) {
  const initialIndex = Math.max(0, stages.findIndex((stage) => stage.active));
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  return (
    <div className="signal-flow" role="group" aria-label="Select a control flow stage">
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
              <span className="signal-flow__number">{String(index + 1).padStart(2, '0')}</span>
              <strong>{stage.title}</strong>
              <small>{stage.detail}</small>
            </button>
            {index < stages.length - 1 && <i aria-hidden="true">→</i>}
          </div>
        );
      })}
    </div>
  );
}
