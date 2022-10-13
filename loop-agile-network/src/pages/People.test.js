import { render, screen, fireEvent, waitFor, findByText } from "@testing-library/react";
import People from "./People";
import {BrowserRouter as Router} from 'react-router-dom';
import {getUserById, updateUser} from "../data/repository"
import { UserContext} from "../App";
import {useState} from "react";
import useUsers from "../hooks/useUsers"

// Global data for all tests
let container;
let user;

const mockGetAllUsersFunction = jest.fn();

jest.mock('../hooks/useUsers', () => {
    return jest.fn(() => ({
       getAllUsers: mockGetAllUsersFunction
    }))
})

// Instansiation once for all tests in Profile Edit
beforeAll(async () => {
    user = await getUserById(1);

});


// Instansiation Test
beforeEach(async () => 
{

    let users = [
        {
            first_name: "Kemila",
            last_name: "Illankoon",
            email: "kat.kemi@gmail.com",
            user_id: 2,
            date_joined: "2022-10-13",
            following: 1
        },
        {
            first_name: "Darren",
            last_name: "Eashay",
            email: "darren@gmail.com",
            user_id: 3,
            date_joined: "2022-10-13",
            following: 0
        }
    ];

    

    const utils = render(<UserContext.Provider value={user}><Router>
        <People users={users} getAllUsers={mockGetAllUsersFunction}/>
        </Router></UserContext.Provider>);
    container = utils.container;
});


test("Basic Instansiation", ()=>{
    expect(container).toBeInTheDocument();

})