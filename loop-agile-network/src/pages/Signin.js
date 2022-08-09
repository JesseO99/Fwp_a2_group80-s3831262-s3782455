import Form from 'react-bootstrap/Form';
import {useState} from "react";

import "./Signin.css";
function Signin () {
    // Creates a Variable to track the email
    const [username, setLoggedInUsername] = useState('');

    // Sets the email to the value provided
    function onChangeEmail(e){
        setLoggedInUsername(e.target.value);
    };

    // trigers when submitted currently saves value to local storage in future will need to Check Value First
    function onSubmit (e)
    {
        // TODO Check if User login Deatils are correct
        e.preventDefault();
        console.log("Email: ", username);   
        console.log("Password: ", password);
        localStorage.setItem('email', username);
    };

    // Creates a variable to track the password
    const  [password, setLoggedInPassword] = useState('');

    // Sets the value of Password everytime the value of password is changed
    function onChangePassword(e){
        setLoggedInPassword(e.target.value);
    };

    return (
        <div class="signin-box">
            
            <h1>Sign In</h1>
            <div class="signin-form">
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
        </div>
    );
    
};

export default Signin;