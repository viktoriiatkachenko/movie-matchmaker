export const moodGenreMap = {
  "Need comfort": ["Drama", "Romance", "Comedy", "Fantasy"],
  "Need distraction": ["Action", "Comedy", "Adventure", "Animation"],
  "Want to feel deeply": ["Drama", "Romance", "Mystery"],
  "Want to think": ["Sci-Fi", "Mystery", "Thriller"],
  "Want energy": ["Action", "Thriller", "Horror"],
  "Want something different": ["Sci-Fi", "Fantasy", "Animation"]
};

export function getGenreNamesFromIds(ids, genreList) {
  const map = new Map(genreList.map(g => [g.id, g.name]));
  return (ids || []).map(id => map.get(id)).filter(Boolean);
}

export function getMoodCorrelation(mood, movieGenres) {
  if (!mood) return null;

  const moodGenres = moodGenreMap[mood] || [];
  const overlap = movieGenres.filter(g => moodGenres.includes(g));
  const score = moodGenres.length ? overlap.length / moodGenres.length : 0;

  let label;
  if (score >= 0.75) label = "High";
  else if (score >= 0.4) label = "Medium";
  else label = "Low";

  return {
    label,
    overlap,
    moodGenres
  };
}

export function getMoodFitText(mood, movieGenres) {
  const correlation = getMoodCorrelation(mood, movieGenres);

  if (!correlation) return null;

  if (correlation.label === "High") {
    return `Great for: ${mood}`;
  }

  if (correlation.label === "Medium") {
    return `Could work for: ${mood}`;
  }

  return `Less aligned with: ${mood}`;
}

export function getCombinedMoodFit(moods, movieGenres) {
  const user1Text = getMoodFitText(moods.user1, movieGenres);
  const user2Text = getMoodFitText(moods.user2, movieGenres);

  return [user1Text, user2Text].filter(Boolean);
}

export function getMovieScore(movie, genreList, moods) {
  const movieGenres = getGenreNamesFromIds(movie.genre_ids, genreList);

  let score = 0;

  const user1Correlation = getMoodCorrelation(moods.user1, movieGenres);
  const user2Correlation = getMoodCorrelation(moods.user2, movieGenres);

  if (user1Correlation) {
    if (user1Correlation.label === "High") score += 3;
    else if (user1Correlation.label === "Medium") score += 2;
    else score += 1;
  }

  if (user2Correlation) {
    if (user2Correlation.label === "High") score += 3;
    else if (user2Correlation.label === "Medium") score += 2;
    else score += 1;
  }

  score += movie.vote_average / 2;

  return score;
}