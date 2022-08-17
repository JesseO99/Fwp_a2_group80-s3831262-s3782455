import "./Profile.css";
import {getUserDetails, getUser} from "../data/repository"
import {Navigate} from "react-router-dom";
import React from "react";


function Profile(props) {

    //Authenticate and Redirect if not Logged in
    if (!props.username) {
        return <Navigate to="/" />
    }
    const user = getUserDetails(props.username);
    return (
        <div class="profile-body">
            {user.img === null ? 
            (<img class="Profile-Pic" src="https://img.icons8.com/ios/100/000000/gender-neutral-user.png" alt="Profile picture"></img>):
            (<img class="Profile-Pic" src={user.img} alt="Profile picture"></img>)}
            
            <div class="text-container">
                <h1>Profile Page</h1>
                <p>
                    Name: {user.firstName} {user.lastName} <br></br>
                    Date of Birth: {user.dob}<br></br>
                    date joined: {user.date_joined} <br></br>
                    
                </p>
            </div>
        </div>
    );
}

export default Profile;