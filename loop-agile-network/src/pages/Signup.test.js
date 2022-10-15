import {render, screen, fireEvent, waitFor, queryByText} from "@testing-library/react";
import Signup from "./Signup.js";
import {BrowserRouter as Router} from 'react-router-dom';
import userEvent from "@testing-library/user-event";

// Global data for all tests
let container;

// Instantiation Test
beforeEach(() =>
{
    const utils = render(<Router><Signup/></Router>);
    container = utils.container;
});

// Basic Render Test for Signup. (Ensures the page actually loads)
test("Render Signup", () => {
    expect(container).toBeInTheDocument();
});


//Signup in feature.
// Test the validation when password is entered mismatched
test("Password Mismatch", async  () => {
    const password = screen.getByLabelText("Password");
    fireEvent.change(password, {target: {value: "qwerty123"}});

    const retypePassword = screen.getByLabelText("Retype Password");
    fireEvent.change(retypePassword, {target: {value: "qwertyuiop"}});

    const submit = screen.getByTestId("submit");
    userEvent.click(submit);

    await waitFor(async () => {expect(await screen.findByText("Password you entered does not match")).toBeInTheDocument()});
});



// Test the validation email format
test("Email Format", async  () => {
    const password = screen.getByLabelText("Password");
    fireEvent.change(password, {target: {value: "qwerty123"}});

    const retypePassword = screen.getByLabelText("Retype Password");
    fireEvent.change(retypePassword, {target: {value: "qwerty123"}});

    const firstName = screen.getByLabelText("First Name");
    fireEvent.change(firstName, {target: {value: "Jane"}});

    const lastName = screen.getByLabelText("Last Name");
    fireEvent.change(lastName, {target: {value: "Peterson"}});

    const email = screen.getByLabelText("Email");
    fireEvent.change(email, {target: {value: "JanePeterson"}});

    const submit = screen.getByTestId("submit");
    userEvent.click(submit);

    await waitFor(async () => {expect(await screen.getByTestId("email_error")).toBeInTheDocument()});
});


// Test the happy path of Signup
test("Email Format", async  () => {
    const password = screen.getByLabelText("Password");
    fireEvent.change(password, {target: {value: "qwerty123"}});

    const retypePassword = screen.getByLabelText("Retype Password");
    fireEvent.change(retypePassword, {target: {value: "qwerty123"}});

    const firstName = screen.getByLabelText("First Name");
    fireEvent.change(firstName, {target: {value: "Jane"}});

    const lastName = screen.getByLabelText("Last Name");
    fireEvent.change(lastName, {target: {value: "Peterson"}});

    const email = screen.getByLabelText("Email");
    fireEvent.change(email, {target: {value: "JanePeterson@gmail.com"}});

    const submit = screen.getByTestId("submit");
    userEvent.click(submit);

    await waitFor(() => {
        expect(queryByText('Jane')).not.toBeInTheDocument()
        expect(queryByText('Peterson')).not.toBeInTheDocument()
        expect(queryByText('JanePeterson@gmail.com')).not.toBeInTheDocument()
    })
});

