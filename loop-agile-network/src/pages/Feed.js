import React from 'react'
import {Navigate} from 'react-router-dom'
import Post from "../components/Post";
import "./Feed.css";
import {Stack} from "react-bootstrap";

function Feed({username, posts, removePost}) {

    //Authenticate and Redirect if not Logged in
    if (!username) {
        return <Navigate to="/"/>
    }

    return (
        <div class="container">
            <Stack gap={3}>
                <p id="feed-heading">Feed</p>
                <div className="posts-container">
                    <ul className="feed-list">
                        {posts.map((post) => (
                            <li>
                                <Post key={post} post={post} removePost={removePost}/>
                            </li>
                        ))}
                    </ul>

                    {posts.length === 0 &&
                        <p id="empty-feed">Wow! It's Nothing Yet. <br/> Create your first post now!</p>
                    }
                </div>
            </Stack>

        </div>
    )
}

export default Feed;


