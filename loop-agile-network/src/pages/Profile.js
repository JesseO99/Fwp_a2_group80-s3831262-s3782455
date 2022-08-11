import "./Profile.css";
import {getUserDetails, getUser} from "../data/repository"


function Profile(props) {

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