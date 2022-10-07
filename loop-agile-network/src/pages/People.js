import "./People.css";
import {useContext, useEffect} from "react"
import {getUsers} from "../data/repository"
import PersonCard from "../components/PersonCard";
import { UserContext } from "../App";



function People(props) {
    const user = useContext(UserContext);
    useEffect(() => { props.getAllUsers(user.user_id);}, []);


    return (
        <div className="People-Container">
            <h1> People </h1>
                {props.users.map((user) => (
                            <ul>
                                <li>
                                    <PersonCard user={user} />
                                </li>
                            </ul>
                ))}
        </div>
    )
}




export default People;