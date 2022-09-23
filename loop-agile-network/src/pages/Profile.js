import "./Profile.css";
import {getUserDetails, deleteUser} from "../data/repository"
import {Navigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import {Link} from "react-router-dom";
import avatar from "../img/avatar.png";
import Popup from "../components/Popup";
import {Button, Container, Row, Stack} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {UserContext} from "../App";


function Profile(props) {
    const user = useContext(UserContext);

    const [isOpen, setIsOpen] = useState(false);

    //Authenticate and Redirect if not Logged in
    if (!user) {
        return <Navigate to="/"/>
    }
    // const user = getUserDetails(username);

    // Controls whether popup is vissible or invisible
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    function removeUser() {
        const email = user.email;
        // // Step 1 Logout User
        // // Step 2 Delete User

        deleteUser(email);
        props.removeUserPosts(email);
        props.logoutUser();

    }


    return (
        <div class="container">
            <p id="profile-heading">Profile</p>

            <div className="profile-body">
                {/*<img className="Profile-Pic" src={user.img.length === 0 ? avatar : user.img} alt="Profile"></img>*/}
                <img className="Profile-Pic" src={avatar} alt="Profile"></img>
                <div className="text-container">
                    <br/>
                    <h1>{user.first_name} {user.last_name}</h1>
                    <br/>
                    <h5>About Me</h5>
                    <p>
                        {/*Date of Birth: {user.dob}<br></br>*/}
                        Joined: {user.date_joined} <br></br>
                        Email: {user.email} <br></br>

                    </p>
                    {/*Edit/ Delete Profile Buttons*/}
                    <div className="link-container">
                        <div>
                            <Link to="/Profile-Edit">
                                <Button to="/Profile-Edit" variant="light">
                                    <Stack direction="horizontal" gap="2" style={{marginBottom: "-15px"}}>
                                        <p className="edit-button material-icons">edit_square</p>
                                        <p>Edit Profile</p>
                                    </Stack>
                                </Button>
                            </Link>
                            <Button onClick={togglePopup} variant="light">
                                <Stack direction="horizontal" gap="2" style={{marginBottom: "-15px"}}>
                                    <p className="material-icons delete-button">delete</p>
                                    <p>Delete Account</p>
                                </Stack>
                            </Button>
                        </div>

                    </div>


                </div>


            </div>
            {/* HTML for Popup */}
            {isOpen && <Popup close={togglePopup} confirm={removeUser}
                              content={"Are you sure you want to delete this account? This will also delete all posts made by this account."}/>}
        </div>

    );
}

export default Profile;