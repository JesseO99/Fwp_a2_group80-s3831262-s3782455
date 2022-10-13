import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signin from "./Signin";
import OneTimeCodeAuthentification from "../components/OneTimeCodeAuthentification"
import {BrowserRouter as Router} from 'react-router-dom';
import userEvent from "@testing-library/user-event";


// Global data for all tests
let container;

// Instansiation Test
beforeEach(() => 
{
    const utils = render(<Router><Signin/></Router>);
    container = utils.container;
});

// Basic Render Test. (Ensures the page actually loads)
test("Render Signin", () => {
    expect(container).toBeInTheDocument();
});


// The next two tests are significant to ensure that error handling is taking place for the log in feature.
// Test to see if Error Popup occurs when password is entered incorrectly
test("Password Incorrect", async  () => {
    // render(<OneTimeCodeAuthentification/>)
    const email = screen.getByLabelText("Email Address");
    fireEvent.change(email, {target: {value: "rue@gmail.com"}});
    
    const password = screen.getByLabelText("Password");
    fireEvent.change(password, {target: {value: "def123"}});

    const submit = screen.getByTestId("submit");
    userEvent.click(submit);

    await waitFor(async () => {expect(await screen.findByTestId("error-message-signin")).toBeInTheDocument()});
});


// Test to see if Email Pop occurs when email is entered incorrectly
test("Email Incorrect", async  () => {
    // render(<OneTimeCodeAuthentification/>)
    const email = screen.getByLabelText("Email Address");
    fireEvent.change(email, {target: {value: "rue@hotmail.com"}});
    
    const password = screen.getByLabelText("Password");
    fireEvent.change(password, {target: {value: "abc123"}});

    const submit = screen.getByTestId("submit");
    userEvent.click(submit);

    await waitFor(async () => {expect(await screen.findByTestId("error-message-signin")).toBeInTheDocument()});
});


/* 
This next test is significant to ensure that when the correct details are provided the app can 
successfully search the Databse and proceed to the next stage of the Signin process... achieving MFA
*/
// Test to see if MFA window pops up if both Email and Password are entered correctly
test("Email and Password Matches", async  () => {
    // render(<OneTimeCodeAuthentification/>)
    const email = screen.getByLabelText("Email Address");
    fireEvent.change(email, {target: {value: "rue@gmail.com"}});
    
    const password = screen.getByLabelText("Password");
    fireEvent.change(password, {target: {value: "abc123"}});

    const submit = screen.getByTestId("submit");
    fireEvent.click(submit);
    await waitFor(async () => { expect(await screen.findByText("Email Verfication")).toBeInTheDocument()});
});