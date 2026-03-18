import { fetchMatchedMovies } from "./js/api.js";
import { renderMovies } from "./js/render.js";
import { setupModal } from "./js/modal.js";
import { getMatchData, clearMatchData } from "./js/storage.js";

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

  console.log("matchData:", matchData);

  const { movies, genreList } = await fetchMatchedMovies(API_KEY, user1, user2);

  console.log("movies:", movies);
  console.log("genreList:", genreList);

  renderMovies(resultsContainer, movies, genreList, {
    user1: user1.mood,
    user2: user2.mood
  });
}