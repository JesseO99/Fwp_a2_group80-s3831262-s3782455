import axios from "axios";
import {API_HOST,USER_KEY,USERS_KEY,POSTS_KEY,AUTH_DATA_KEY}from "../data/Constant";

const USER_ID_KEY = "user_id";

// Initialises user data, if no user data create user data
function initUsers() {
    if (localStorage.getItem(USERS_KEY) !== null) return;

    const users = [
        {
            firstName: "Rue",
            lastName: "Minmi",
            date_joined: "11/08/2022",
            dob: "1999-08-06",
            email: "rue@gmail.com",
            password: "abc123",
            img: "https://img.icons8.com/ios-filled/100/000000/gender-neutral-user.png"
        },
        {
            firstName: "Darren",
            lastName: "Eshay",
            date_joined: "11/08/2022",
            dob: "2001-08-12",
            email: "darren@hotmail.com",
            password: "def456",
            img: ''
        }
    ];

    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}


// Returns a list of users stored in server DBMS
async function getUsers() {
    const response = await axios.get(API_HOST + "/users/");
    return response.data.data;
}

async function getUsersFollowing(user_id) {
    console.log("Request: Get Users Following");
    const response = await axios.get(API_HOST + "/users/following", user_id);
    console.log("Response: ", response);
    return response.data;
}

//Register user API call
async function registerUser(user) {
    const response = await axios.post(API_HOST + "/users", user);
    return response.data;
}

//Create post API call
async function createPost(post) {
    return await axios.post(API_HOST + "/posts", post).then(res =>{
        return res.data;
     })

}
//Get all posts API call
async function getPosts(){
    return await axios.get(API_HOST + "/posts").then(res =>{
        return res.data;
    })
}

//Delete post by post_id API call
async function deletePostById(id){
    return await axios.get(API_HOST + "/posts/delete",{params: {id}}).then(res =>{
        return res.data;
    })
}

//Add comment API call
async function addNewComment(comment) {
    return await axios.post(API_HOST + "/posts/comment", comment).then(res =>{
        return res.data;
    })

}

//Add sub comment API call
async function addNewSubComment(comment) {
    return await axios.post(API_HOST + "/posts/sub_comment", comment).then(res =>{
        return res.data;
    })

}

// Verifies User's email address and password matches what is stored in local storage
async function verifyUser(email, password) {
    console.log(API_HOST + "/users/login", email, " ", password);

    const response = await axios.get(API_HOST + "/users/login", {params: {email, password}})
    const user = response.data;

    if(user !== null)
    {
        return true;
    }

    return false;
}

// Sets the logged in user by saving the user's email in local storage
function setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Sets the logged in user by saving the user's id in local storage
function setUserId(user) {
    localStorage.setItem(USER_KEY, user);
}

// Snends a get request to middle-end returning the user from the DBMS
async function getUserByEmail(email) {
    const response = await axios.get(API_HOST + "/users/user_email", {params: {email}});
    const user = response.data
    return user;
}


// Gets the logged in user by accessing the data in local storage
function getUser() {

    const user = JSON.parse(localStorage.getItem(USER_KEY));
    return user;
}


async function getUserById(user_id)
{
    const response = await axios.get(API_HOST + "/users/user", {params: {user_id}});
    const user = response.data
    return user;
}

// returns if the user is logged in.
function isLoggedIn() {
    if (localStorage.getItem(USER_ID_KEY) !== null) {
        return true;
    } else {
        return false;
    }
}


// Removes the user from local storage essenitally logging them out of the system
function removeUser() {
    localStorage.removeItem(USER_ID_KEY);
}

// Using the provided email it returns the users deails.

async function getUserDetails(email)
{
    const response = await axios.get(API_HOST + `/users/search/${email}`);
    console.dir(response.data);
    //Returns as an array
    return response.data;

}
/**
 * 
 * @Deprecated This is for local storage implementation use getUserByEmail(email) instead
 */
// function getUserDetails(email) {
//     const users = getUsers();
//     for (const user of users) {
//         if (user.email === email) {
//             return user;
//         }
//     }
// }

// Updates the users details
async function updateUser(user_id, email, first_name, last_name) {
    
    const response = await axios.put(API_HOST + "/users/user/update", {params: {user_id, email, first_name, last_name}});

    if( response.data.status === "100")
    {
        return true;
    }
    else
    {
        return false;
    }
}


//get Posts from local storage
function getPostDetails() {
    const posts = JSON.parse(localStorage.getItem(POSTS_KEY));
    return posts;
}

//save posts to local storage
function setPostDetails(posts) {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

//Get name from given email
async function getNameByEmail(email) {
    const users = await getUsers();
    for (const user of users) {
        if (user.email === email) {
            return user.firstName + " " + user.lastName;
        }
    }
}


// Deletes the user from local storage
async function deleteUser(user_id) {
    
    const response1 = await axios.delete(API_HOST + "/posts/user_id", {params: {user_id}});
    const response3 = await axios.delete(API_HOST + "/users/user", {params: {user_id}});

    console.log(response1, response3);
    return {};
}




function setAuthentificationRequestData(email) {
    const code = parseInt(Math.random() * 899999) + 100000;
    const object = {to_email: email, code: code};

    localStorage.setItem(AUTH_DATA_KEY, JSON.stringify(object));
    return object;
}

function getAuthentificationRequestData() {
    return JSON.parse(localStorage.getItem(AUTH_DATA_KEY))
}

function removeAuthentificationRequestData() {
    localStorage.removeItem(AUTH_DATA_KEY);
}

// List of functions which can be imported and used in other pages.
export {
    initUsers,
    setUser,
    verifyUser,
    getUser,
    isLoggedIn,
    removeUser,
    getUserDetails,
    registerUser,
    updateUser,
    getPostDetails,
    setPostDetails,
    getNameByEmail,
    deleteUser,
    setAuthentificationRequestData,
    getAuthentificationRequestData,
    removeAuthentificationRequestData,
    setUserId,
    getUserByEmail,
    getUserById,
    createPost,
    getPosts,
    deletePostById,
    addNewComment,
    addNewSubComment,
    getUsers,
    getUsersFollowing
}