import "./ProfileEdit.css";
import {Navigate, useNavigate} from "react-router-dom";
import {getUserDetails, updateUser} from "../data/repository";
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import {useContext, useState} from "react";
import avatar from "../img/avatar.png";
import Popup from "../components/Popup"
import {LoginUserContext, UsernameContext} from "../App";

function ProfileEdit({updateAllUserEntryEmails}) {
    const username = useContext(UsernameContext);
    const loginUser = useContext(LoginUserContext);
    const user = getUserDetails(username);
    const [isOpen, setIsOpen] = useState(false);
    const [firstName, setFirstName] = useState(user.firstName);
    const [email, setEmail] = useState(user.email);
    const [lastName, setLastName] = useState(user.lastName);
    const [image, setImage] = useState(user.img); // Redundant code for now will prove necesarry if image upload is implemented for Profile Picture


    const navigate = useNavigate();

    //Authenticate and Redirect if not Logged in
    if (!username) {
        return <Navigate to="/"/>
    }

    // Controls Edit Confirmation Cue
    const togglePopup = () => {
        console.log("Pre-Trigger: ", isOpen);
        localStorage.setItem("Popup", !isOpen);
        setIsOpen(!isOpen);
        console.log("Post-Trigger: ", isOpen);
    }


    // Used to monitor changes to First Name is called when the first name is changed
    function onChangeFirstName(e) {
        // localStorage.setItem(FIRST_NAME_KEY, firstName);
        setFirstName(e.target.value);
    }

    // Used to monitor changes to last name is called when a last name is changed
    function onChangeLastName(e) {
        // localStorage.setItem(LAST_NAME_KEY, lastName);
        setLastName(e.target.value);
    }

    // Used to monitor changes to email, is called when the email is changed
    function onChangeEmail(e) {
        // localStorage.setItem(EMAIL_KEY, email);
        setEmail(e.target.value);
    }

    // Redundant code for now will prove necesarry if image upload is implemented for Profile Picture
    // eslint-disable-next-line
    function onChangeImage(e) {
        console.log("File: ", e.target.files);
        setImage(e.target.files[0]);
    }


    function onSubmit() {
        // Update email to new email
        loginUser(email);
        // Update user details
        updateUser(user.email, email, firstName, lastName, user.img);
        //Update all posts and comments with new email
        updateAllUserEntryEmails(user.email, email);
        navigate("/Profile");
    }

    return (

        <div>
            <div className="Profile-Edit-Container">

                <img className="Profile-Pic" src={user.img.length === 0 ? avatar : image} alt="Profile"></img>


                <div className="Input Fields">
                    <h1>
                        Edit Profile
                    </h1>

                    <Form.Group className="mb-3" controlId="firstName" onChange={onChangeFirstName}>
                        <Form.Label>First Name</Form.Label> <br></br>
                        <Form.Control type="text" placeholder="Enter FirstName" value={firstName}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastName" onChange={onChangeLastName}>
                        <Form.Label>Last Name</Form.Label> <br></br>
                        <Form.Control type="text" placeholder="Enter FirstName" value={lastName}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail" onChange={onChangeEmail}>
                        <Form.Label>Email Address</Form.Label> <br></br>
                        <Form.Control type="email" placeholder="Enter email" value={email}/>
                    </Form.Group>

                    {/* Code Bellow is to be used if image upload is implemented */}
                    {/* <Form.Group className="mb-3" controlId="file" id="file" onChange={onChangeImage}>
                            <Form.Label>Profile Picture</Form.Label> <br></br>
                            <Form.Control type="file"></Form.Control>

                        </Form.Group> */}
                    <Button variant="primary" type="submit" onClick={togglePopup}>Submit</Button>

                </div>


            </div>
            {/* HTML for popup */}
            {isOpen && <Popup close={togglePopup} confirm={onSubmit} content={"Will you confirm these changes?"}/>}
        </div>

    );
}

export default ProfileEdit;
