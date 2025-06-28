import '../styles/Alert.css';

export function Alert({ variant = 'default', title, children }) {
  return (
    <div className={`alert alert-${variant}`}>
      {title && <div className="alert-title">{title}</div>}
      <div className="alert-content">{children}</div>
    </div>
  );
}
