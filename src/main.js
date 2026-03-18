import { genres, moods } from "./js/data.js";
import { showScreen } from "./js/screens.js";
import {
  setupGenreButtons,
  setupMoodButtons,
  getUserData,
  isValidUser,
  resetForm
} from "./js/form.js";
import { fetchMatchedMovies } from "./js/api.js";
import { renderMovies } from "./js/results.js";
import { setupModal } from "./js/modal.js";

const API_KEY = "4b1ef9933dbb53ae038172050f28ee9b";

const homeScreen = document.getElementById("home-screen");
const preferencesScreen = document.getElementById("preferences-screen");
const resultsScreen = document.getElementById("results-screen");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");
const matchBtn = document.getElementById("match-btn");

const genreContainers = document.querySelectorAll(".genres");
const moodContainers = document.querySelectorAll(".moods");
const userCards = document.querySelectorAll(".user-card");
const resultsContainer = document.getElementById("results");

const screens = [homeScreen, preferencesScreen, resultsScreen];

setupGenreButtons(genreContainers, genres);
setupMoodButtons(moodContainers, moods);
setupModal();

startBtn.addEventListener("click", function () {
  showScreen(preferencesScreen, screens);
});

restartBtn.addEventListener("click", function () {
  resetForm(userCards);
  showScreen(homeScreen, screens);
});

matchBtn.addEventListener("click", async function () {
  const user1 = getUserData(userCards[0]);
  const user2 = getUserData(userCards[1]);

  if (!isValidUser(user1) || !isValidUser(user2)) {
    alert("Please fill all required fields");
    return;
  }

  const { movies, genreList } = await fetchMatchedMovies(API_KEY, user1, user2);

  renderMovies(resultsContainer, movies, genreList, {
    user1: user1.mood,
    user2: user2.mood
  });

  showScreen(resultsScreen, screens);
});