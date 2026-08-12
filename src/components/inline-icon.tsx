type InlineIconName =
  | 'arrow-left'
  | 'arrow-right'
  | 'external'
  | 'close'
  | 'bolt'
  | 'tools'
  | 'shield';

type InlineIconProps = {
  name: InlineIconName;
  className?: string;
};

const paths: Record<InlineIconName, string> = {
  'arrow-left': 'M19 12H5m6-6-6 6 6 6',
  'arrow-right': 'M5 12h14m-6-6 6 6-6 6',
  external: 'M14 5h5v5m-1-4-8 8m-5 2V7a2 2 0 0 1 2-2h3',
  close: 'm6 6 12 12M18 6 6 18',
  bolt: 'm13 2-9 12h7l-1 8 9-12h-7l1-8Z',
  tools:
    'm14.7 6.3 3-3a4 4 0 0 0-5.2 5.2L5 16a2.1 2.1 0 1 0 3 3l7.5-7.5a4 4 0 0 0 5.2-5.2l-3 3-3-3Z',
  shield: 'M12 3 5 6v5c0 4.5 2.9 8.4 7 10 4.1-1.6 7-5.5 7-10V6l-7-3Z',
};

export function InlineIcon({ name, className }: InlineIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={`inline-icon ${className ?? ''}`.trim()}
      fill="none"
      focusable="false"
      height="1em"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.75"
      viewBox="0 0 24 24"
      width="1em"
    >
      <path d={paths[name]} />
    </svg>
  );
}
