import {useContext, useEffect, useState} from "react";
import {
    getPostDetails,
    setPostDetails,
    createPost,
    getAllPosts,
    deletePostById,
    getPosts,
    addNewComment, addNewSubComment
} from "../data/repository";
import {Result} from "../data/Constant";
import check from "../img/check.png";
import warning from "../img/warning.png";
import {ToastContext} from "../App";

//Custom Hook for Posting and Commenting
const usePost = () => {

    const [posts, setPosts] = useState([]);


    //Add New post to the list
    const  addPost =  (post,toastMessage) => {
        return createPost(post).then(data =>{
            if(data.status ==Result.SUCCESS){
                //Show Success message
                toastMessage("New Post Created!","Woohoo, Your post has been published!",check)
            }else{
                toastMessage("Post Not Created!","There was an error of publishing your post. Please check your internet connection and try again later!",warning)
            }
            //Scroll Window to top
            window.scrollTo(0, 0);
            return data.status;
        });
    };

    const getAllPosts = () =>{
      getPosts().then(data=>{
          setPosts(data.data);
      })
    };

    //Remove post from the list
    const removePost = (postToBeDeleted,toastMessage) => {
        return deletePostById(postToBeDeleted).then(data =>{
            console.dir(postToBeDeleted);
            if(data.status == Result.SUCCESS){
                console.log("Success");
                //Show Success message
                toastMessage("Post Deleted","Your post deleted successfully!",check)
            }else{
                //Show Error message
                toastMessage("Post Deleting Failed","Your post couldn't delete. Please try again!",warning)
            }
            //Scroll Window to top
            window.scrollTo(0, 0);
            getAllPosts();
            return data.status;
        });


    };

    //Remove User's Posts
    const removeUserPosts = (user) => {
        removeComments(user);
        setPosts(posts.filter((post) => user !== post.email));
        
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
    const addComment = (comment,toastMessage) => {
        return addNewComment(comment).then(data =>{
            if(data.status !=Result.SUCCESS){
                //Show error message
                toastMessage("Comment not posted!","There was an error of posting your comment. Please check your internet connection and try again later!",warning)
                //Scroll Window to top
                window.scrollTo(0, 0);
            }else{
                getAllPosts();
            }

            return data.status;
        });

    };

    //Add Sub-Comment to a comment
    const addSubComment = (subComment,toastMessage) => {
        return addNewSubComment(subComment).then(data =>{
            if(data.status !=Result.SUCCESS){
                //Show error message
                toastMessage("Comment not posted!","There was an error of posting your comment. Please check your internet connection and try again later!",warning)
                //Scroll Window to top
                window.scrollTo(0, 0);
            }else{
                getAllPosts();
            }

            return data.status;
        });
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
        updateAllUserEntryEmails,
        getAllPosts
    }
};

export default usePost;