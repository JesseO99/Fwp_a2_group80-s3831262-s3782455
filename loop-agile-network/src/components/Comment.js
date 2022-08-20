import "./Comment.css";
import {Accordion, Button, InputGroup, Stack} from "react-bootstrap";
import avatar from "../img/avatar.png";
import {getNameByEmail} from "../data/repository";
import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import SubComment from "./SubComment";


const Comment = ({username, comment, post, addSubComment}) => {


    const [subComment, setSubComment] = useState('');
    const [accordionStatus, setAccordionStatus] = useState("1");

    const sendSubComment = (event) => {
        event.preventDefault();

        if (subComment !== "") {

            const newSubComment = {
                user: username,
                text: subComment,
            }
            addSubComment(post, comment, newSubComment);
        }

        setSubComment("");
        updateAccordion();


    };


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
                    <p id="comment-author">{getNameByEmail(comment.user)}</p>
                    <div id="comment-vr" className="vr"></div>

                    <p id="comment">{comment.text}</p>

                </Stack>

                {/*Create a list of SubComments*/}
                {comment.subComments.map((subComment) => (
                    <>
                        <div className="sub-comment-container">
                            <li>
                                <SubComment subComment={subComment}/>
                            </li>
                        </div>
                    </>))}


                <Accordion defaultActiveKey="0">
                    <button class="reply-button"  onClick={updateAccordion}> Reply</button>
                    <Accordion.Collapse eventKey={accordionStatus}>
                        <Form onSubmit={sendSubComment}>
                            <InputGroup className="mb-3" id="sub-comment-field">
                                <Form.Control
                                    placeholder=  {"Reply " +getNameByEmail(comment.user)}
                                    aria-label= {"Reply " +getNameByEmail(comment.user)}
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