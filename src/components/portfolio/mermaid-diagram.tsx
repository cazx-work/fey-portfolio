'use client';

import { useEffect, useId, useState } from 'react';
import mermaid from 'mermaid';

export default function MermaidDiagram({ code }: { code: string }) {
  const id = `mermaid-${useId().replace(/:/g, '')}`;
  const [svg, setSvg] = useState<string>();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: 'base',
      flowchart: {
        htmlLabels: false,
        nodeSpacing: 42,
        rankSpacing: 52,
        padding: 18,
      },
      themeVariables: {
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace',
        fontSize: '17px',
        primaryColor: '#26364d',
        primaryTextColor: '#f1f5f9',
        primaryBorderColor: '#38bdf8',
        lineColor: '#38bdf8',
        textColor: '#f1f5f9',
        secondaryColor: '#1e293b',
        tertiaryColor: '#162338',
        actorBkg: '#26364d',
        actorBorder: '#38bdf8',
        actorTextColor: '#f1f5f9',
        signalColor: '#38bdf8',
        signalTextColor: '#f1f5f9',
      },
    });
    mermaid
      .render(id, code)
      .then(({ svg: rendered }) => {
        if (active) setSvg(rendered);
      })
      .catch(() => {
        if (active) setFailed(true);
      });
    return () => {
      active = false;
    };
  }, [code, id]);

  if (failed) {
    return (
      <div
        className="diagram-scroll diagram-scroll--text"
        role="img"
        aria-label="Architecture diagram"
      >
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  return (
    <div
      className="diagram-scroll"
      role="img"
      aria-label="Architecture diagram"
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    />
  );
}
