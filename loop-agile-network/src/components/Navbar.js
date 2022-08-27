import "./Navbar.css";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {UsernameContext} from "../App";

function Navbar(props) {
    const username = useContext(UsernameContext);

    return (<nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
            {/*Menu button for smaller screens*/}
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    {username !== null && <>
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Profile">Profile</Link>
                        </li>
                        <li className="nav-item ">
                            <Link className="nav-link" to="/Feed">Feed</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/CreatePost">Create Post</Link>
                        </li>
                    </>}
                </ul>
            </div>
        </div>
    </nav>);
}

export default Navbar;
