import { render, screen, fireEvent, waitFor, findByText, getByTestId } from "@testing-library/react";
import Profile from "./Profile";
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

    const utils = render(<UserContext.Provider value={user}><Router>
        <Profile/>
        </Router></UserContext.Provider>);
    container = utils.container;
});


// Basic Render Test. (Ensures the page actually loads)
test("Render Profile", () => {
    expect(container).toBeInTheDocument();
});


test("Render Profile 2", async () => {
    const h5 = await screen.findByTestId("about");
    expect(h5).toBeInTheDocument();
});