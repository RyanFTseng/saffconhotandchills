
import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react"
import '../css/Home.css'
import { SearchMovies, GetPopularMovies} from "../services/api.js"


function Movies() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    //useEffect(() => {}, [])
    //call function ()=>{} in useEffect when dependency array[] changes
    //check array on refresh

    //call load movies api call if empty (runs once) dependency array changes or on refresh
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await GetPopularMovies()
                setMovies(popularMovies)
            } catch (err) {
                console.log(err)
                setError("failed to load movies")
            }
            finally {
                setLoading(false) //finished loading
            }
        }
        loadPopularMovies()
    }, [])


    const handleSearch = async (e) => {
        e.preventDefault();

        //prevent search if no empty characters or loading
        if (!searchQuery.trim()) return
        if(loading) return 
        setLoading(true)

        try {
            const searchResults = await SearchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("failed to load movies")
        }
        finally {
            setLoading(false);
        }

    }

    return <div className="home">
        <form onSubmit={handleSearch} className="search-form">
            <input
                type="text"
                placeholder="search for movies..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">Search</button>
        </form>

        {error && <div className="error-message">{error}</div>}

        


        {loading ? (<div className="loading">Loading... </div>) : (
            <div className="movies-grid">
                {movies.map(
                    (movie) =>
                    (
                        <MovieCard movie={movie} key={movie.id} />
                    ))}
            </div>
            )}
        
    </div>
        
}

export default Movies