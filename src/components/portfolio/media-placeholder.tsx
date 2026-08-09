type MediaPlaceholderProps = {
  type: 'Video' | 'Photo' | 'Diagram';
  title: string;
  description: string;
  className?: string;
};

export function LocalVideo({
  src,
  title,
  description,
  className = '',
}: {
  src: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <figure className={`youtube-embed ${className}`}>
      <div className="youtube-embed__frame">
        <video controls preload="metadata" playsInline aria-label={title}>
          <source src={src} type="video/mp4" />
          Your browser does not support the video element.
        </video>
      </div>
      <figcaption className="youtube-embed__caption">{description}</figcaption>
    </figure>
  );
}

export function MediaPlaceholder({
  type,
  title,
  description,
  className = '',
}: MediaPlaceholderProps) {
  return (
    <figure
      className={`media-placeholder ${className}`}
      aria-label={`${type} placeholder: ${title}`}
    >
      <div className="media-placeholder__icon" aria-hidden="true">
        {type === 'Video' ? '▶' : type === 'Photo' ? '▧' : '◇'}
      </div>
      <div>
        <p className="media-placeholder__status">Awaiting approved media</p>
        <h3 className="media-placeholder__title">{title}</h3>
        <figcaption className="media-placeholder__description">
          {description}
        </figcaption>
      </div>
    </figure>
  );
}
