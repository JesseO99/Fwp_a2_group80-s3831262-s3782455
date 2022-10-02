import "./SubComment.css";
import {Button, InputGroup, Stack} from "react-bootstrap";
import avatar from "../img/avatar.png";
import {getNameByEmail} from "../data/repository";
import React, {useState} from "react";
import Form from "react-bootstrap/Form";


const SubComment = ({subComment}) => {


    return (
        //Individual Sub-comment
        <div>
            <div>
                <Stack direction="horizontal" gap={2} className="subcomment-form ">
                    <p id="subcomment-author">{subComment.user.first_name+" "+subComment.user.last_name}</p>
                    <div id="subcomment-vr" className="vr"></div>
                    <p id="subcomment">{subComment.sub_comment_content}</p>
                </Stack>

            </div>
        </div>
    );
}
export {SubComment as default};