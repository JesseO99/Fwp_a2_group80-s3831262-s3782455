import Form from 'react-bootstrap/Form';
import {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    getAuthentificationRequestData,
    removeAuthentificationRequestData,
    setAuthentificationRequestData,
    setUser,
    getUserByEmail,
    verifyUser
} from "../data/repository";
import {Button} from "react-bootstrap";
import OneTimeCodeAuthentification, {sendEmail} from '../components/OneTimeCodeAuthentification';
import "./Signin.css";
import {LoginUserContext} from "../App";



function Signin() {

    const loginUser = useContext(LoginUserContext);

    // Creates a Variable to track the email
    const [username, setLoggedInUsername] = useState();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [failedAttempt, setFailedAttempt] = useState(false);


    // Controls whether popup is vissible or invisible
    const toggleAuthentification = () => {
        setIsOpen(!isOpen);
    }

    // Sets the email to the value provided
    function onChangeEmail(e) {
        setLoggedInUsername(e.target.value);
    }

    // trigers when submitted currently saves value to local storage in future will need to Check Value First
    async function onSubmit(e) {
        e.preventDefault();
        const verifiedUser = await verifyUser(username, password);


        if (verifiedUser) {
            sendEmail(setAuthentificationRequestData(username));
            toggleAuthentification();

        } else {
            setFailedAttempt(true);
        }

    }


    // Authenticates MFA request
    async function authenticate(code) {
        const data = getAuthentificationRequestData();

        if (data.to_email === username && data.code === code) {
            const user = await getUserByEmail(username);
            loginUser(user);
            setUser(user);
            removeAuthentificationRequestData();
            navigate("/Profile");
        } else {
            return false;
        }
    }


    // Creates a variable to track the password
    const [password, setLoggedInPassword] = useState('');

    // Sets the value of Password everytime the value of password is changed
    function onChangePassword(e) {
        setLoggedInPassword(e.target.value);
    }

    return (
        <div>
            <div className="container">
                <div className="signin-form">
                    <h1>Sign In</h1>
                    {failedAttempt && <p className="Error-Message" data-testid="error-message-signin"> Email/Password was incorrect please try again</p>}
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail" onChange={onChangeEmail}>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword" onChange={onChangePassword}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password"/>
                        </Form.Group>
                        <Button variant="primary" type="submit" data-testid="submit">Submit</Button>
                    </Form>
                </div>
            </div>
            {isOpen && <OneTimeCodeAuthentification onSubmit={authenticate}/>}
        </div>

    );

}

export default Signin;