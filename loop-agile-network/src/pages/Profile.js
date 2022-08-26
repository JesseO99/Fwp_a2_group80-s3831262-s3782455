import "./Profile.css";
import {getUserDetails, deleteUser} from "../data/repository"
import {Navigate} from "react-router-dom";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import avatar from "../img/avatar.png";
import Popup from "../components/Popup";



function Profile(props) {
    const [isOpen, setIsOpen] = useState(false);

    //Authenticate and Redirect if not Logged in
    if (!props.username) {
        return <Navigate to="/" />
    }
    const user = getUserDetails(props.username);
    
    // Controls whether popup is vissible or invisible
    const  togglePopup = () => {
        setIsOpen(!isOpen);
    }

    function removeUser()
    {
        const email = user.email;
        // // Step 1 Logout User
        // // Step 2 Delete User
        
        deleteUser(email);
        props.removeUserPosts(email);
        props.logoutUser();

    }
    
    

    return (
        <div>
            <div className="profile-body">
                <img className="Profile-Pic" src=  {user.img.length === 0 ? avatar : user.img } alt="Profile"></img>
                <div className="text-container">
                    <h1>Profile Page</h1>
                    <p>
                        Name: {user.firstName} {user.lastName} <br></br>
                        Date of Birth: {user.dob}<br></br>
                        Date Joined: {user.date_joined} <br></br>
                        
                    </p>

                    <div className="link-container">
                        <Link  to="/Profile-Edit"><span className="edit-button material-icons" >edit_square</span></Link>
                        <span type="button" className="material-icons delete-button" value="delete" onClick={togglePopup}> delete</span>
                        
                    </div>
                    
                </div>
                    
                
            </div>
            {/* HTML for Popup */}
            {isOpen && <Popup close={togglePopup} confirm={removeUser} content = {"Are you sure you want to delete this account? This will also delete all posts made by this account."} />}
        </div>
        
    );
}

export default Profile;