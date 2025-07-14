const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

//async: wait until await gets a response
export const GetPopularMovies = async () => {
    console.log('BASE_URL:', import.meta.env.VITE_BASE_URL);
    console.log('API_KEY:', import.meta.env.VITE_API_KEY);
    console.log('Raw env object:', import.meta.env);
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
};

export const SearchMovies = async (query) => {
    const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
    )}`);
    const data = await response.json();
    return data.results;
};