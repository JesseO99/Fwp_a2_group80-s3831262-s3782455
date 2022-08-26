import Form from 'react-bootstrap/Form';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
    getAuthentificationRequestData,
    removeAuthentificationRequestData,
    setAuthentificationRequestData,
    setUser,
    verifyUser
} from "../data/repository";
import {Button} from "react-bootstrap";
import OneTimeCodeAuthentification, {sendEmail} from '../components/OneTimeCodeAuthentification';
import "./Signin.css";





function Signin (props) {
    // Creates a Variable to track the email
    const [username, setLoggedInUsername] = useState();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [failedAttempt, setFailedAttempt] = useState(false);



    // Controls whether popup is vissible or invisible
    const  toggleAuthentification = () => {
        setIsOpen(!isOpen);
    }

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
            sendEmail(setAuthentificationRequestData(username));
            toggleAuthentification();

        }
        else
        {
           setFailedAttempt(true);
        };
    };

    
    // Authenticates MFA request
    function authenticate(code)
    {
        const data = getAuthentificationRequestData();

        if (data.to_email === username && data.code === code)
        {
            
            props.loginUser(username);
            setUser(username);
            removeAuthentificationRequestData();
            navigate("/Profile");
        }
        else
        {
            return false;
        }
    }


    // Creates a variable to track the password
    const  [password, setLoggedInPassword] = useState('');

    // Sets the value of Password everytime the value of password is changed
    function onChangePassword(e){
        setLoggedInPassword(e.target.value);
    };

    return (
        <div>
            <div className="signin-box">
                <div className="signin-form">
                    <h1>Sign In</h1>
                    {failedAttempt && <p className="Error-Message"> Username/Password was incorrect please try again</p>}
                    <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail" onChange={onChangeEmail}>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword" onChange={onChangePassword}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </div>
            </div>     
            {isOpen && <OneTimeCodeAuthentification onSubmit = {authenticate}  />}
        </div>
          
    );
    
};

export default Signin;