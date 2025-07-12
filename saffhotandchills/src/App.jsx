import './css/App.css'
import Favorites from './pages/Favorites'
import Movies from './pages/Movies'
import Chills from './pages/Chills'
import Home from './pages/Home'
import SaffAgent from './pages/SaffAgent.jsx'
import { Routes, Route } from "react-router-dom"
import NavBar from './components/NavBar.jsx'
import { MovieProvider } from './contexts/MovieContext'


function App() {
    return (
        <MovieProvider>
            <div>
            <NavBar/>
            <main className="main-content">
            <Routes>
                    <Route path= "/" element = {<Home/>}/>
                    <Route path="/chills" element={<Chills />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/saffagent" element = {<SaffAgent/>}/>
            </Routes>
            </main>
            </div>
        </MovieProvider>
        
    )
}
export default App
