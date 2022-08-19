import React, {useState} from 'react'
import {Navigate} from 'react-router-dom'
import {Button, Stack, ToastContainer} from "react-bootstrap";
import "./CreatePost.css";
import Form from 'react-bootstrap/Form';
import {useFormik} from 'formik';
import useImageUpload from "../hooks/useImageUpload";
import Toast from 'react-bootstrap/Toast';
import check from '../img/check.png'
import warning from '../img/warning.png'
import camera from "../img/camera.png";


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
    const [show, setShow] = useState(false);
    const [toast, setToast] = useState('');

    //Call useImageUpload custom hook
    const {
        uploadImage,
        setImage,
        image,
    } = useImageUpload(submit,uploadError);

    const formik = useFormik({
        initialValues: {}, validate, onSubmit: values => {
            //If there is an image upload the image or else submit just the comment
            if (image) {
                console.log("upload image")
                uploadImage();
            } else {
                console.log("normal Submit")
                submit("");
            }
        },
    });


    //Authenticate and Redirect if not Logged in
    if (!username) {
        return <Navigate to="/"/>
    }

    //Common Submit function
    function submit(url) {
        const newPost = {
            email: username,
            post: formik.values.post,
            img: url,
            comments: []
        }

        //Submit post values
        addPost(newPost);
        //Reset Form After Submit
        formik.resetForm({
            values: {post: ''},
        });
        setShow(true);
        setToast({
            title:"New Post Created!",
            message:"Woohoo, Your post has been published!",
            img:check
        })
    }

    function uploadError(){
        setShow(true);
        setToast({
            title:"Post Not Created!",
            message:"There was an error of publishing your post. Please try again later!",
            img:warning
        })
    }

    return (
        <div>
            <div className="create-post-form ">
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
                            <Form.Group controlId="formFileSm" className="mb-3">
                                <img src={camera}
                                     style={{marginRight: "8px"}}
                                />
                                <Form.Label>Image Upload</Form.Label>
                                <Form.Control type="file"
                                              size="sm"
                                              onChange={(e) => setImage(e.target.files[0])}/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Button id="publish-button"
                                        variant='primary'
                                        type="submit">
                                    Publish </Button>
                            </Form.Group>

                        </Form>
                    </div>
                </Stack>
            </div>
            {/*Toast Message for Success Post Creation*/}
            <ToastContainer className="p-3" position="top-end">
                <Toast onClose={() =>
                    setShow(false)}
                       show={show}
                       delay={6000}
                       autohide>
                    <Toast.Header>
                        <img
                            src={toast.img}
                            className="rounded me-2"
                            alt=""
                            style={{height: "20px"}}
                        />
                        <strong className="me-auto">{toast.title}</strong>
                        <small>0 mins ago</small>
                    </Toast.Header>
                    <Toast.Body>{toast.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>)
}

export default CreatePost;



