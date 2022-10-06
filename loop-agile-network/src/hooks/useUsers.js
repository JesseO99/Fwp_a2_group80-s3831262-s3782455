import {useState} from "react"
import {getUsers} from "../data/repository"

function useUsers() {
    const [users, setUsers] = useState([]);

    async function getAllUsers() {
        setUsers(await getUsers());
    }

    return {getAllUsers, users}
}

export default useUsers;