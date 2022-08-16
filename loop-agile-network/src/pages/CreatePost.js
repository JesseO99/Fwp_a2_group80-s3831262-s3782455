import React from 'react'
import { Navigate } from 'react-router-dom'

function CreatePost({ username }) {

    //Authenticate and Redirect if not Logged in
    if (!username) {
        return <Navigate to="/" />
    }
    return (
        <div class="Create-Post">
            <h1> Create Post</h1>
        </div>
    )
};

export default CreatePost;