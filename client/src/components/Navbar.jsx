import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="nav-bar">
            <h1 className="nav-title">Personal Finance Analyzer</h1>
            <div className="nav-links">
                <Link className="nav-link" to="/">
                    Login
                </Link>
                <Link className="nav-link" to="/register">
                    Register
                </Link>
                <Link className="nav-link" to="/upload">
                    Upload
                </Link>
            </div>
        </nav>
    );
}


export default Navbar;



