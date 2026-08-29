const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie, onMovieClick }) {
  const releaseYear = movie.release_date
    ? movie.release_date.substring(0, 4)
    : "N/A";

  const rating = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "N/A";

  return (
    <article
      className="movie-card"
      onClick={() => onMovieClick(movie)}
    >
      <div className="movie-poster-wrapper">
        <img
          src={
            movie.poster_path
              ? IMAGE_BASE_URL + movie.poster_path
              : "https://via.placeholder.com/500x750?text=No+Image"
          }
          alt={movie.title}
          className="movie-poster"
        />

        <div className="movie-overlay">
          <span className="view-details">
            View Details
          </span>
        </div>

        <div className="rating-badge">
          ⭐ {rating}
        </div>
      </div>

      <div className="movie-info">
        <h3 className="movie-title">
          {movie.title}
        </h3>

        <p className="movie-date">
          {releaseYear}
        </p>
      </div>
    </article>
  );
}

export default MovieCard;