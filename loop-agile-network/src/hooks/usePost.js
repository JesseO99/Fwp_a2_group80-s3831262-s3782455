import {useEffect, useState} from "react";
import {getPostDetails, setPostDetails} from "../data/repository";

//Custom Hook for Posting
const usePost = () => {

    const [posts, setPosts] = useState([]);

    //Add New post to the list
    const addPost = (post) => {
        setPosts([...posts, post]);
    };

    //Remove post from the list
    const removePost = (postToBeDeleted) => {
        setPosts(posts.filter((post) => postToBeDeleted !== post));
    };

    //Get old posts from the local storage
    useEffect(() => {
        const posts = getPostDetails();
        if (posts) {
            setPosts(posts);
        }
    }, []);

    //Save posts to the local storage
    useEffect(() => {
        setPostDetails(posts);
    }, [posts]);

    return {
        addPost,
        removePost,
        posts
    }
};

export default usePost;