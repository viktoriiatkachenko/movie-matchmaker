import { gsap } from "gsap";
import { initLenis } from "./js/lenis.js";
import { fetchMatchedMovies, fetchPopularMovies } from "./js/api.js";
import { renderMovies, renderBestMatch } from "./js/render.js";
import { setupModal } from "./js/modal.js";
import { getMatchData, clearMatchData } from "./js/storage.js";
import { getMovieScore } from "./js/mood.js";

initLenis();

const API_KEY = "4b1ef9933dbb53ae038172050f28ee9b";

const resultsContainer = document.getElementById("results");
const restartBtn = document.getElementById("restart-btn");
const homeBtn = document.getElementById("home-btn");
const loadMoreBtn = document.getElementById("load-more-btn");
const fallbackMessage = document.getElementById("fallback-message");
const bestMatchContainer = document.getElementById("best-match");

const matchData = getMatchData();

let currentPage = 1;
let bestMatchInitialized = false;
let currentMoods = null;

const INITIAL_GRID_COUNT = 20;
const LOAD_MORE_COUNT = 12;

if (!matchData) {
  window.location.href = "./match.html";
}

setupModal();
loadMovies();

restartBtn.addEventListener("click", function () {
  clearMatchData();
  window.location.href = "./match.html";
});

homeBtn.addEventListener("click", function () {
  clearMatchData();
  window.location.href = "./index.html";
});

loadMoreBtn.addEventListener("click", async function () {
  currentPage += 1;
  await loadMovies(currentPage);
});

async function loadMovies(page = 1) {
  try {
    const { user1, user2 } = matchData;

    fallbackMessage.classList.add("hidden");

    let { movies, genreList } = await fetchMatchedMovies(API_KEY, user1, user2, page);

    currentMoods = {
      user1: user1.mood,
      user2: user2.mood
    };

    if (!movies || movies.length === 0) {
      if (page === 1) {
        fallbackMessage.classList.remove("hidden");
        movies = await fetchPopularMovies(API_KEY);
      } else {
        loadMoreBtn.style.display = "none";
        return;
      }
    }

    const sortedMovies = [...movies].sort((a, b) => {
      return (
        getMovieScore(b, genreList, currentMoods) -
        getMovieScore(a, genreList, currentMoods)
      );
    });

  if (!bestMatchInitialized) {
  const initialMovies = sortedMovies.slice(0, INITIAL_GRID_COUNT + 1);

  const bestMovie = initialMovies[0];
  const otherMovies = initialMovies.slice(1);

  if (bestMovie) {
    renderBestMatch(bestMatchContainer, bestMovie, genreList, currentMoods);
  }

  renderMovies(resultsContainer, otherMovies, genreList, currentMoods, false);

  bestMatchInitialized = true;

  animateResults();
} else {
  const nextMovies = sortedMovies.slice(0, LOAD_MORE_COUNT);
  renderMovies(resultsContainer, nextMovies, genreList, currentMoods, true);
}
  } catch (error) {
    console.error("Failed to load movies:", error);
  }
}

function animateResults() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(".results-header", {
    y: 18,
    opacity: 0,
    duration: 0.5
  })
    .from("#fallback-message:not(.hidden)", {
      y: 12,
      opacity: 0,
      duration: 0.4
    }, "-=0.2")
    .from(".best-match-card", {
      y: 28,
      opacity: 0,
      duration: 0.7
    }, "-=0.2")
    .from(".movie-card", {
      y: 24,
      opacity: 0,
      duration: 0.5,
      stagger: 0.06
    }, "-=0.35");
}



