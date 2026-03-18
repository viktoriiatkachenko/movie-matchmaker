export async function fetchGenreMap(apiKey) {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  return data.genres;
}

export function mapGenreNamesToIds(genreNames, genreList) {
  return genreNames
    .map(name => {
      const foundGenre = genreList.find(genre => genre.name === name);
      return foundGenre ? foundGenre.id : null;
    })
    .filter(id => id !== null);
}

export async function fetchMatchedMovies(apiKey, user1, user2) {
  const allFavoriteGenres = [...user1.favorites, ...user2.favorites];
  const allAvoidGenres = [...user1.avoid, ...user2.avoid];

  const uniqueFavorites = [...new Set(allFavoriteGenres)];
  const uniqueAvoid = [...new Set(allAvoidGenres)];

  const genreList = await fetchGenreMap(apiKey);

  const favoriteIds = mapGenreNamesToIds(uniqueFavorites, genreList);
  const avoidIds = mapGenreNamesToIds(uniqueAvoid, genreList);

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${favoriteIds.join(",")}&without_genres=${avoidIds.join(",")}&vote_average.gte=6`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    movies: data.results,
    genreList
  };
}