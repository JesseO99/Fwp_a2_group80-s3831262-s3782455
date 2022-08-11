import "./Profile.css";
import {getUserDetails, getUser} from "../data/repository"


function Profile(props) {

    const user = getUserDetails(props.email);
    return (
        <div class="profile-body">
            {user.img === null ? 
            (<img class="Profile-Pic" src="https://img.icons8.com/ios/100/000000/gender-neutral-user.png" alt="Profile picture"></img>):
            (<img class="Profile-Pic" src={user.img} alt="Profile picture"></img>)}
            
            <div class="text-container">
                <h1>Profile Page</h1>
                <p>
                    Name: {user.name} <br></br>
                    Age: {user.age}<br></br>
                    date joined: {user.date_joined} <br></br>
                    
                </p>
            </div>
        </div>
    );
}

export default Profile;