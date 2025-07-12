import { Link } from "react-router-dom"
import '../css/NavBar.css'

function NavBar() {
    return <div className="navbar">
        <div className="navbar-brand">
            <Link to = "/"> Home </Link>
        </div>
        <div className="navbar-links">
            <Link to = "/chills" className = "nav-link"> Chills</Link>
            <Link to = "/movies" className = "nav-link"> Movies</Link>
            <Link to="/favorites" className="nav-link"> Favorites</Link>

            </div>
    </div>
}

export default NavBar