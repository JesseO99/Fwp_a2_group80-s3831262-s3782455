import "./UserProfile.css";
import { useParams } from 'react-router';
import {getUserById, check_following, followUser, unfollowUser,} from '../data/repository';
import {useState, useEffect,useContext} from 'react';
import avatar from "../img/avatar.png";
import {Button} from "react-bootstrap";
import Feed from "./Feed";
import {UserContext} from "../App";

function UserProfile(props)
{
    const user = useContext(UserContext);
    const [follows, setFollows] = useState(false);
    const {profile_id} = useParams();
    const [profile, setProfile] = useState( 0);
    

    useEffect( () => {
        // Sets the following status
        check_following(user.user_id, profile_id).then((response) => {
            setFollows(response);
            console.log("Following: ", response, "User: ", user.user_id, "Profile: ", profile_id)
        });
        // Gets the user details
        getUserById(profile_id).then((response)=>{
            setProfile(response);
    })}, [profile_id, user])

    // Allows user to follow the profile selected
    async function onClickFollow()
    {
        await followUser(user.user_id, profile_id)
        setFollows(true);
    }

    // Allows user to unfollow the profile selected
    async function onClickUnfollow()
    {
        await unfollowUser(user.user_id, profile_id)
        setFollows(false);
    }
    
    return (
        <div className = "profile-contatainer">
            <p id="profile-heading"> User Profile </p>
            <div className="profile-body">
                <img className="Profile-Pic" src={avatar} alt="Profile"></img>
                <div className="text-container">
                    <h1>{profile.first_name} {profile.last_name}</h1>
                    <br/>
                    <h5>About Me</h5>
                    <p>
                        Joined: {profile.date_joined} <br></br>
                        Email: {profile.email} <br></br>
                    </p>
                </div>
                <div className="link-container">
                    
                    { follows === true ?  
                    <Button onClick={onClickUnfollow}>Unfollow</Button> : 
                    <Button onClick={onClickFollow}>Follow</Button> }
                </div>
            </div>
            <div className="post-container">
                <Feed posts={props.posts} 
                removePost={props.removePost} 
                addComment={props.addComment}
                addSubComment={props.addSubComment}
                getAllPosts={props.getAllPosts}
                user_id={profile_id}/>
            </div>
        </div>
    );
}

export default UserProfile;

