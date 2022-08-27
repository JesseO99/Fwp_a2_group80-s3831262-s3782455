import "./Header.css";
import {Button, Stack} from "react-bootstrap";
import {Link} from "react-router-dom";
import {getNameByEmail} from "../data/repository";
import React, {useContext} from "react";
import {UsernameContext} from "../App";


function Header(props) {
    const username = useContext(UsernameContext);

    return (
        <div className="navbar">
            <div className="container">
                <Link className="heading" to="/">LAN</Link>
                <div className="login-logout-buttons">
                    {/*Show Login Logout buttons based on login status*/}
                    {username === null ?
                        <>
                            <Link to="/Signin">
                                <Button variant="primary" className="btn">Signin</Button>
                            </Link>
                            <Link to="/Signup">
                                <Button variant="light" className="btn">Signup</Button>{''}
                            </Link>
                        </>
                        :
                        <>
                            <Stack direction="horizontal" gap={2}>
                                <p id="loggedin-user">{getNameByEmail(username)}</p>
                                <Link to="/"><Button variant="light" className="btn"
                                                     onClick={props.logoutUser}>Logout</Button></Link>
                            </Stack>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}

export default Header;