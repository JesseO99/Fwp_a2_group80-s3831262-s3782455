import axios from "axios";
import {API_HOST, USER_KEY, USERS_KEY, POSTS_KEY, AUTH_DATA_KEY} from "../data/Constant";

const USER_ID_KEY = "user_id";

// Initialises user data, if no user data create user data
function initUsers() {
    if (localStorage.getItem(USERS_KEY) !== null) return;

    const users = [{
        firstName: "Rue",
        lastName: "Minmi",
        date_joined: "11/08/2022",
        dob: "1999-08-06",
        email: "rue@gmail.com",
        password: "abc123",
        img: "https://img.icons8.com/ios-filled/100/000000/gender-neutral-user.png"
    }, {
        firstName: "Darren",
        lastName: "Eshay",
        date_joined: "11/08/2022",
        dob: "2001-08-12",
        email: "darren@hotmail.com",
        password: "def456",
        img: ''
    }];

    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}


// Returns a list of users stored in server DBMS
async function getUsers() {
    const response = await axios.get(API_HOST + "/users/");
    return response.data.data;
}

async function getUsersFollowing(user_id) {
    console.log("Request: Get Users Following");
    const response = await axios.get(API_HOST + "/users/following", {params: {user_id}});
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
    return await axios.post(API_HOST + "/posts", post).then(res => {
        return res.data;
    })

}

//Get all posts API call
async function getPosts(id) {
    return await axios.get(API_HOST + "/posts", {params: {id}}).then(res => {
        return res.data;
    })
}

//Delete post by post_id API call
async function deletePostById(id) {
    return await axios.get(API_HOST + "/posts/delete", {params: {id}}).then(res => {
        return res.data;
    })
}

//Add comment API call
async function addNewComment(comment) {
    return await axios.post(API_HOST + "/posts/comment", comment).then(res => {
        return res.data;
    })

}

//Add sub comment API call
async function addNewSubComment(comment) {
    return await axios.post(API_HOST + "/posts/sub_comment", comment).then(res => {
        return res.data;
    })

}


//Add Reaction API call
async function addReaction(reaction) {
    return await axios.post(API_HOST + "/posts/reaction", reaction).then(res => {
        return res.data;
    })

}


// Verifies User's email address and password matches from the API
async function verifyUser(email, password) {
    console.log(API_HOST + "/users/login", email, " ", password);
    const response = await axios.get(API_HOST + "/users/login", {params: {email, password}})
    const user = response.data;
    if (user !== null) {
        return true;
    }

    return false;
}

async function getAllFollowingUsers(user_id) {
    let users = await axios.get(API_HOST + "/follows/user/all", {params: {user_id}})
    console.log("Repository: ", users.data.data);
    return users.data.data;
}

// Sets the logged in user by saving the user's email in local storage
function setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Sends a get request to middle-end returning the user from the DBMS
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


async function getUserById(user_id) {
    const response = await axios.get(API_HOST + "/users/user", {params: {user_id}});
    const user = response.data
    return user;
}


// Removes the user from local storage essentially logging them out of the system
function removeUser() {
    localStorage.removeItem(USER_KEY);
}

// Using the provided email it returns the users deails.

async function getUserDetails(email) {
    const response = await axios.get(API_HOST + `/users/search/${email}`);
    console.log("repository ", response.data);
    //Returns as an array
    return response.data;
}


// Updates the users details
async function updateUser(user_id, email, first_name, last_name) {

    const response = await axios.put(API_HOST + "/users/user/update", {
        params: {
            user_id, email, first_name, last_name
        }
    });

    if (response.data.status === "100") {
        return true;
    } else {
        return false;
    }
}

async function check_following(user_id, profile_id) {
    const response = await axios.get(API_HOST + "/follows/check", {params: {user_id, profile_id}});
    return response.data;
}

// Returns the posts made by the provided user_id
async function getUserPosts(userId, loggedId) {
    const posts = await axios.get(API_HOST + "/posts/user_posts/", {params: {loggedId, userId}});
    console.log("Repository: Posts: ", posts.data.data);
    return posts.data.data
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


async function followUser(follower_id, followed_id) {
    const response = await axios.put(API_HOST + '/follows/follow', {params: {follower_id, followed_id}})
}

async function unfollowUser(follower_id, followed_id) {
    const response = await axios.delete(API_HOST + '/follows/unfollow', {params: {follower_id, followed_id}})
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
    removeUser,
    getUserDetails,
    registerUser,
    updateUser,
    getPostDetails,
    setPostDetails,
    deleteUser,
    setAuthentificationRequestData,
    getAuthentificationRequestData,
    removeAuthentificationRequestData,
    getUserByEmail,
    getUserById,
    createPost,
    getPosts,
    deletePostById,
    addNewComment,
    addNewSubComment,
    addReaction,
    getUsers,
    getUsersFollowing,
    followUser,
    unfollowUser,
    getAllFollowingUsers,
    getUserPosts,
    check_following
}