'use client';

import { useState } from 'react';

type TensionStage = {
  title: string;
  detail: string;
  active?: boolean;
};

type ProjectTensionProps = {
  stages: TensionStage[];
};

export function ProjectTension({ stages }: ProjectTensionProps) {
  const initialIndex = Math.max(
    0,
    stages.findIndex((stage) => stage.active),
  );
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  return (
    <div className="project-brief__tension-control">
      <div
        className="project-brief__stages grid grid-cols-3 gap-2 text-center text-xs text-[var(--muted)]"
        role="group"
        aria-label="Select a control boundary"
      >
        {stages.map((stage, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={stage.title}
              type="button"
              className={`project-brief__stage rounded-lg border p-2.5 ${isActive ? 'project-brief__stage--active border-[var(--accent)]' : 'border-[var(--line)]'}`}
              aria-pressed={isActive}
              onClick={() => setActiveIndex(index)}
            >
              <span className="project-brief__stage-number">0{index + 1}</span>
              <strong
                className={`block ${isActive ? 'text-[var(--accent)]' : 'text-[var(--ink)]'}`}
              >
                {stage.title}
              </strong>
              <span>{stage.detail}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
