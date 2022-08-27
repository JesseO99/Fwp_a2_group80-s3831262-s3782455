import {useEffect, useState} from "react";
import {getPostDetails, setPostDetails} from "../data/repository";

//Custom Hook for Posting and Commenting
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

    //Remove User's Posts
    const removeUserPosts = (user) => {
        setPosts(posts.filter((post) => user !== post.email));
        removeComments(user);
    };

    //Remove all Comments by User
    const removeComments = (user) => {
        const postList = posts.slice();
        for (let i = 0; i < postList.length; i++) {
            let newCommentList = [];
            for (const comment of postList[i].comments) {
                if (comment.user != user) {
                    comment.subComments = (comment.subComments.filter((subComment) => user !== subComment.user));
                    newCommentList.push(comment);
                }
            }
            postList[i].comments = newCommentList;
        }
        setPosts(postList);
    };

    //Update the email of  All Comments and Posts with a new email
    const updateAllUserEntryEmails = (previousEmail, newEmail) => {
        const postList = posts.slice();
        for (let i = 0; i < postList.length; i++) {
            for (let k = 0; k < postList[i].comments.length; k++) {
                for (let j = 0; j < postList[i].comments[k].subComments.length; j++) {
                    if (postList[i].comments[k].subComments[j].user === previousEmail) {
                        postList[i].comments[k].subComments[j].user = newEmail;
                    }
                }
                if (postList[i].comments[k].user === previousEmail) {
                    postList[i].comments[k].user = newEmail;
                }
            }
            if (postList[i].email === previousEmail) {
                postList[i].email = newEmail;
            }
        }
        setPosts(postList);
    }

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
        addSubComment,
        removeUserPosts,
        updateAllUserEntryEmails
    }
};

export default usePost;