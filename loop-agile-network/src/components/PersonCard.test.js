import { render, screen, fireEvent, waitFor, findByText } from "@testing-library/react";
import PersonCard from "./PersonCard";
import {BrowserRouter as Router} from 'react-router-dom';
import {getUserById, updateUser} from "../data/repository"
import { UserContext} from "../App";


// Global data for all tests
let container;
let user;
let other_user;
let buttonClicked;

const mockFunction = jest.fn();
function followButtonClicked()
{
    buttonClicked = true;
}

// Instansiation once for all tests in Profile Edit
beforeAll(async () => {
    user = await getUserById(1);

});


// Instansiation Test
beforeEach(async () => 
{

    other_user = 
        {
            first_name: "Darren",
            last_name: "Eashay",
            email: "darren@gmail.com",
            user_id: 3,
            date_joined: "2022-10-13",
            following: 0
        } 

    const utils = render(<UserContext.Provider value={user}><Router>
        <PersonCard user={other_user} followButtonClicked={mockFunction}/>
        </Router></UserContext.Provider>);
    container = utils.container;
});


test("Basic Instansiation", ()=>{
    expect(container).toBeInTheDocument();

});


test ("Follow Button Exsits", async () => {
    const unfollow = screen.getByTestId("follow-button");
    expect(unfollow).toBeInTheDocument();
});


// test("Test Follow Click", async () => {
//     buttonClicked = false;
//     const follow = screen.getByTestId("follow-button");
//     fireEvent.click(follow);

//     // await waitFor(async () => { });   
//     expect( await screen.findByTestId("unfollow-button")).toBeInTheDocument()
// })