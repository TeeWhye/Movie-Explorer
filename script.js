const API_KEY = 'YOUR_API_KEY_HERE';  
fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const moviesContainer = document.getElementById('movies-container');
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

const movieModal = document.getElementById('movie-modal');
const modalTitle = document.getElementById('modal-title');
const modalOverview = document.getElementById('modal-overview');
const modalReleaseDate = document.getElementById('modal-release-date');
const modalRating = document.getElementById('modal-rating');
const modalClose = document.getElementById('modal-close');

// Fetch and display popular movies on load
async function fetchPopularMovies() {
  try {
    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await res.json();
    displayMovies(data.results);
  } catch (error) {
    console.error('Error fetching popular movies:', error);
  }
}

function displayMovies(movies) {
  moviesContainer.innerHTML = '';

  movies.forEach(movie => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie-card');

    movieEl.innerHTML = `
      <img 
        src="${movie.poster_path ? IMAGE_BASE_URL + movie.poster_path : 'https://via.placeholder.com/500x750?text=No+Image'}" 
        alt="${movie.title}" 
        class="movie-poster"
      />
      <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
        <p class="movie-date">${movie.release_date || 'N/A'}</p>
      </div>
    `;

    // Show modal on click with movie details
    movieEl.addEventListener('click', () => {
      modalTitle.textContent = movie.title;
      modalOverview.textContent = movie.overview || 'No description available.';
      modalReleaseDate.textContent = movie.release_date || 'N/A';
      modalRating.textContent = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
      movieModal.classList.remove('hidden');
    });

    moviesContainer.appendChild(movieEl);
  });
}

// Search movies by query
async function searchMovies(query) {
  try {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`);
    const data = await res.json();
    displayMovies(data.results);
  } catch (error) {
    console.error('Error searching movies:', error);
  }
}

// Close modal handlers
modalClose.addEventListener('click', () => {
  movieModal.classList.add('hidden');
});

movieModal.addEventListener('click', (event) => {
  if (event.target === movieModal) {
    movieModal.classList.add('hidden');
  }
});

// Form submission handler
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const query = searchInput.value.trim();
  if (query) {
    searchMovies(query);
  } else {
    fetchPopularMovies();
  }
});

// Initial load
fetchPopularMovies();
