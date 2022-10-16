import {BrowserRouter as Router, Route} from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import {getUserById, updateUser} from "../data/repository";
import {LoginUserContext, UserContext, ReactionContext, ClearPostsContext} from "../App";
import React from "react";
import Feed from "./Feed";
import {render, screen, waitFor} from "@testing-library/react";

// Global data for all tests
let container;
let user;


const mockRemovePost = jest.fn();
const mockAddComment = jest.fn();
const mockAddSubComment = jest.fn();
const mockGetAllPosts = jest.fn();

jest.mock('../hooks/usePost', () => {
    return jest.fn(() => ({
        removePost: mockRemovePost,
        addComment: mockAddComment,
        addSubComment: mockAddSubComment,
        getAllPosts: mockGetAllPosts,

    }))
})


// Instantiation once for all tests
beforeAll(async () => {
    user = await getUserById(1);

});

// Instantiation Test
beforeEach(async () => {
    function loginUser() {
    }

    function sendReaction(para1, para2) {

    }
    function clearPosts() {


    }

    let posts = [
        {
            "post_id": 1,
            "user_id": 1,
            "post_content": "Welcome to Loop Agile Now!",
            "image_url": null,
            "user": {
                "user_id": 1,
                "email": "rue@gmail.com",
                "first_name": "Rue",
                "last_name": "Minmi"
            },
            "comments": [],
            "user_reactions": [
                {
                    "likedCount": 0,
                    "dislikedCount": 0,
                    "userReaction": null
                }
            ]
        }
    ];

    const utils = render(
        <UserContext.Provider value={user}>
            <LoginUserContext.Provider value={loginUser}>
                <ReactionContext.Provider value={sendReaction}>
                    <ClearPostsContext.Provider value={clearPosts}>
                    <Router>
                        <Feed posts={posts} removePost={mockRemovePost} addComment={mockAddComment}
                              addSubComment={mockAddSubComment}
                              getAllPosts={mockGetAllPosts} userId={user ? user.user_id : undefined}/>
                    </Router>
                    </ClearPostsContext.Provider>
                </ReactionContext.Provider>
            </LoginUserContext.Provider>
        </UserContext.Provider>);
    container = utils.container;
});


// Basic Render Test for Create Post.
test("Render Feed Test", () => {
    expect(container).toBeInTheDocument();
});


// Initial Feed List Testing
test("Feed Testing", () => {
    waitFor(async () => {
        expect(screen.findByText("Welcome to Loop Agile Now!")).toBeInTheDocument()
        expect(screen.findByText("0 Likes 0 Dislikes")).toBeInTheDocument()
    });
});

//Testing the Reaction Functionality
// Test the Like button functionality and Like count
test("Test Like Button", async () => {
    const likeBtn = screen.getByTestId("like_button");
    userEvent.click(likeBtn);
    await waitFor(async () => {
        expect(await screen.findByText("1 Likes 0 Dislikes")).toBeInTheDocument()
    });
});

// Test the Dislike button functionality and Like count
test("Test Dislike Button", async () => {
    const dislikeBtn = screen.getByTestId("dislike_button");
    userEvent.click(dislikeBtn);
    await waitFor(async () => {
        expect(await screen.findByText("0 Likes 1 Dislikes")).toBeInTheDocument()
    });
});


// Test Clicking both Like and Dislike button functionality and test final reaction status
test("Test Like then Dislike Button", async () => {
    const likeBtn = screen.getByTestId("like_button");
    userEvent.click(likeBtn);
    const dislikeBtn = screen.getByTestId("dislike_button");
    userEvent.click(dislikeBtn);
    await waitFor(async () => {
        expect(await screen.findByText("0 Likes 1 Dislikes")).toBeInTheDocument()
    });
});