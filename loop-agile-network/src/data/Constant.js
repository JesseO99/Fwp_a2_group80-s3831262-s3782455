const API_HOST = "http://localhost:4000/api";
const USERS_KEY = "users";
const USER_KEY = "user";
const POSTS_KEY = "posts";
const AUTH_DATA_KEY = 'MFA';
const Interaction = {
    POST: "p",
    COMMENT: "c",
    SUB_COMMENT: "sc"
}

const Result = {
    SUCCESS: "100",
    FAILED: "200"
}



export {
    API_HOST,
    USER_KEY,
    USERS_KEY,
    POSTS_KEY,
    AUTH_DATA_KEY,
    Interaction,
    Result
}