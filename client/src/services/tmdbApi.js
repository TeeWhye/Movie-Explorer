const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

export async function getPopularMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular movies.");
  }

  return response.json();
}

export async function searchMovies(query, page = 1) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
      query
    )}&page=${page}&include_adult=false`
  );

  if (!response.ok) {
    throw new Error("Failed to search movies.");
  }

  return response.json();
}

export async function getMovieDetails(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch movie details.");
  }

  return response.json();
}