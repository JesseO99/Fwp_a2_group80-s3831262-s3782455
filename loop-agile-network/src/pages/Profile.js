import "./Profile.css";
import {getUserDetails, getUser} from "../data/repository"
import {Navigate} from "react-router-dom";
import React from "react";


function Profile({ username }) {

    //Authenticate and Redirect if not Logged in
    if (!username) {
        return <Navigate to="/" />
    }
    const user = getUserDetails("user@gmail.com");
    return (
        <div class="profile-body">
            <h1>Profile Page</h1>
            <p>
                Name: {user.name} <br></br>
                Age: {user.age}<br></br>
                date joined: {user.date_joined} <br></br>
                
            </p>
        </div>
    );
}

export default Profile;