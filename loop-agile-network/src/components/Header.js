import "./Header.css";
import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

function Header(props) {
    return (
        <div class="navbar">
            <div className="container">
                <Link className="heading" to="/">LAN</Link>
                <div className="login-logout-buttons">
                    {/*Show Login Logout buttons based on login status*/}
                    {props.username === null ?
                        <>
                            <Button variant="primary" className="btn">Login</Button>{''}
                            <Button variant="light" className="btn">Signup</Button>{''}
                        </>
                        :
                        <>
                            <Button variant="light" className="btn">Logout</Button>{' '}
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;