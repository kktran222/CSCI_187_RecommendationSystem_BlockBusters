const API_KEY = "1be335fcb8ba9c525f9b9bd2124294d6";

const requests = {
  fetchTrendingMovie: `/trending/movie/week?api_key=${API_KEY}&language=en-US`,
  fetchTopRatedMovie: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchWesternMovies: `/discover/movie?api_key=${API_KEY}&with_genres=37`,
  fetchFamilyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10751`,

  fetchTrendingTV: `/trending/tv/week?api_key=${API_KEY}&language=en-US`,
  fetchTopRatedTV: `/tv/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionTV: `/discover/tv?api_key=${API_KEY}&with_genres=10759`,
  fetchComedyTV: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
  fetchDramaTV: `/discover/tv?api_key=${API_KEY}&with_genres=18`,
  fetchRealityTV: `/discover/tv?api_key=${API_KEY}&with_genres=10764`,
  fetchDocumentariesTV: `/discover/tv?api_key=${API_KEY}&with_genres=99`,
  fetchWesternTV: `/discover/tv?api_key=${API_KEY}&with_genres=37`,
  fetchFamilyTV: `/discover/tv?api_key=${API_KEY}&with_genres=10751`
};

export default requests;
