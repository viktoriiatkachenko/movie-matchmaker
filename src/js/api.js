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

export async function fetchMatchedMovies(apiKey, user1, user2, page = 1) {
  const allFavoriteGenres = [...user1.favorites, ...user2.favorites];
  const allAvoidGenres = [...user1.avoid, ...user2.avoid];

  const uniqueFavorites = [...new Set(allFavoriteGenres)];
  const uniqueAvoid = [...new Set(allAvoidGenres)];

  const genreList = await fetchGenreMap(apiKey);

  const favoriteIds = mapGenreNamesToIds(uniqueFavorites, genreList) || [];
  const avoidIds = mapGenreNamesToIds(uniqueAvoid, genreList) || [];

  const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}${
    favoriteIds.length ? `&with_genres=${favoriteIds.join(",")}` : ""
  }${
    avoidIds.length ? `&without_genres=${avoidIds.join(",")}` : ""
  }&vote_average.gte=6`;

  const url1 = `${baseUrl}&page=${page}`;
  const url2 = `${baseUrl}&page=${page + 1}`;

  const [res1, res2] = await Promise.all([
    fetch(url1),
    fetch(url2)
  ]);

  const data1 = await res1.json();
  const data2 = await res2.json();

  const movies = [...(data1.results || []), ...(data2.results || [])];

  return {
    movies,
    genreList
  };
}

export async function fetchPopularMovies(apiKey, page = 1) {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=${page}`;

  const response = await fetch(url);
  const data = await response.json();

  return data.results || [];
}