import {useState} from "react"
import {getUsersFollowing} from "../data/repository"

function useUsers() {
    const [users, setUsers] = useState([]);

    async function getAllUsers(user_id) {
        setUsers(await getUsersFollowing(user_id));
    }

    return {getAllUsers, users}

    
}

export default useUsers;