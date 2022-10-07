import "./PersonCard.css"
import avatar from "../img/avatar.png"
import {useContext} from "react"
import {UserContext} from "../App";
import {Button} from "react-bootstrap"
function PersonCard (props) {
    const user = useContext(UserContext);
    function onClickFollow()
    {
        console.log("Follower: ", user.user_id, "Follows: ", props.user.user_id);
        // Create New Follow
    }

    return(
        <div className="person-card-container">
            <div className="person-card-box">
                <img className="Profile-Pic" src={avatar} alt="Profile-Pic"></img>
                <label>
                    {props.user.first_name} {props.user.last_name}
                </label>
                <Button value="Follow" onClick={onClickFollow}>Follow</Button>
            </div>

        </div>
    )
}

export default PersonCard