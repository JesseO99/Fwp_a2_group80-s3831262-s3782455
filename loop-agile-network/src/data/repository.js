const USERS_KEY = "users";
const USER_KEY = "email";

// Initialises user data, if no user data create user data
function initUsers() {
    if(localStorage.getItem(USERS_KEY) !== null)
        return;

    const users = [
        {
          name: "Rue Minmi",
          date_joined: "11-08-2022",
          age: 33,
          email: "user@gmail.com",
          password: "abc123"
        },
        {
          name: "Darren Eshay",
          date_joined: "11-08-2022",
          age: 23,
          email: "user@hotmail.com",
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

// Verifies User's email address and password matches what is stored in loal storage
function verifyUser(email, password) {
    const users = getUsers();
    for(const user of users) {
      if(email === user.email && password === user.password)
      {
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
    return localStorage.getItem(USER_KEY);
}

// returns if the user is logged in.
function isLoggedIn() {
    if(localStorage.getItem(USER_KEY) !== null)
    {
      return true;
    }
    else
    {
      return false;
    }
}

// Removes the user from local storage essenitally logging them out of the system
function removeUser(){
  localStorage.removeItem(USER_KEY);
}

// Using the provided email it returns the users deails.
function getUserDetails(email){
  const users = getUsers();
  for (const user of users)
  { 
    if (user.username === email)
    {
      return user;
    }
  }

  return null;
}

// List of functions which can be imported and used in other pages.
export {
    initUsers,
    verifyUser,
    getUser,
    isLoggedIn,
    removeUser,
    getUserDetails
}