import { Link } from "react-router-dom"
import '../css/NavBar.css'

function NavBar() {
    return <div className="navbar">
        <div className="navbar-brand" style={{fontFamily: 'Georgia' }}>
            <Link to = "/"> Home </Link>
        </div>
        <div className="navbar-links" style={{fontFamily: 'Georgia' }}>
              
            <Link to = "/chills" className = "nav-link"> Chills</Link>
            <Link to = "/movies" className = "nav-link"> Movies</Link>
            <Link to="/favorites" className="nav-link"> Favorites</Link>
            <Link to="/saffagent" className="nav-link"> SaffAgent</Link>  
            </div>
    </div>
}

export default NavBar