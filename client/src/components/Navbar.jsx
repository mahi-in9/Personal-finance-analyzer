import { useDispatch, useSelector } from "react-redux";

import { logout } from "../app/slices/userSlice";
import { Link } from "react-router-dom";

function Navbar() {
    const { token } = useSelector((state) => state.user);

    const isAuthenticated = !!token;

    const dispatch = useDispatch();


    return (
        <nav className="nav-bar">
            <h1 className="nav-title">Personal Finance Analyzer</h1>
            <div className="nav-links">

                {isAuthenticated ? (
                    <>
                        <button className="nav-link" onClick={() => dispatch(logout())}>
                            Logout
                        </button>

                    </>
                ) : (
                    <>
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>
                        <Link className="nav-link" to="/register">
                            Register
                        </Link>

                    </>
                )}
                <Link className="nav-link" to="/upload">
                    Upload
                </Link>
            </div>
        </nav>
    );
}


export default Navbar;



