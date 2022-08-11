import "./Navbar.css";
import {Link} from "react-router-dom";
import {isLoggedIn, logout} from "../data/repository"

function Navbar(props) {

    function logout()
    {
        props.logoutUser();
    }
    return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
            {/*Menu button for smaller screens*/}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    {props.username !== null && <>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/Profile">Profile</a>
                        </li>
                        <li className="nav-item ">
                            <a className="nav-link" href="#">Feed</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Create Post</a>
                        </li>
                    </>}
                </ul>
            </div>
        </div>
    </nav>);
}

export default Navbar;
