import { getGenreNamesFromIds, getCombinedMoodFit } from "./mood.js";

let movieModal;
let modalBody;

export function setupModal() {
  movieModal = document.getElementById("movie-modal");
  modalBody = document.getElementById("modal-body");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalOverlay = document.querySelector(".movie-modal__overlay");

  modalCloseBtn.addEventListener("click", closeMovieModal);
  modalOverlay.addEventListener("click", closeMovieModal);
}

export function openMovieModal(movie, genreList, moods) {
  const movieGenres = getGenreNamesFromIds(movie.genre_ids, genreList);
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "";

  modalBody.innerHTML = `
    <div class="modal-layout">
      <div class="modal-poster">
        ${imageUrl ? `<img src="${imageUrl}" alt="${movie.title}" />` : ""}
      </div>

      <div class="modal-meta">
        <h2>${movie.title}</h2>
        <p>⭐ ${movie.vote_average}</p>
        <p class="modal-genres"><strong>Genres:</strong> ${movieGenres.join(", ") || "Unknown"}</p>
        <h3>About this movie</h3>
        <p class="movie-overview">${movie.overview || "No description available."}</p>
      </div>
    </div>
  `;

  movieModal.classList.remove("hidden");
}

export function closeMovieModal() {
  movieModal.classList.add("hidden");
  modalBody.innerHTML = "";
}