import axios from "axios";

const APIKEY = "7ca803bc";

export const OMDBSearchByPage = async (search, page) => {
  try {
    const url = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${search}&page=${page}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw new Error("Error al buscar películas por página");
  }
};

export const OMDBSearchComplete = async (search) => {
  let page = 1;
  let allMovies = [];

  try {
    while (true) {
      const url = `http://www.omdbapi.com/?apikey=${APIKEY}&s=${search}&page=${page}`;
      const { data } = await axios.get(url);

      if (data.Response === "False") break;

      allMovies = allMovies.concat(data.Search);
      page++;
    }

    return allMovies;
  } catch (error) {
    throw new Error("Error al obtener todas las películas");
  }
};

export const OMDBGetByImdbID = async (id) => {
  try {
    const url = `http://www.omdbapi.com/?apikey=${APIKEY}&i=${id}`;
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    throw new Error("Error al buscar por ID");
  }
};