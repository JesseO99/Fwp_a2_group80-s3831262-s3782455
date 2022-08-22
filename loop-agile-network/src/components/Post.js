import React, {useState} from 'react';
import "./Post.css";
import Form from "react-bootstrap/Form";
import {Button, InputGroup, Row, Stack} from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {getNameByEmail} from "../data/repository";
import avatar from '../img/avatar.png';
import Comment from "./Comment";


// Post component for individual post
const Post = ({username, post, removePost, addComment, addSubComment}) => {

    const [comment, setComment] = useState('');

    const sendComment = (event) => {
        event.preventDefault();

        // Post the comment if there's a value
        if (comment !== "") {
            const newComment = {
                user: username,
                text: comment,
                subComments:[]
            }
            addComment(post, newComment);
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
                        <p id="post-author">{getNameByEmail(post.email)}</p>
                        {/*Show delete button only for the posts user posted*/}
                        {username === post.email &&
                            <>
                                <div className="ms-auto"/>
                                <div>
                                    <Button
                                        className="delete-button"
                                        variant="danger"
                                        onClick={() => removePost(post)}>
                                        Delete
                                    </Button>
                                </div>
                            </>
                        }
                    </Stack>

                    {post.img !== "" && <>
                        <div>
                            <img src={post.img}
                                 className="rounded img-fluid "
                                 id="post-image"
                            />
                        </div>
                    </>
                    }

                    <p id="post-text">{post.post}</p>
                    <hr data-content="AND" className="hr-text"/>
                    {post.comments.length>0 && <p className="comment-heading" >Comments</p>}

                    {/*Create a list of comments*/}
                    <ul className="reverse-list">
                    {post.comments.map((comment) => (
                        <>
                            <li>
                                <Comment username={username} comment={comment} post={post} addSubComment={addSubComment}/>
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