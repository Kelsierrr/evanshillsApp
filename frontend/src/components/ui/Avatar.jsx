import '../styles/Avatar.css';

export function Avatar({ src, alt, size = 40 }) {
  return (
    <div
      className="avatar"
      style={{ width: size + 'px', height: size + 'px' }}
    >
      {src ? (
        <img src={src} alt={alt} className="avatar-img" />
      ) : (
        <div className="avatar-fallback">{alt ? alt[0] : '?'}</div>
      )}
    </div>
  );
}
