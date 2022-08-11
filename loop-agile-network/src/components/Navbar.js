import "./Navbar.css";
import {Link} from "react-router-dom";
import {isLoggedIn, logout} from "../data/repository"

function Navbar(props) {

    function logout()
    {
        props.logoutUser();
    }

    return (

        <nav class="Navbar navbar navbar-expand-sm ">
            <div class="container-fluid">
                <div class="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto order-0 ">
                        <li class="nav-item">
                            <Link className="nav-link" to="/" class="NavbarOption alignLeft"> Home </Link>
                        </li>
                    </ul>
                    {props.username == null ?(<ul class="navbar-nav ms-auto order-5">
                            <li class="nav-item">
                                <Link className="nav-link" to="/Signin" class="NavbarOption alignRight"> Signin </Link>
                            </li>
                            <li class="nav-item">
                                {/*placeholder  */}
                                <span class="NavbarOption alignRight">Signup</span>
                            </li>
                        </ul>) : (<ul class="navbar-nav ms-auto order-5">
                            <li class="nav-item">
                                <Link className="nav-link" to="/Profile" class="NavbarOption alignRight"> Profile </Link>
                            </li>
                            <li class="nav-item">
                                <Link className="nav-link" to="/login" class="NavbarOption alignRight" onClick={props.logoutUser}>Logout</Link>
                            </li>
                        </ul>)}
                        
                </div>
            </div>
        </nav>
    );
  }
  
  export default Navbar;