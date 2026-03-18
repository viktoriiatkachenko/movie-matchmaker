import { genres, moods } from "./js/data.js";

const homeScreen = document.getElementById("home-screen");
const preferencesScreen = document.getElementById("preferences-screen");
const resultsScreen = document.getElementById("results-screen");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const genreContainers = document.querySelectorAll(".genres");
const moodContainers = document.querySelectorAll(".moods");

// Screen management
function showScreen(screen) {
  homeScreen.style.display = "none";
  preferencesScreen.style.display = "none";
  resultsScreen.style.display = "none";

  screen.style.display = "block";
}

startBtn.addEventListener("click", function () {
  showScreen(preferencesScreen);
});

restartBtn.addEventListener("click", function () {
    resetForm();
  showScreen(homeScreen);
});

function resetForm() {
  const userCards = document.querySelectorAll(".user-card");

  userCards.forEach(card => {
    const input = card.querySelector("input");
    input.value = "";

    const activeGenres = card.querySelectorAll(".genres button.active");
    activeGenres.forEach(btn => btn.classList.remove("active"));

    const activeMood = card.querySelector(".moods button.active");
    if (activeMood) {
      activeMood.classList.remove("active");
    }
  });
}

// Genre buttons
genreContainers.forEach(container => {
  genres.forEach(genre => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = genre;

    btn.addEventListener("click", function () {
      const card = container.closest(".user-card");
      const currentType = container.dataset.type;
      const oppositeType = currentType === "favorite" ? "avoid" : "favorite";

      const oppositeContainer = card.querySelector(
        `.genres[data-type="${oppositeType}"]`
      );

      const oppositeButtons = oppositeContainer.querySelectorAll("button");

      oppositeButtons.forEach(otherBtn => {
        if (otherBtn.textContent === genre) {
          otherBtn.classList.remove("active");
        }
      });

      btn.classList.toggle("active");
    });

    container.appendChild(btn);
  });
});

// Mood buttons
moodContainers.forEach(container => {
  moods.forEach(mood => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = mood;     
    btn.addEventListener("click", function () {

        const allBtns = container.querySelectorAll("button");
      allBtns.forEach(b => b.classList.remove("active"));

      btn.classList.add("active");
    });

    container.appendChild(btn);
  });
});

// Data collection

function getUserData(card) {
  const name = card.querySelector("input").value;

  const favoriteBtns = card.querySelectorAll(
    '.genres[data-type="favorite"] button.active'
  );

  const avoidBtns = card.querySelectorAll(
    '.genres[data-type="avoid"] button.active'
  );

  const moodBtn = card.querySelector(".moods button.active");

  const favorites = [];
  favoriteBtns.forEach(btn => {
    favorites.push(btn.textContent);
  });

  const avoid = [];
  avoidBtns.forEach(btn => {
    avoid.push(btn.textContent);
  });

  const mood = moodBtn ? moodBtn.textContent : null;

  return {
    name,
    favorites,
    avoid,
    mood
  };
}

const userCards = document.querySelectorAll(".user-card");
const matchBtn = document.getElementById("match-btn");

matchBtn.addEventListener("click", function () {

  const user1 = getUserData(userCards[0]);
  const user2 = getUserData(userCards[1]);

  if (!isValidUser(user1) || !isValidUser(user2)) {
    alert("Please fill all required fields");
    return;
  }
  fetchMatchedMovies(user1, user2);
});

function isValidUser(user) {
  if (!user.name) return false;
  if (user.favorites.length === 0) return false;
  if (!user.mood) return false;

  return true;
}

// API integration 

async function fetchMatchedMovies(user1, user2) {
  const API_KEY = "4b1ef9933dbb53ae038172050f28ee9b";

   const allFavoriteGenres = [...user1.favorites, ...user2.favorites];
  const allAvoidGenres = [...user1.avoid, ...user2.avoid];

  const uniqueFavorites = [...new Set(allFavoriteGenres)];
  const uniqueAvoid = [...new Set(allAvoidGenres)];

  const genreList = await fetchGenreMap();

  const favoriteIds = mapGenreNamesToIds(uniqueFavorites, genreList);
  const avoidIds = mapGenreNamesToIds(uniqueAvoid, genreList);

 const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${favoriteIds.join(",")}&without_genres=${avoidIds.join(",")}&vote_average.gte=6`;

  const response = await fetch(url);
  const data = await response.json();

 renderMovies(data.results);
 showScreen(resultsScreen);
}

async function fetchGenreMap() {
  const API_KEY = "4b1ef9933dbb53ae038172050f28ee9b";
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  return data.genres;
}

function mapGenreNamesToIds(genreNames, genreList) {
  return genreNames
    .map(name => {
      const foundGenre = genreList.find(genre => genre.name === name);
      return foundGenre ? foundGenre.id : null;
    })
    .filter(id => id !== null);
}

// Result
const resultsContainer = document.getElementById("results");

function renderMovies(movies) {
  resultsContainer.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    const imageUrl = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "";

    card.innerHTML = `
      ${imageUrl ? `<img src="${imageUrl}" alt="${movie.title}" />` : ""}
      <h3>${movie.title}</h3>
      <p>⭐ ${movie.vote_average}</p>
    `;

    resultsContainer.appendChild(card);
  });
}