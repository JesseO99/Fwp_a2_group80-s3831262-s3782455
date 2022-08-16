import React from 'react'
import { Navigate } from 'react-router-dom'

function Feed({ username }) {

    //Authenticate and Redirect if not Logged in
    if (!username) {
        return <Navigate to="/" />
    }
    return(
        <div class="container">
            <h1>
                Feed
            </h1>
        </div>
    )
}

export default Feed;