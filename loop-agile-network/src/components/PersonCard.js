import "./PersonCard.css"
import avatar from "../img/avatar.png"
function PersonCard (props) {
    return(
        <div className="person-card-container">
            <div className="person-card-box">
                <img className="Profile-Pic" src={avatar} alt="Profile-Pic"></img>
                <label>
                    {props.user.first_name} {props.user.last_name}
                </label>
                <input type="button" value="Follow"/>
            </div>

        </div>
    )
}

export default PersonCard