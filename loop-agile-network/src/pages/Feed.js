import React, {useContext, useEffect, useState} from 'react'
import {Navigate} from 'react-router-dom'
import Post from "../components/Post";
import "./Feed.css";
import {Stack, ToastContainer} from "react-bootstrap";
import {UserContext} from "../App";
import Toast from "react-bootstrap/Toast";


function Feed({posts, removePost, addComment, addSubComment, getAllPosts}) {

    const user = useContext(UserContext);

    useEffect(() => {
        getAllPosts(user.user_id);
    }, []);

    //Authenticate and Redirect if not Logged in
    if (!user) {
        return <Navigate to="/"/>
    }

    return (<div class="container">
        <Stack gap={3}>
            <p id="feed-heading">Feed</p>
            <div className="posts-container">
                <ul className="reverse-list">
                    {/*Create a list of posts*/}
                    {posts.map((post) => (
                        <li>
                            <Post post={post} removePost={removePost} addComment={addComment}
                                  addSubComment={addSubComment}/>
                        </li>))}

                </ul>

                {posts.length === 0 &&
                    <p id="empty-feed">Wow! It's Nothing Yet. <br/> Create your first post now!</p>}
            </div>
        </Stack>
    </div>)
}

export default Feed;


