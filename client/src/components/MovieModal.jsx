import { useEffect } from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const BACKDROP_BASE_URL =
  "https://image.tmdb.org/t/p/original";

function MovieModal({ movie, onClose }) {
  useEffect(() => {
    if (!movie) {
      return;
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [movie, onClose]);

  if (!movie) {
    return null;
  }

  

  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "N/A";

  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";

  const runtime = movie.runtime
    ? `${Math.floor(movie.runtime / 60)}h ${
        movie.runtime % 60
      }m`
    : "N/A";

  const language = movie.original_language
    ? movie.original_language.toUpperCase()
    : "N/A";

  const formatMoney = (amount) => {
    if (!amount) {
      return "N/A";
    }

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div
  className="modal"
  onClick={onClose}
  role="dialog"
  aria-modal="true"
  aria-labelledby="movie-modal-title"
>
      <div
        className="modal-content"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close movie details"
        >
          &times;
        </button>

        {movie.backdrop_path && (
          <div className="modal-backdrop">
            <img
  src={BACKDROP_BASE_URL + movie.backdrop_path}
  alt=""
  onError={(event) => {
    event.currentTarget.style.display = "none";
  }}
/>

            <div className="modal-backdrop-overlay"></div>
          </div>
        )}

        <div className="modal-body">
          <div className="modal-poster-wrapper">

            <img
  src={
    movie.poster_path
      ? IMAGE_BASE_URL + movie.poster_path
      : "https://via.placeholder.com/500x750?text=No+Image"
  }
  alt={movie.title}
  className="modal-poster"
  onError={(event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src =
      "https://via.placeholder.com/500x750?text=No+Image";
  }}
/>
          </div>

          <div className="modal-details">
            <h2 id="movie-modal-title">
  {movie.title}
</h2>

            <div className="modal-meta">
              <span>📅 {releaseYear}</span>

              <span className="modal-rating">
                ⭐ {rating}
              </span>

              <span>⏱️ {runtime}</span>
            </div>

            {movie.genres &&
              movie.genres.length > 0 && (
                <div className="genre-list">
                  {movie.genres.map((genre) => (
                    <span
                      className="genre-tag"
                      key={genre.id}
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

            <h3>Overview</h3>

            <p className="modal-overview">
              {movie.overview ||
                "No description available."}
            </p>

            <div className="movie-info-grid">
              <div className="info-item">
                <span className="info-label">
                  Status
                </span>

                <span className="info-value">
                  {movie.status || "N/A"}
                </span>
              </div>

              <div className="info-item">
                <span className="info-label">
                  Language
                </span>

                <span className="info-value">
                  {language}
                </span>
              </div>

              <div className="info-item">
                <span className="info-label">
                  Budget
                </span>

                <span className="info-value">
                  {formatMoney(movie.budget)}
                </span>
              </div>

              <div className="info-item">
                <span className="info-label">
                  Revenue
                </span>

                <span className="info-value">
                  {formatMoney(movie.revenue)}
                </span>
              </div>
            </div>

            {movie.production_companies &&
              movie.production_companies.length >
                0 && (
                <div className="production-section">
                  <h3>Production</h3>

                  <div className="production-list">
                    {movie.production_companies
                      .slice(0, 5)
                      .map((company) => (
                        <span
                          key={company.id}
                          className="production-company"
                        >
                          {company.name}
                        </span>
                      ))}
                  </div>
                </div>
              )}

            {movie.homepage && (
              <a
                href={movie.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="official-button"
              >
                Visit Official Website ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieModal;