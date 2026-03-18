import { fetchMatchedMovies } from "./js/api.js";
import { setupModal } from "./js/modal.js";
import { getMatchData, clearMatchData } from "./js/storage.js";
import { renderMovies, renderBestMatch } from "./js/render.js";
import { getMovieScore } from "./js/mood.js";

const API_KEY = "4b1ef9933dbb53ae038172050f28ee9b";

const resultsContainer = document.getElementById("results");
const restartBtn = document.getElementById("restart-btn");

const matchData = getMatchData();

if (!matchData) {
  window.location.href = "./match.html";
}

setupModal();

loadMovies();

restartBtn.addEventListener("click", function () {
  clearMatchData();
  window.location.href = "./match.html";
});

async function loadMovies() {
  const { user1, user2 } = matchData;

  const { movies, genreList } = await fetchMatchedMovies(API_KEY, user1, user2);

  if (!movies || movies.length === 0) {
    resultsContainer.innerHTML = "<p>No movies found. Try different preferences.</p>";
    return;
  }

  const bestMatchContainer = document.getElementById("best-match");

  const movieMoods = {
    user1: user1.mood,
    user2: user2.mood
  };

  const sortedMovies = [...movies].sort((a, b) => {
    return getMovieScore(b, genreList, movieMoods) - getMovieScore(a, genreList, movieMoods);
  });

  const bestMovie = sortedMovies[0];
  const otherMovies = sortedMovies.slice(1);

  renderBestMatch(bestMatchContainer, bestMovie, genreList, movieMoods);
  renderMovies(resultsContainer, otherMovies, genreList, movieMoods);
}

const sortedMovies = [...movies].sort((a, b) => {
  return getMovieScore(b, genreList, movieMoods) - getMovieScore(a, genreList, movieMoods);
});