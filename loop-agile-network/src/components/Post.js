import React, {useContext, useState} from 'react';
import "./Post.css";
import Form from "react-bootstrap/Form";
import {Button, InputGroup, Row, Stack, ToastContainer} from "react-bootstrap";
import avatar from '../img/avatar.png';
import Comment from "./Comment";
import {ToastContext, UserContext} from "../App";
import {Interaction, Interaction as Ineraction, Result} from "../data/Constant";
import sanitize from "sanitize-html";
import Reaction from "./Reaction";



// Post component for individual post
const Post = ({post, removePost, addComment, addSubComment}) => {

    const user = useContext(UserContext);
    const toastMessage = useContext(ToastContext);
    const [comment, setComment] = useState('');

    //Call the delete post method in usePost
    const deletePost = async (id) => {
        let status = await removePost(id,toastMessage,user.user_id);
    }


    const sendComment = (event) => {
        event.preventDefault();

        // Post the comment if there's a value
        if (comment !== "") {
            const newComment = {
                postId: post.post_id,
                userId: user.user_id,
                comment: comment,
            }
            addComment(newComment,toastMessage);
        }
        setComment("");

    };

    return (
        <div className="post-form">
            <Stack direction="vertical" gap={3}>
                <div className="">
                    <Stack direction="horizontal" gap={2}>
                        <img className="rounded-circle"
                             alt="Avatar"
                             id="post-avatar"
                             src={avatar}
                        />
                        <p id="post-author">{post.user.first_name + " " +post.user.last_name}</p>
                        {/*Show delete button only for the posts user posted*/}
                        {user.user_id === post.user_id &&
                            <>
                                <div className="ms-auto"/>
                                <div>
                                    <Button
                                        className="delete-button"
                                        variant="danger"
                                        onClick={() => deletePost(post.post_id)}>
                                        Delete
                                    </Button>
                                </div>
                            </>
                        }
                    </Stack>

                    {post.img !== "" && <>
                        <div>
                            <img src={post.image_url}
                                 className="rounded img-fluid "
                                 id="post-image"
                            />
                        </div>
                    </>
                    }

                    <p id="post-text"><span dangerouslySetInnerHTML={{ __html: sanitize(post.post_content) }} /></p>
                    <hr data-content="AND" className="hr-text"/>
                    {/*Reaction Section*/}
                    <Reaction
                        contentId={post.post_id}
                        contentType={Interaction.POST}
                        userId={user.user_id}
                        currentReaction={post.user_reactions[0]? post.user_reactions[0].userReaction : 0}
                        likedCount={post.user_reactions[0]?post.user_reactions[0].likedCount:undefined}
                        dislikedCount={post.user_reactions[0]?post.user_reactions[0].dislikedCount:undefined}/>
                    {post.comments.length > 0 && <p className="comment-heading">Comments</p>}

                    {/*Create a list of comments*/}
                    <ul className="reverse-list">
                        {post.comments.map((comment) => (
                            <>
                                <li>
                                    <Comment comment={comment} post={post} addSubComment={addSubComment}/>
                                </li>
                            </>))}
                    </ul>
                    {/*Comment Section*/}
                    <Form onSubmit={sendComment}>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Write a comment..."
                                aria-label="Write a comment..."
                                aria-describedby="basic-addon2"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <Button variant="outline-primary" id="button-addon2" type="submit">
                                Comment
                            </Button>
                        </InputGroup>
                    </Form>

                </div>

            </Stack>
        </div>
    );
};

export {Post as default};