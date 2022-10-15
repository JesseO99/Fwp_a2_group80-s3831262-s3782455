import { render, screen, fireEvent, waitFor, findByText } from "@testing-library/react";
// import {waitForElement} from "react-resting-library"
import ProfileEdit from "./ProfileEdit";
import {BrowserRouter as Router} from 'react-router-dom';
import {getUserById, updateUser} from "../data/repository"
import { UserContext, Login, LoginUserContext } from "../App";

// Global data for all tests
let container;
let user;

// Instansiation once for all tests in Profile Edit
beforeAll(async () => {
    user = await getUserById(1);
});

// Instansiation Test
beforeEach(async () => 
{
    function loginUser() {
        ""
    };

    const utils = render(<UserContext.Provider value={user}><LoginUserContext.Provider value={loginUser}><Router>
        <ProfileEdit/>
        </Router></LoginUserContext.Provider></UserContext.Provider>);
    container = utils.container;
});

afterEach(async () =>
{
    await  updateUser(user.user_id, user.email, user.first_name, user.last_name);
});


// Basic Render Tests. (Ensures the page actually loads)
test("Render Profile Edit", () => {
    expect(container).toBeInTheDocument();
});

// Next three tests ensures that Page Loads with Expected information to ensure tests which assess changes are accurate.
test("Content In Email Field Correct", () => {

    const email = screen.getByTestId("Email-Edit");
    expect(email.value).toBe(user.email);
})

test("Content In Firstname Field Correct", () => {
    const first_name = screen.getByTestId("First-Name-Edit");
    expect(first_name.value).toBe(user.first_name);
});

test("Content In Lastname Field Correct", () => {
    const last_name = screen.getByTestId("Last-Name-Edit");
    expect(last_name.value).toBe(user.last_name);
});


// test("Test Email Change", async () => {
//     const email = screen.getByTestId("Email-Edit");
//     const email_value = email.value;
//     const initial_email = user.email;
//     const value_to_change = "rue@hotmail.com"
//     let changed_user;
//     fireEvent.change(email, {target: {value: value_to_change}});
//     const submit = screen.getByTestId("submit");
//     fireEvent.click(submit);
//     let popup;
//     let profile;
//     await waitFor(async () => { popup = await screen.findByTestId("confirm-popup")});
//     fireEvent.click(popup);
//     // edit = await screen.findByTestId("profile-edit-error");
//     console.log("Edit: ", edit);
//     await waitFor(async () => {changed_user = await getUserById(user.user_id)}); 
//     // expect(email).toNotBeInTheDocument();
 
// });


// Checks to ensure a duplicate Email can not be entered this is significant as it ensures that for Signin that duplicate emails can not be entred into the system.
test("Test Email Change", async () => {
    const email = screen.getByTestId("Email-Edit");
    const email_value = email.value;
    const initial_email = user.email;
    let value_to_change 
    await waitFor(async () => {value_to_change = await getUserById(2)});
    value_to_change = value_to_change.email;
    let changed_user;
    fireEvent.change(email, {target: {value: value_to_change}});
    const submit = screen.getByTestId("submit");
    fireEvent.click(submit);
    let popup;
    let edit;
    await waitFor(async () => { popup = await screen.findByTestId("confirm-popup")});
    fireEvent.click(popup);
    await waitFor(async () => { edit = await screen.findByTestId("profile-edit-error")});
    expect(edit).toBeInTheDocument();
 
});



