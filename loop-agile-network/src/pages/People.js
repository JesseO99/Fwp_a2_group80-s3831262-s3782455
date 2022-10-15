import "./People.css";
import {useContext, useEffect, useState} from "react";
import PersonCard from "../components/PersonCard";
import { UserContext } from "../App";



function People(props) {
    const user = useContext(UserContext);
    const [updateStatus, setUpdateStatus] = useState(0);
    useEffect(() => { props.getAllUsers(user.user_id);},[updateStatus]);

    function followButtonClicked()
    {
        if(updateStatus === 0)
        {
            setUpdateStatus(1);
        }
        else
        {
            setUpdateStatus(0);
        }
    }

    return (
        <div className="People-Container">
            <h1> People </h1>
            <div>
                {props.users.map((user) => (
                    <ul>
                        <li>
                            <PersonCard user={user} followButtonClicked={followButtonClicked}/>
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    )
}




export default People;