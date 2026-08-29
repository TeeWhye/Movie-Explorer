# 🎬 Movie Explorer

A responsive movie discovery application built with React and the TMDB API.

Movie Explorer allows users to discover popular movies, search for specific titles, view detailed movie information, and save their favorite movies for later.

## ✨ Features

* 🎬 Browse popular movies
* 🔎 Search for movies by title
* 📄 Paginated search and movie results
* ⭐ View movie ratings
* 📅 View release dates
* 🎭 View movie genres
* ⏱️ View movie runtime
* 🖼️ Movie posters and backdrop images
* ❤️ Save movies to Favorites
* 💾 Favorites persist using browser local storage
* 📱 Responsive design for desktop and mobile
* ⏳ Loading skeletons while movies are being fetched
* ⚠️ User-friendly error and empty states
* 🎞️ Detailed movie information modal

## 🛠️ Technologies

* React
* JavaScript
* Vite
* CSS
* TMDB API
* Browser Local Storage
* ESLint

## 📁 Project Structure

```text
Movie-Explorer/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoadingSkeleton.jsx
│   │   │   ├── MovieCard.jsx
│   │   │   ├── MovieGrid.jsx
│   │   │   └── MovieModal.jsx
│   │   │
│   │   ├── services/
│   │   │   └── tmdbApi.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── .gitignore
│
├── LICENSE
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/TeeWhye/Movie-Explorer.git
```

### 2. Navigate into the project

```bash
cd Movie-Explorer/client
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure the TMDB API key

Create a `.env` file inside the `client` directory:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

The `.env` file is intentionally excluded from Git.

### 5. Start the development server

```bash
npm run dev
```

Then open the local URL provided by Vite in your browser.

## 🔐 Environment Variables

The application requires a TMDB API key.

Create:

```text
client/.env
```

and add:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

Never commit your `.env` file to the repository.

## 🏗️ Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 🎯 What I Learned

This project was built to strengthen my practical understanding of:

* React components
* React state management
* React hooks
* API integration
* Asynchronous JavaScript
* Search and pagination
* Conditional rendering
* Component communication through props
* Browser local storage
* Environment variables
* Responsive CSS
* Loading and error states
* Production builds with Vite
* Git and GitHub workflow

## 📌 Future Improvements

Potential future enhancements include:

* Movie trailers
* Advanced filtering
* Genre-based browsing
* Sorting by rating and release date
* User authentication
* Cloud-based favorite lists
* Improved accessibility
* Automated testing

## 📄 License

This project is licensed under the terms of the MIT License.
