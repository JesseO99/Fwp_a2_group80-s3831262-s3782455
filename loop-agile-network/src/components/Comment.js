import "./Comment.css";
import {Button, Stack} from "react-bootstrap";
import avatar from "../img/avatar.png";
import {getNameByEmail} from "../data/repository";
import React from "react";


const Comment = ({username, comment}) => {

    return(
        <div>
            <div >
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
                {/*<p style={{textAlign:"left", fontSize:"15px", fontWeight:"Bold",*/}
                {/*marginTop:"-15px",*/}
                {/*marginBottom:"5px",*/}
                {/*    marginLeft:"35px"*/}
                {/*}}>Reply</p>*/}
                {/*</Stack>*/}
            </div>
        </div>
    );
}
export {Comment as default};