import { getGenreNamesFromIds, getCombinedMoodFit } from "./mood.js";
import { gsap } from "gsap";

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
        <p>⭐ ${Math.round(movie.vote_average * 10) / 10}</p>
        <p class="modal-genres"><strong>Genres:</strong> ${movieGenres.join(", ") || "Unknown"}</p>

        <h3>About this movie</h3>
        <p class="movie-overview">${movie.overview || "No description available."}</p>
      </div>
    </div>
  `;

  movieModal.classList.remove("hidden");

  gsap.set(".movie-modal__overlay", { opacity: 0 });
  gsap.set(".movie-modal__content", { opacity: 0, y: 18, scale: 0.98 });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
  tl.to(".movie-modal__overlay", { opacity: 1, duration: 0.22 })
    .to(".movie-modal__content", {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.32
    }, "-=0.1");
}

export function closeMovieModal() {
  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
    onComplete: () => {
      movieModal.classList.add("hidden");
      modalBody.innerHTML = "";
    }
  });

  tl.to(".movie-modal__content", {
    opacity: 0,
    y: 14,
    scale: 0.98,
    duration: 0.22
  })
    .to(".movie-modal__overlay", {
      opacity: 0,
      duration: 0.18
    }, "-=0.12");
}