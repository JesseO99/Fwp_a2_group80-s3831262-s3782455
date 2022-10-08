import "./PersonCard.css"
import avatar from "../img/avatar.png"
import {useContext, useEffect} from "react"
import {UserContext} from "../App";
import {Button} from "react-bootstrap"
import {followUser, unfollowUser} from "../data/repository"
function PersonCard (props) {
    const user = useContext(UserContext);
    async function onClickFollow()
    {
        console.log("Follower: ", user.user_id, "Follows: ", props.user.user_id);
        // Create New Follow
        await followUser(user.user_id, props.user.user_id)
        props.followButtonClicked();
        
    }

    async function onClickUnfollow()
    {
        console.log("Follower: ", user.user_id, "Unfollows: ", props.user.user_id);
        // Create New Follow
        await unfollowUser(user.user_id, props.user.user_id)
        props.followButtonClicked();
    }
    return(
        <div className="person-card-container">
            <img className="Profile-Pic" src={avatar} alt="Profile-Pic"></img>
            <h1>
                {props.user.first_name} {props.user.last_name}
            </h1>
            <div className = "link-container">
                { props.user.following !== 1 ? 
                <Button value="Follow" onClick={onClickFollow}>Follow</Button> : 
                <Button value="Follow" onClick={onClickUnfollow}>Unfollow</Button> }
                
            </div>


        </div>
    )
}

export default PersonCard