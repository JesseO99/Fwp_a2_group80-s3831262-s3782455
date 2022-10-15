import {
    render,
    screen,
    fireEvent,
    waitFor,
    waitForElementToBeRemoved,
    queryByText,
    getByText
} from "@testing-library/react";
import CreatePost from "./CreatePost";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import userEvent from "@testing-library/user-event";
import {getUserById, updateUser} from "../data/repository";
import {LoginUserContext, UserContext} from "../App";
import React from "react";


// Global data for all tests
let container;
let user;

const mockAddPost = jest.fn();

jest.mock('../hooks/usePost', () => {
    return jest.fn(() => ({
        addPost: mockAddPost
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

    const utils = render(
        <UserContext.Provider value={user}>
            <LoginUserContext.Provider value={loginUser}>
                <Router>
                    <CreatePost addPost={mockAddPost}/>
                </Router>
            </LoginUserContext.Provider>
        </UserContext.Provider>);
    container = utils.container;
});


// Basic Render Test for Create Post.
test("Render Create Post", () => {
    expect(container).toBeInTheDocument();
});

// Test the validation when there is no content in the post
test("Empty Post Creation", async  () => {

    const publish = screen.getByTestId("publish");
    userEvent.click(publish);
    await waitFor(async () => {expect(await screen.findByText("Post cannot be empty!")).toBeInTheDocument()});
});


// Test the form makes empty after post published
test("Form Empty Test", async  () => {
    const editor = screen.getAllByText("What's on your mind?");
    userEvent.type(editor, {target: {value: "Hello World"}});

    const publish = screen.getByTestId("publish");
    userEvent.click(publish);

    await waitFor(() => {
        expect(screen.getAllByText("What's on your mind?").toBeInTheDocument)
    })
});