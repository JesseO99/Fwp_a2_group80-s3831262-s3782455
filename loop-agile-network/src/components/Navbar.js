import "./Navbar.css";
import {Link} from "react-router-dom";
function Navbar() {
    return (
        // <div class="Navbar">
        //     <Link className="nav-link" to="/" class="NavbarOption alignLeft"> Home </Link>
        //     <Link className="nav-link" to="/Signin" class="NavbarOption alignRight"> Signin </Link>
        //     <span class="NavbarOption alignRight">Signup</span>
        // </div>
        <nav class="Navbar navbar navbar-expand-sm ">
            <div class="container-fluid">
                <div class="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto order-0 ">
                        <li class="nav-item">
                            <Link className="nav-link" to="/" class="NavbarOption alignLeft"> Home </Link>
                        </li>
                    </ul>
                    <ul class="navbar-nav ms-auto order-5">
                        <li class="nav-item">
                            <Link className="nav-link" to="/Signin" class="NavbarOption alignRight"> Signin </Link>
                        </li>
                        <li class="nav-item">
                            {/*placeholder  */}
                            <span class="NavbarOption alignRight">Signup</span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
  }
  
  export default Navbar;