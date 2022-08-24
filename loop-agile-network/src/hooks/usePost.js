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


    //Add New Comment to the post
    const addComment = (currentPost, comment) => {
        const newPosts = posts.filter(item => item !== currentPost);
        currentPost.comments.push(comment);
        setPosts([...newPosts, currentPost]);
    };

    //Add Sub-Comment to a comment
    const addSubComment = (currentPost, comment, subComment) => {
        const newPosts = posts.filter(item => item !== currentPost);
        currentPost.comments = currentPost.comments.filter(item => item !== comment);
        comment.subComments.push(subComment);
        currentPost.comments.push(comment);
        setPosts([...newPosts, currentPost]);
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
        posts,
        addComment,
        addSubComment
    }
};

export default usePost;