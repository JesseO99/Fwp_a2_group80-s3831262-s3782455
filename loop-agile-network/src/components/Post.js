import React from 'react';
import "./Post.css";
import Form from "react-bootstrap/Form";
import {Button, Row, Stack} from "react-bootstrap";
import Col from "react-bootstrap/Col";

// Item component will display the item
const Post = ({post, removePost}) => {
    return (
        <div className="post-form">
            <Stack direction="horizontal" gap={3}>
                <div className="">
                    <p id="post-heading">{post}</p>
                </div>
                <div className="vr ms-auto"/>
                <div>
                    <Button className="delete-button" variant="danger"
                            onClick={() => removePost(post)}>Delete</Button>{' '}
                </div>
            </Stack>


        </div>
    );
};

export {Post as default};