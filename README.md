# 🎬 Movie Matchmaker

A stylish web app that helps two people find a movie they'll both enjoy.

👉 Users select their favorite genres, avoid genres, and mood —  
the app then suggests the best matching movies using real API data.

---

## ✨ Features

- 👥 Two-user matching system
- 🎭 Mood-based recommendations
- 🎬 Genre filtering (favorite / avoid)
- ⭐ Best Match highlight
- 📱 Responsive UI
- 🔍 Movie details modal (description, genres, rating)
- 🔁 Restart & navigation between pages

---

## 🧠 How it works

1. Users enter:
   - Name
   - Favorite genres
   - Genres to avoid
   - Mood

2. App combines preferences:
   - Merges favorite genres
   - Removes avoided genres

3. Movies are fetched from TMDB API

4. Each movie gets a **score** based on:
   - Mood compatibility
   - Rating

5. Movies are sorted:
   - ⭐ Top result → **Best Match**
   - 🎬 Others → displayed in grid

---

## 🛠 Tech Stack

- HTML5
- CSS3
- JavaScript (ES Modules)
- Vite
- TMDB API

---

## 🔌 API

This project uses:

👉 https://www.themoviedb.org/

Endpoints used:
- `/discover/movie`
- `/genre/movie/list`

---

## 🚀 Getting Started

1. Clone the repo:
git clone https://github.com/YOUR_USERNAME/movie-matchmaker.git

2. Install dependencies:

npm install

3. Run the project:

npm run dev

4. 🔐 API Key

You need a TMDB API key.

5. Replace in code:

const API_KEY = "your_api_key_here";

