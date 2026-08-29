function MovieGrid({
  movies,
  onMovieClick,
  favorites,
  onToggleFavorite,
}) {
  return (
    <div className="movies-grid">
      {movies.map((movie) => {
        const isFavorite = favorites.some(
          (favorite) => favorite.id === movie.id
        );

        return (
          <div
            className="movie-card"
            key={movie.id}
            onClick={() => onMovieClick(movie)}
          >
            <button
              className="favorite-button"
              onClick={(event) => {
                event.stopPropagation();
                onToggleFavorite(movie);
              }}
              aria-label={
                isFavorite
                  ? "Remove from favorites"
                  : "Add to favorites"
              }
            >
              {isFavorite ? "♥" : "♡"}
            </button>

            <img
  src={
    movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "https://via.placeholder.com/500x750?text=No+Image"
  }
  alt={movie.title}
  className="movie-poster"
  onError={(event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src =
      "https://via.placeholder.com/500x750?text=No+Image";
  }}
/>

            <div className="movie-info">
              <h3 className="movie-title">
                {movie.title}
              </h3>

              <p className="movie-date">
                {movie.release_date || "N/A"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MovieGrid;