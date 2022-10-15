import "./SubComment.css";
import {Button, InputGroup, Stack} from "react-bootstrap";
import avatar from "../img/avatar.png";
import {getNameByEmail} from "../data/repository";
import React, {useContext, useState} from "react";
import Form from "react-bootstrap/Form";
import Reaction from "./Reaction";
import {Interaction} from "../data/Constant";
import {UserContext} from "../App";


const SubComment = ({subComment}) => {
    const user = useContext(UserContext);

    return (
        //Individual Sub-comment
        <div>
            <div>
                <Stack direction="horizontal" gap={2} className="subcomment-form ">
                    <p id="subcomment-author">{subComment.user.first_name+" "+subComment.user.last_name}</p>
                    <div id="subcomment-vr" className="vr"></div>
                    <p id="subcomment">{subComment.sub_comment_content}</p>
                </Stack>
                {/*Reaction Section*/}
                <div id="reaction-section">
                <Reaction
                    contentId={subComment.sub_comment_id}
                    contentType={Interaction.SUB_COMMENT}
                    userId={user.user_id}
                    currentReaction={subComment.user_reactions[0]? subComment.user_reactions[0].userReaction : undefined}
                    likedCount={subComment.user_reactions[0]?subComment.user_reactions[0].likedCount:undefined}
                    dislikedCount={subComment.user_reactions[0]?subComment.user_reactions[0].dislikedCount:undefined}/>
            </div>
            </div>
        </div>
    );
}
export {SubComment as default};