import "./Profile.css";
import {getUserDetails} from "../data/repository"
import {Navigate} from "react-router-dom";
import React from "react";
import {Link} from "react-router-dom";


function Profile(props) {

    //Authenticate and Redirect if not Logged in
    if (!props.username) {
        return <Navigate to="/" />
    }
    const user = getUserDetails(props.username);
    return (
        <div className="profile-body">
            <img className="Profile-Pic" src= {user.img === null ? "https://img.icons8.com/ios/100/000000/gender-neutral-user.png": user.img} alt="Profile"></img>
            
            <div className="text-container">
                <h1>Profile Page</h1>
                <p>
                    Name: {user.firstName} {user.lastName} <br></br>
                    Date of Birth: {user.dob}<br></br>
                    date joined: {user.date_joined} <br></br>
                    
                </p>
                <div className="link-container">
                    <Link  to="/Profile-Edit">Edit</Link>
                    <span> Delete </span>
                </div>
            </div>
                
            
        </div>
    );
}

export default Profile;