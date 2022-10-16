import { render, screen, fireEvent, waitFor, findByText, getByTestId } from "@testing-library/react";
import Profile from "./Profile";
import {BrowserRouter as Router} from 'react-router-dom';
import {getUserById, updateUser} from "../data/repository"
import { UserContext, Login, ClearPostsContext } from "../App";

// Global data for all tests
let container;
let user;
let clearPosts;

// Instansiation once for all tests in Profile Edit
beforeAll(async () => {
    user = await getUserById(1);
});

// Instansiation Test
beforeEach(async () => 
{
    function dummy(){};

    const utils = render(<UserContext.Provider value={user}><ClearPostsContext.Provider value={dummy}><Router>
        <Profile  
        // logoutUser={logoutUser} 
        // removeUserPosts={removeUserPosts} 
        clearPosts={dummy}
        getAllPosts={dummy} 
        posts={[]}
        // removePost={removePost} addComment={addComment}
        // addSubComment={addSubComment} 
        userId={user?user.user_id:undefined}/>
        </Router></ClearPostsContext.Provider></UserContext.Provider>
        );
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