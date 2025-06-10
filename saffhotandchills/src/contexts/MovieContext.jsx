import { createContext, useState, useContext, useEffect } from "react"

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

//state wrapper to wrap app in to preserve values across parts of app in wrapper
//children = pass in all elements placed in wrapper
export const MovieProvider = ({ children }) => {
	const [favorites, setFavorites] = useState([])

	useEffect(() => {
		//check browser local storage for favs and return as JSON
		const storedFavs = localStorage.getItem("favorites")

		//parse JSON and store as javascript object
		if(storedFavs) setFavorites(JSON.parse(storedFavs))
	}, [])

	//locally store favs when favorites array is updated
	useEffect(() => {
		localStorage.setItem('favorites', JSON.stringify(favorites))
	}, [favorites])

	//add favs to favorites array when heart is clicked
	const addToFavorites = (movie) => {
		//add movie to current list
		setFavorites(prev => [...prev, movie])
	}


	//remove favs from list using movieId
	const removeFromFavorites = (movieId) => {
		//generate new array using all movies except movie with movieId
		setFavorites(prev => prev.filter(movie => movie.id !== movieId))
	}

	//check if movie is in favorites or not
	const isFavorite = (movieId) => {
		//check array for movieId
		return favorites.some(movie => movie.id === movieId)
	}

	//variables to provide to elements in MovieContext wrapper
	const value = {
		favorites,
		addToFavorites,
		removeFromFavorites,
		isFavorite
	}

	return <MovieContext.Provider value={ value }>
		{children}
		</MovieContext.Provider>
}