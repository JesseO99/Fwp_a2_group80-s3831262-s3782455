import "./Following.css"
import PersonCard from "../components/PersonCard";
import { UserContext } from "../App";
import {useContext, useEffect, useState} from "react";

function Following(props)
{
    const user = useContext(UserContext);
    const [updateStatus, setUpdateStatus] = useState(0);

    useEffect(() => { props.getAllFollowing(user.user_id);}, [updateStatus]);

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

    return(
        <div className="Following-Container">
            <h1> Following </h1>
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

export default Following;