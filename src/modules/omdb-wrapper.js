import axios from "axios";

const APIKEY = "7ca803bc";

export const OMDBSearchByPage = async (search, page) => {
  const url = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${search}&page=${page}`;
  const { data } = await axios.get(url);
  return data;
};

export const OMDBSearchComplete = async (search) => {
  let page = 1;
  let allMovies = [];

  while (true) {
    const url = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${search}&page=${page}`;
    const { data } = await axios.get(url);

    if (data.Response === "False") break;

    allMovies = allMovies.concat(data.Search);
    page++;
  }

  return allMovies;
};

export const OMDBGetByImdbID = async (id) => {
  const url = `http://www.omdbapi.com/?apikey=${APIKEY}&i=${id}`;
  const { data } = await axios.get(url);
  return data;
};