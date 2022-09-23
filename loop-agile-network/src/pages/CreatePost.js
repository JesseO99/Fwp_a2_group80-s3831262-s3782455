import React, {useContext, useState} from 'react'
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
import {UserContext} from "../App";


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

function CreatePost({addPost}) {

    const username = useContext(UserContext);
    const [show, setShow] = useState(false);
    const [toast, setToast] = useState('');

    //Call useImageUpload custom hook
    const {
        uploadImage,
        setImage,
        image,
    } = useImageUpload(submit, uploadError);

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

        //Scroll Window to top
        window.scrollTo(0, 0);
        setShow(true);
        setToast({
            title: "New Post Created!",
            message: "Woohoo, Your post has been published!",
            img: check
        })

        //Clear Images from the Form
        setImage("")
        document.getElementById('image-field').value = "";

    }

    function uploadError() {
        //Scroll Window to top
        window.scrollTo(0, 0);

        setShow(true);
        setToast({
            title: "Post Not Created!",
            message: "There was an error of publishing your post. Please try again later!",
            img: warning
        })
    }

    return (
        <div>
            <div className="create-post-form ">
                <Stack gap={3}>
                    <p id="create-post-heading">Create Post</p>
                    <div className="posts-container">
                        <Form className="create-form" onSubmit={formik.handleSubmit}>
                            <Form.Group className="mb-3">
                                {/*Preview Image*/}
                                {image !== "" && <>
                                    <div>

                                        <Stack className="align-items-center">
                                            <p style={{fontWeight: "bold"}}>Preview</p>

                                            <img src={(URL.createObjectURL(image))}
                                                 className="rounded img-fluid "
                                                 id="create-post-image"
                                            />
                                        </Stack>
                                    </div>
                                </>
                                }
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
                            <Form.Group className="mb-3">
                                <img src={camera}
                                     style={{marginRight: "8px"}}
                                />
                                <Form.Label>Image Upload</Form.Label>
                                <Form.Control
                                    id="image-field"
                                    type="file"
                                    size="sm"
                                    onChange={(e) => setImage(e.target.files[0])}/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Button id="publish-button"
                                        variant='primary'
                                        type="submit">
                                    Publish </Button>
                            </Form.Group>

                        </Form>
                    </div>
                </Stack>
            </div>
            {/*Toast Message for Success/Error Post Creation*/}
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



