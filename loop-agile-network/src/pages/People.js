import "./People.css";
import {useState, useEffect} from "react"
import {getUsers} from "../data/repository"
import PersonCard from "../components/PersonCard";



function People(props) {

    useEffect(() => { props.getAllUsers();}, []);


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