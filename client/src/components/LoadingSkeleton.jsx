function LoadingSkeleton() {
  return (
    <div className="movies-grid skeleton-grid">
      {Array.from({ length: 12 }).map((_, index) => (
        <div className="skeleton-card" key={index}>
          <div className="skeleton-poster"></div>

          <div className="skeleton-info">
            <div className="skeleton-title"></div>
            <div className="skeleton-date"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LoadingSkeleton;