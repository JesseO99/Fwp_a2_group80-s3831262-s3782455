import "./ProfileEdit.css";
import {Navigate, useNavigate} from "react-router-dom";
import {setUser, updateUser} from "../data/repository";
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import {useContext, useState} from "react";
import avatar from "../img/avatar.png";
import Popup from "../components/Popup"
import {LoginUserContext, UserContext} from "../App";

function ProfileEdit(props) {
    const user = useContext(UserContext);
    const loginUser = useContext(LoginUserContext);

    // const user = getUserDetails(username);
    const [isOpen, setIsOpen] = useState(false);
    const [firstName, setFirstName] = useState(user.first_name);
    const [email, setEmail] = useState(user.email);
    const [lastName, setLastName] = useState(user.last_name);
    const [image, setImage] = useState(user.img); // Redundant code for now will prove necesarry if image upload is implemented for Profile Picture
    const [email_error, set_email_error] = useState(false);

    const navigate = useNavigate();

    //Authenticate and Redirect if not Logged in
    if (!user) {
        return <Navigate to="/"/>
    }

    // Controls Edit Confirmation Cue
    const togglePopup = () => {
        localStorage.setItem("Popup", !isOpen);
        setIsOpen(!isOpen);

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


    async function onSubmit() {

        // Update user details
        const updated_user = 
        {
            user_id: user.user_id,
            email: email,
            first_name: firstName,
            last_name: lastName,
            password: user.password,
            date_joined: user.date_joined
        }
        const update_success = await updateUser(user.user_id, email, firstName, lastName);
        if(update_success)
        {
            loginUser(updated_user);
            setUser(updated_user);
            navigate("/Profile");
        }
        else
        {
            togglePopup();
            set_email_error(true);
        }
        
    }

    return (

        <div>
            <div className="Profile-Edit-Container">

                {/* <img className="Profile-Pic" src={user.img.length === 0 ? avatar : image} alt="Profile"></img> */}
                <img className="Profile-Pic" src={avatar} alt="Profile"></img>

                <div className="Input Fields">
                    <h1>
                        Edit Profile
                    </h1>

                    <Form.Group className="mb-3" controlId="firstName" onChange={onChangeFirstName}>
                        <Form.Label>First Name</Form.Label> <br></br>
                        <Form.Control type="text" placeholder="Enter FirstName" data-testid="First-Name-Edit" defaultValue={firstName}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="lastName" onChange={onChangeLastName}>
                        <Form.Label>Last Name</Form.Label> <br></br>
                        <Form.Control type="text" placeholder="Enter LastName" data-testid="Last-Name-Edit" defaultValue={lastName}/>
                    </Form.Group>
                    {email_error && <p className="Error-Message" data-testid="profile-edit-error"> That Email is taken one email can only be linked to one account</p>}
                    <Form.Group className="mb-3" controlId="formBasicEmail" onChange={onChangeEmail}>
                        <Form.Label>Email Address</Form.Label> <br></br>
                        <Form.Control type="email" placeholder="Enter email" data-testid="Email-Edit" defaultValue={email}/>
                    </Form.Group>

                    {/* Code Bellow is to be used if image upload is implemented */}
                    {/* <Form.Group className="mb-3" controlId="file" id="file" onChange={onChangeImage}>
                            <Form.Label>Profile Picture</Form.Label> <br></br>
                            <Form.Control type="file"></Form.Control>

                        </Form.Group> */}
                    <Button variant="primary" type="submit" onClick={togglePopup} data-testid="submit">Submit</Button>

                </div>


            </div>
            {/* HTML for popup */}
            {isOpen && <Popup close={togglePopup} confirm={onSubmit} content={"Will you confirm these changes?"}/>}
        </div>

    );
}

export default ProfileEdit;
