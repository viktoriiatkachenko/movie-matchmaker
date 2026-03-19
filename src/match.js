import { genres, moods } from "./js/data.js";
import {
  setupGenreButtons,
  setupMoodButtons,
  getUserData,
  isValidUser
} from "./js/form.js";
import { saveMatchData } from "./js/storage.js";
import { initLenis } from "./js/lenis.js";

initLenis();

const genreContainers = document.querySelectorAll(".genres");
const moodContainers = document.querySelectorAll(".moods");
const userCards = document.querySelectorAll(".user-card");
const matchBtn = document.getElementById("match-btn");

setupGenreButtons(genreContainers, genres);
setupMoodButtons(moodContainers, moods);

matchBtn.addEventListener("click", function () {
  const user1 = getUserData(userCards[0]);
  const user2 = getUserData(userCards[1]);

  if (!isValidUser(user1) || !isValidUser(user2)) {
    alert("Please fill all required fields");
    return;
  }

  saveMatchData({ user1, user2 });
  window.location.href = "./results.html";
});