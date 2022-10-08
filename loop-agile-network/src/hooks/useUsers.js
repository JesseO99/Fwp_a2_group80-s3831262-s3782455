import {useState} from "react"
import {getUsersFollowing, getAllFollowingUsers} from "../data/repository"

function useUsers() {
    const [users, setUsers] = useState([]);

    async function getAllUsers(user_id) {
        setUsers(await getUsersFollowing(user_id));
    }

    

    async function getAllFollowing(user_id) {
        let users = await getAllFollowingUsers(user_id)
        setUsers(users);
    }

    return {getAllUsers, users, getAllFollowing}
    
}

export default useUsers;