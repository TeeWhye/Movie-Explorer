import { useEffect, useState } from "react";

import "./App.css";

import MovieGrid from "./components/MovieGrid";
import MovieModal from "./components/MovieModal";
import LoadingSkeleton from "./components/LoadingSkeleton";

import {
  getPopularMovies,
  searchMovies as searchMoviesApi,
  getMovieDetails,
} from "./services/tmdbApi";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState("popular");
  const [searchTitle, setSearchTitle] = useState("Popular Movies");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState(() => {
  const savedFavorites = localStorage.getItem("movieFavorites");

  return savedFavorites
    ? JSON.parse(savedFavorites)
    : [];
});
  const [movieDetails, setMovieDetails] = useState(null);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  useEffect(() => {
  localStorage.setItem(
    "movieFavorites",
    JSON.stringify(favorites)
  );
}, [favorites]);

  async function fetchPopularMovies(page = 1) {
  setLoading(true);
  setError("");

  try {
    const data = await getPopularMovies(page);

    setMovies(data.results);
    setSearchTitle("Popular Movies");
    setCurrentPage(data.page);
    setTotalPages(Math.min(data.total_pages, 500));
    setTotalResults(data.total_results);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    setError("We couldn't load the movies. Please try again.");
  } finally {
    setLoading(false);
  }
}

  async function searchMovies(query, page = 1) {
  setLoading(true);
  setError("");

  try {
    const data = await searchMoviesApi(query, page);

    setMovies(data.results);
    setSearchTitle(`Search Results for "${query}"`);
    setCurrentPage(data.page);
    setTotalPages(Math.min(data.total_pages, 500));
    setTotalResults(data.total_results);
  } catch (error) {
    console.error("Error searching movies:", error);
    setError("We couldn't complete your search. Please try again.");
  } finally {
    setLoading(false);
  }
}

function handlePageChange(page) {
  if (page < 1 || page > totalPages || page === currentPage) {
    return;
  }

  if (searchQuery.trim()) {
    searchMovies(searchQuery.trim(), page);
  } else {
    fetchPopularMovies(page);
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

async function fetchMovieDetails(movieId) {
  try {
    const data = await getMovieDetails(movieId);

    setMovieDetails(data);
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
}

  function handleSubmit(event) {
  event.preventDefault();

  const query = searchQuery.trim();

  if (query) {
    searchMovies(query, 1);
  } else {
    fetchPopularMovies(1);
  }
}

  function handleMovieClick(movie) {
  setSelectedMovie(movie);
  setMovieDetails(null);

  fetchMovieDetails(movie.id);
}

function toggleFavorite(movie) {
  setFavorites((currentFavorites) => {
    const alreadyFavorite = currentFavorites.some(
      (favorite) => favorite.id === movie.id
    );

    if (alreadyFavorite) {
      return currentFavorites.filter(
        (favorite) => favorite.id !== movie.id
      );
    }

    return [...currentFavorites, movie];
  });
}

  function handleCloseModal() {
  setSelectedMovie(null);
  setMovieDetails(null);
}

  return (
    <>
      <header className="app-header">
  <div className="header-inner">
    <div className="brand">
      <span className="brand-icon">🎬</span>
      <h1>
  Movie <span>Explorer</span>
</h1>
    </div>

     {activeView === "popular" && (
    <form className="search-form" onSubmit={handleSubmit}>
  <div className="search-input-wrapper">
    <span className="search-icon">⌕</span>

    <input
      type="text"
      placeholder="Search for movies..."
      value={searchQuery}
      onChange={(event) => setSearchQuery(event.target.value)}
      aria-label="Search for movies"
    />
  </div>

  <button type="submit" className="search-button">
    Search
  </button>

  {searchQuery && (
    <button
      type="button"
      className="clear-button"
      onClick={() => {
        setSearchQuery("");
        fetchPopularMovies();
      }}
    >
      Clear
    </button>
 )}
  </form>
)}

    <nav className="main-nav">
  <button
    className={
      activeView === "popular"
        ? "nav-button active"
        : "nav-button"
    }
    onClick={() => {
      setActiveView("popular");
      setSearchQuery("");
      fetchPopularMovies(1);
    }}
  >
    Popular
  </button>

  <button
    className={
      activeView === "favorites"
        ? "nav-button active"
        : "nav-button"
    }
    onClick={() => {
      setActiveView("favorites");
      setSearchQuery("");
    }}
  >
    ♥ Favorites
  </button>
</nav>
  </div>
</header>

      <main>
  {!loading &&
  !error &&
  (activeView === "favorites"
    ? favorites.length > 0
    : movies.length > 0) && (
    <div className="results-header">
      <h2>
        {activeView === "favorites"
          ? "My Favorites"
          : searchTitle}
      </h2>

      <span>
        {activeView === "favorites"
          ? `${favorites.length} movies`
          : `${totalResults} movies`}
      </span>
    </div>
  )}

  {loading ? (
  <LoadingSkeleton />
) : error ? (
    <div className="error-message">
      <h2>Something went wrong</h2>

      <p>{error}</p>

      <button onClick={() => fetchPopularMovies(1)}>
        Try Again
      </button>
    </div>
  ) : activeView === "favorites" &&
  favorites.length === 0 ? (
    
    <div className="empty-state">
  <div className="empty-icon">♥</div>

  <h2>No favorites yet</h2>

  <p>
    Movies you save will appear here.
  </p>

  <button
    className="browse-button"
    onClick={() => {
      setActiveView("popular");
      fetchPopularMovies(1);
    }}
  >
    Browse Movies
  </button>
</div>
  ) : (
    <>
      <MovieGrid
  movies={
    activeView === "favorites"
      ? favorites
      : movies
  }
  onMovieClick={handleMovieClick}
  favorites={favorites}
  onToggleFavorite={toggleFavorite}
/>

      {!loading && !error && movies.length > 0 && totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </>
  )}
</main>

      <MovieModal
  movie={movieDetails || selectedMovie}
  onClose={handleCloseModal}
/>
    </>
  );
}

export default App;