import React, {useState} from 'react'
import {Navigate} from 'react-router-dom'
import {Button, Stack} from "react-bootstrap";
import Post from "../components/Post";
import "./CreatePost.css";
import Form from 'react-bootstrap/Form';
import {useFormik} from 'formik';


//Field Validations Using Formik
const validate = values => {
    const errors = {};

    //Validate post field
    if (!values.post) {
        errors.post = 'Post cannot be empty!';
    } else if (values.post.length > 250) {
        errors.post = 'Post cannot be more than 250 characters!';
    }
    return errors;
};

function CreatePost({username, addPost}) {

    const formik = useFormik({
        initialValues: {}, validate, onSubmit: values => {
            //Submit post values
            addPost(values.post);
            //Reset Form After Submit
            formik.resetForm({
                values: {post: ''},
            });

        },
    });

    //Authenticate and Redirect if not Logged in
    if (!username) {
        return <Navigate to="/"/>
    }


    return (<div className="create-post-form ">
        <Stack gap={3}>
            <p id="create-post-heading">Create Post</p>
            <div className="posts-container">
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea"
                                      size="lg"
                                      id="post"
                                      placeholder="What's on your mind?"
                                      rows={3}
                                      onChange={formik.handleChange}
                                      value={formik.values.post}
                        />
                        {formik.errors.post ? <div>{formik.errors.post}</div> : null}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Button id="publish-button" variant='primary' type="submit">Publish</Button>
                    </Form.Group>

                </Form>
            </div>
        </Stack>

    </div>)
}

export default CreatePost;



