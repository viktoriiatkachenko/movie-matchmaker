import { getGenreNamesFromIds } from "./mood.js";
import { openMovieModal } from "./modal.js";

export function renderMovies(resultsContainer, movies, genreList, moods, append = false) {
  if (!append) {
    resultsContainer.innerHTML = "";
  }

  movies.forEach((movie, index) => {
    const rating = Math.round(movie.vote_average * 10) / 10;

    const card = document.createElement("div");
    card.classList.add("movie-card");

    const movieGenres = getGenreNamesFromIds(movie.genre_ids, genreList);
    const imageUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "";

    card.innerHTML = `
      ${imageUrl ? `<img src="${imageUrl}" alt="${movie.title}" />` : ""}
      <h3>${movie.title}</h3>
      <p>⭐ ${rating}</p>
      <p class="movie-genres">${movieGenres.join(", ") || "Unknown"}</p>
    `;

    card.addEventListener("click", function () {
      openMovieModal(movie, genreList, moods);
    });

    resultsContainer.appendChild(card);
  });
}

export function renderBestMatch(container, movie, genreList, moods) {
  container.innerHTML = "";

  const movieGenres = getGenreNamesFromIds(movie.genre_ids, genreList);
  const rating = Math.round(movie.vote_average * 10) / 10;
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "";

  const card = document.createElement("div");
  card.classList.add("best-match-card");

  card.innerHTML = `
    <div class="best-match-card__image">
      ${imageUrl ? `<img src="${imageUrl}" alt="${movie.title}" />` : ""}
    </div>

    <div class="best-match-card__content">
      <p class="hero-badge">Top recommendation</p>
      <h3>${movie.title}</h3>
      <p>⭐ ${rating}</p>
      <p class="movie-genres">${movieGenres.join(", ") || "Unknown"}</p>
      <p class="movie-overview">
        ${movie.overview || "No description available."}
      </p>
    </div>
  `;

  card.addEventListener("click", function () {
    openMovieModal(movie, genreList, moods);
  });

  container.appendChild(card);
}