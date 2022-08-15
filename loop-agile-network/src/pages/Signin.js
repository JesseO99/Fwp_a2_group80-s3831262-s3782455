import Form from 'react-bootstrap/Form';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {verifyUser} from "../data/repository";

import "./Signin.css";

function Signin (props) {
    // Creates a Variable to track the email
    const [username, setLoggedInUsername] = useState();
    const navigate = useNavigate();

    // Sets the email to the value provided
    function onChangeEmail(e){
        setLoggedInUsername(e.target.value);
    };

    // trigers when submitted currently saves value to local storage in future will need to Check Value First
    function onSubmit (e)
    {
        e.preventDefault();
        const verifiedUser = verifyUser(username, password);

        if (verifiedUser)
        {
            props.loginUser(username);
            navigate("/Profile");
        }
        else
        {
            window.alert("Login Failed");
        };
    };

    // Creates a variable to track the password
    const  [password, setLoggedInPassword] = useState('');

    // Sets the value of Password everytime the value of password is changed
    function onChangePassword(e){
        setLoggedInPassword(e.target.value);
    };

    return (
        <div class="signin-box">
            
            
            <div class="signin-form">
                <h1>Sign In</h1>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail" onChange={onChangeEmail}>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword" onChange={onChangePassword}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                   <input type="submit" value="Submit" class="submit-button"></input>
                </Form>
            </div>
        </div>        // TODO Check if User login Deatils are correct
    );
    
};

export default Signin;