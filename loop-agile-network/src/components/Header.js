import "./Header.css";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <div className="navbar">
            <div className="container">
                <Link className="heading" to="/">LAN</Link>
                <div className="login-logout-buttons">
                    {/*Show Login Logout buttons based on login status*/}
                    {props.username === null ?
                        <>
                        <Link to="/Signin">
                        <Button variant="primary" className="btn" >Signin</Button>
                        </Link>
                        <Link to="/Signup">
                        <Button variant="light" className="btn">Signup</Button>{''}
                        </Link>
                        </>
                        :
                        <>
                            <Link to="/"><Button variant="light" className="btn" onClick={props.logoutUser}>Logout</Button></Link>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;