import React, {useContext, useEffect, useState} from 'react'
import {Navigate} from 'react-router-dom'
import {Button, Stack, ToastContainer} from "react-bootstrap";
import "./CreatePost.css";
import Form from 'react-bootstrap/Form';
import {useFormik} from 'formik';
import useImageUpload from "../hooks/useImageUpload";
import Toast from 'react-bootstrap/Toast';
import check from '../img/check.png'
import warning from '../img/warning.png'
import { Editor } from "react-draft-wysiwyg";
import { EditorState,convertToRaw } from "draft-js";
import camera from "../img/camera.png";
import {ClearPostsContext, ToastContext, UserContext} from "../App";
import {Result} from "../data/Constant";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';



//Field Validations Using Formik
const validate = values => {
    const errors = {};
    //Validate post field
    if ((values.post.replace(/(<([^>]+)>)/gi, "")).trim().length===0) {
        errors.post = 'Post cannot be empty!';
    } else if ((values.post.replace(/(<([^>]+)>)/gi, "")).trim().length > 600) {
        errors.post = 'Post cannot be more than 600 characters!';
    }
    return errors;
};


function CreatePost({addPost}) {

    const user = useContext(UserContext);
    const clearPosts = useContext(ClearPostsContext);
    const toastMessage = useContext(ToastContext);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    useEffect(() => {
        console.log(editorState);
    }, [editorState]);    //Call useImageUpload custom hook
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
    //Get the Rich Text Editor Value
    formik.values.post = draftToHtml(convertToRaw(editorState.getCurrentContent()))


    //Common Submit function
    function submit(url) {
        const newPost = {
            userId:user.user_id,
            post: formik.values.post,
            img: url,
            comments: []
        }
        clearPosts();
        //Submit post
       addPost(newPost,toastMessage).then(status=>{
           if(status ==Result.SUCCESS){
               //Reset Form After Submit
               formik.resetForm({
                   values: {post: ''},
               });
               setEditorState(() =>
                   EditorState.createEmpty());
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
                                <div style={{ border: "1px solid black", padding: '2px', minHeight: '200px' }}>
                                    <Editor
                                        id="post"
                                        placeholder="What's on your mind?"
                                        editorState={editorState}
                                        onEditorStateChange={setEditorState}
                                        onContentStateChange={formik.handleChange}
                                        onChange={formik.values.post}
                                        inputProps={{ "data-testid": "editor" }}
                                    />
                                </div>

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
                                        data-testid="publish"
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



