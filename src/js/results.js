import { getGenreNamesFromIds, getCombinedMoodFit } from "./mood.js";
import { openMovieModal } from "./modal.js";

export function renderMovies(resultsContainer, movies, genreList, moods) {
  resultsContainer.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const movieGenres = getGenreNamesFromIds(movie.genre_ids, genreList);
    const imageUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "";

    card.innerHTML = `
      ${imageUrl ? `<img src="${imageUrl}" alt="${movie.title}" />` : ""}
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.vote_average}</p>
      <p class="movie-genres">${movieGenres.join(", ") || "Unknown"}</p>
    `;

    card.addEventListener("click", function () {
      openMovieModal(movie, genreList, moods);
    });

    resultsContainer.appendChild(card);
  });
}