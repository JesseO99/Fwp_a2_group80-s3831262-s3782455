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
import {ToastContext, UserContext} from "../App";
import {Result} from "../data/Constant";


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

    const user = useContext(UserContext);
    const toastMessage = useContext(ToastContext);

    //Call useImageUpload custom hook
    const {
        uploadImage,
        setImage,
        image,
    } = useImageUpload(submit, toastMessage);

    const formik = useFormik({
        initialValues: {}, validate, onSubmit: values => {
            //If there is an image upload the image or else submit just the comment
            if (image) {
                uploadImage();
            } else {
                submit("");
            }
        },
    });

    //Authenticate and Redirect if not Logged in
    if (!user) {
        return <Navigate to="/"/>
    }

    //Common Submit function
    function submit(url) {
        const newPost = {
            userId:user.user_id,
            post: formik.values.post,
            img: url,
            comments: []
        }

        //Submit post
       addPost(newPost,toastMessage).then(status=>{
           if(status ==Result.SUCCESS){
               //Reset Form After Submit
               formik.resetForm({
                   values: {post: ''},
               });

               //Clear Images from the Form
               setImage("")
               document.getElementById('image-field').value = "";
           }
       });

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
        </div>)
}

export default CreatePost;



