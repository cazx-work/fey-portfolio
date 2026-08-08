type MediaPlaceholderProps = {
  type: 'Video' | 'Photo' | 'Diagram';
  title: string;
  description: string;
  className?: string;
};

export function YouTubeEmbed({
  videoId,
  title,
  description,
  className = '',
}: {
  videoId: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <figure className={`youtube-embed ${className}`}>
      <div className="youtube-embed__frame">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
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
