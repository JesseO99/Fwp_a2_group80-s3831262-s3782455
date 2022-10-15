import {Stack} from "react-bootstrap";
import React, {useContext, useEffect, useState} from "react";
import "./Reaction.css";
import {Interaction, Reactions} from "../data/Constant";
import {ReactionContext, ToastContext} from "../App";
import likeBlack from "../img/like_black.png";
import likeBlue from "../img/like_blue.png";
import dislikeBlack from "../img/dislike_black.png";
import dislikeRed from "../img/dislike_red.png";
const Reaction = ({contentId,contentType,userId,currentReaction, likedCount,dislikedCount}) => {

    const toastMessage = useContext(ToastContext);
    const sendReaction = useContext(ReactionContext);
    const [reaction, setReaction] = useState(0);
    const [numOfLikes, setNumOfLikes] = useState(0);
    const [numOfDislikes, setNumOfDislikes] = useState(0);

    useEffect(() => {
        //Set initial values for the reactions
        if(likedCount) setNumOfLikes(likedCount);
        if(dislikedCount) setNumOfDislikes(dislikedCount);
        if(currentReaction!=null) setReaction(currentReaction);
    }, []);

    //Set Like button Appearance
    function setLikeAppearance(){
        if(reaction== Reactions.LIKED){
            return 'btn-liked'
        }else{
            return 'btn-normal'
        }
    }

    //Set Dislike button Appearance
    function setDislikeAppearance(){
        if(reaction== Reactions.DISLIKED){
            return 'btn-disliked'
        }else{
            return 'btn-normal'
        }
    }

    //Common function for set button appearance
    function setAppearance(){
        setLikeAppearance();
        setDislikeAppearance();
    }

    //Make reaction API call
    function addReaction(react){
        const newReaction = {
            contentId:contentId,
            contentType:contentType,
            reactionType:react,
            userId:userId
        }
        sendReaction(newReaction,toastMessage);
    }

    //Handle Like button
    function likeClicked(){
        switch(reaction) {
            case  Reactions.NONE:
                setReaction(Reactions.LIKED);
                addReaction(Reactions.LIKED);
                setNumOfLikes(numOfLikes+1);
                break;
            case  Reactions.LIKED:
                setReaction(Reactions.NONE);
                addReaction(Reactions.NONE);
                setNumOfLikes(numOfLikes-1);
                break;
        case  Reactions.DISLIKED:
            setReaction(Reactions.LIKED);
            addReaction(Reactions.LIKED);
            setNumOfLikes(numOfLikes+1);
            setNumOfDislikes(numOfDislikes-1);
                break;
            default:
                setReaction(Reactions.NONE);
                addReaction(Reactions.NONE);
        }
        setAppearance();
    }

    //Handle Dislike button
    function dislikeClicked(){
        switch(reaction) {
            case  Reactions.NONE:
                setReaction(Reactions.DISLIKED);
                addReaction(Reactions.DISLIKED);
                setNumOfDislikes(numOfDislikes+1);
                break;
            case  Reactions.DISLIKED:
                setReaction(Reactions.NONE);
                addReaction(Reactions.NONE);
                setNumOfDislikes(numOfDislikes-1);
                break;
            case  Reactions.LIKED:
                setReaction(Reactions.DISLIKED);
                addReaction(Reactions.DISLIKED);
                setNumOfDislikes(numOfDislikes+1);
                setNumOfLikes(numOfLikes-1);
                break;
            default:
                setReaction(Reactions.NONE);
                addReaction(Reactions.DISLIKED);
        }
        setAppearance();
    }
    return (
        //Individual Reaction
        <div>

            <Stack direction={contentType == Interaction.POST? "vertical" : "horizontal"}>
            <Stack direction="horizontal" gap="2" id="like-stack">
                <img src={reaction == Reactions.LIKED? likeBlue : likeBlack} id={setLikeAppearance()} onClick={likeClicked}/>
                <img src={reaction == Reactions.DISLIKED? dislikeRed : dislikeBlack} id={setDislikeAppearance()} onClick={dislikeClicked}/>
            </Stack>
            <p id="like-dislike-count">{numOfLikes+" Likes "+ numOfDislikes+" Dislikes"} </p>
            </Stack>
            <div id="bottom-line"/>


        </div>
    );
}
export {Reaction as default};