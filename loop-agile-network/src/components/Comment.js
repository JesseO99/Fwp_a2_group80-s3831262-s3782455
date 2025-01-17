import "./Comment.css";
import {Accordion, Button, InputGroup, Stack} from "react-bootstrap";
import avatar from "../img/avatar.png";
import React, {useContext, useState} from "react";
import Form from "react-bootstrap/Form";
import SubComment from "./SubComment";
import {ToastContext, UserContext} from "../App";
import Reaction from "./Reaction";
import {Interaction} from "../data/Constant";


const Comment = ({comment, post, addSubComment}) => {

    const user = useContext(UserContext);
    const toastMessage = useContext(ToastContext);
    const [subComment, setSubComment] = useState('');
    const [accordionStatus, setAccordionStatus] = useState("1");

    const sendSubComment = (event) => {
        event.preventDefault();

        // Post the sub-comment if there's a value
        if (subComment !== "") {
            const newSubComment = {
                commentId: comment.comment_id,
                userId: user.user_id,
                subComment: subComment,
            }
            addSubComment(newSubComment,toastMessage);
        }

        setSubComment("");
        updateAccordion();


    };

    //Accordion for Sub-comment fields
    function updateAccordion() {
        if (accordionStatus === "1") {
            setAccordionStatus("0");
        } else {
            setAccordionStatus("1");
        }
    }

    return (
        <div>
            <div>
                {/*<Stack direction="vertical" gap={1} >*/}
                <Stack direction="horizontal" gap={2} className="comment-form">
                    <img className="rounded-circle"
                         alt="Avatar"
                         id="comment-avatar"
                         src={avatar}
                    />
                    <p id="comment-author">{comment.user.first_name+" "+comment.user.last_name}</p>
                    <div id="comment-vr" className="vr"></div>

                    <p id="comment">{comment.comment_content}</p>

                </Stack>
                {/*Reaction Section*/}
                <div id="reaction-section">
                <Reaction
                    contentId={comment.comment_id}
                    contentType={Interaction.COMMENT}
                    userId={user.user_id}
                    currentReaction={comment.user_reactions[0]? comment.user_reactions[0].userReaction : undefined}
                    likedCount={comment.user_reactions[0]?comment.user_reactions[0].likedCount:undefined}
                    dislikedCount={comment.user_reactions[0]?comment.user_reactions[0].dislikedCount:undefined}/>
                </div>
                {/*Create a list of SubComments*/}
                {comment.sub_comments.map((subComment) => (
                    <>
                        <div className="sub-comment-container">
                            <li>
                                <SubComment subComment={subComment}/>
                            </li>
                        </div>
                    </>))}

                {/*Reply for comment section*/}
                <Accordion defaultActiveKey="0">
                    <button class="reply-button" onClick={updateAccordion}> Reply</button>
                    <Accordion.Collapse eventKey={accordionStatus}>
                        <Form onSubmit={sendSubComment}>
                            <InputGroup className="mb-3" id="sub-comment-field">
                                <Form.Control
                                    placeholder={"Reply " + comment.user.first_name}
                                    aria-label={"Reply " + comment.user.first_name}
                                    aria-describedby="basic-addon2"
                                    value={subComment}
                                    onChange={(e) => setSubComment(e.target.value)}
                                />
                                <Button variant="outline-primary" id="button-addon2" type="submit">
                                    Reply
                                </Button>
                            </InputGroup>
                        </Form>
                    </Accordion.Collapse>

                </Accordion>


            </div>
        </div>
    );
}
export {Comment as default};