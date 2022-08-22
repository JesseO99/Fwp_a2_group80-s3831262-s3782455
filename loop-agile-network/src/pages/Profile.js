import "./Profile.css";
import {getUserDetails, deleteUser} from "../data/repository"
import {Navigate, useNavigate} from "react-router-dom";
import React from "react";
import {Link} from "react-router-dom";
import avatar from "../img/avatar.png";


function Profile(props) {
    const navigate = useNavigate();
    //Authenticate and Redirect if not Logged in
    if (!props.username) {
        return <Navigate to="/" />
    }
    const user = getUserDetails(props.username);
    function removeUser()
    {
        const email = user.email;
        // Step 1 Logout User
        // Step 2 Delete User
        
        deleteUser(email);
        props.logoutUser();
        navigate("/Home");
    }
    
    return (
        <div className="profile-body">
             
            <img className="Profile-Pic" src=  {user.img.length === 0 ? avatar : user.img } alt="Profile"></img>
            <div className="text-container">
                <h1>Profile Page</h1>
                <p>
                    Name: {user.firstName} {user.lastName} <br></br>
                    Date of Birth: {user.dob}<br></br>
                    date joined: {user.date_joined} <br></br>
                    
                </p>
                <div className="link-container">
                    <Link  to="/Profile-Edit"><span className="material-icons" >edit_square</span></Link>
                    <Link to="/"><span type="button" className="material-icons" onClick={removeUser}>delete</span></Link>
                </div>
            </div>
                
            
        </div>
    );
}

export default Profile;