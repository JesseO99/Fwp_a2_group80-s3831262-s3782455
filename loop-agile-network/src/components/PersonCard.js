import "./PersonCard.css"
import avatar from "../img/avatar.png"
import {useContext} from "react"
import {UserContext} from "../App";
import {Button} from "react-bootstrap"
import {followUser, unfollowUser} from "../data/repository"
import {Navigate} from "react-router-dom";
import {Link} from "react-router-dom";

function PersonCard (props) {
    const user = useContext(UserContext);

    async function onClickFollow()
    {
        // Create New Follow
        await followUser(user.user_id, props.user.user_id)
        props.followButtonClicked();
        
    }

    async function onClickUnfollow()
    {
        // Unfollows User
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
                <Link  to={'/User_Profile/' + props.user.user_id } >
                    <Button variant="light"> View Profile </Button>
                </Link>

                { props.user.following !== 1 ? 
                <Button onClick={onClickFollow} data-testid="follow-button">Follow</Button> : 
                <Button onClick={onClickUnfollow} data-testid="unfollow-button">Unfollow</Button> }
                
            </div>


        </div>
    )
}

export default PersonCard