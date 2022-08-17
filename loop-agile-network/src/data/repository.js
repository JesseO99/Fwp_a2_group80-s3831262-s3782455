import {getDateToday} from "../util/Util";

const USERS_KEY = "users";
const USER_KEY = "email";

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
          password: "def456"
        }
      ];

    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Returns a list of users stored in local storage
function getUsers() {
    const data = localStorage.getItem(USERS_KEY);
    return JSON.parse(data);
}

//Register new user into the system
function registerUser(newUser) {
    const currentUsers = getUsers();
    //Create new user
    const user = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        dob: newUser.dob,
        password: newUser.password,
        date_joined: getDateToday()
    }
    //Add new user to the current list
    if (currentUsers !== null) {
        currentUsers.push(user);
        localStorage.setItem(USERS_KEY, JSON.stringify(currentUsers));
    } else {
        let users = [user];
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
    //Login with registered new user
    setUser(user.email);
}

// Verifies User's email address and password matches what is stored in loal storage
function verifyUser(email, password) {
    const users = getUsers();
    for (const user of users) {
        if (email === user.email && password === user.password) {
            setUser(email);
            return true;
        }
    }

    return false;
}

// Sets the logged in user by saving the user's email in local storage
function setUser(email) {
    localStorage.setItem(USER_KEY, email);
}

// Gets the logged in user by accessing the data in local storage
function getUser() {
    const user = localStorage.getItem(USER_KEY);
    console.log("User: ", user);
    return user;
}

// returns if the user is logged in.
function isLoggedIn() {
    if (localStorage.getItem(USER_KEY) !== null) {
        return true;
    } else {
        return false;
    }
}

// Removes the user from local storage essenitally logging them out of the system
function removeUser() {
    localStorage.removeItem(USER_KEY);
}

// Using the provided email it returns the users deails.

function getUserDetails(email) {
    const users = getUsers();
    for (const user of users) {
        if (user.email === email) {
            console.log("emial: ", email, "\nuser: ", user);
            return user; 
        }
    }
}

// List of functions which can be imported and used in other pages.
export {
    initUsers,
    verifyUser,
    getUser,
    isLoggedIn,
    removeUser,
    getUserDetails,
    registerUser
}