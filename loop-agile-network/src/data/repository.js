import {getDateToday} from "../util/Util";

const USERS_KEY = "users";
const USER_KEY = "email";
const POSTS_KEY = "posts";

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

function initPosts() {
    if (localStorage.getItem(POSTS_KEY !== null)) return;
    
    const posts = [
            {
                email:"darren@hotmail.com",
                post:"A Darren Post\n",
                img:"",
                comments:[]
            },
            {
                email:"darren@hotmail.com",
                post:"A Darren Third Post",
                img:"","comments":[
                    {
                        user:"darren@hotmail.com",
                        text:"A comment","subComments":[]
                    }
                ]
            },
            {
                email:"darren@hotmail.com",
                post:"A Darren second Post",
                img:"",
                comments:[
                    {
                        user:"darren@hotmail.com",
                        text:"A Comment",
                        subComments:[]
                    }
                ]
            },
            {
                email:"rue@gmail.com",
                post:"A Third Post",
                img:"",
                comments:
                [
                    {
                        user:"darren@hotmail.com",
                        text:"A Comment",
                        subComments:[]
                    }
                ]
            },
            {
                email:"rue@gmail.com",
                post:"A Second Post",
                img:"",
                comments:[
                    {
                        user:"rue@gmail.com",
                        text:"A Self second comment",
                        subComments:[]
                    },
                    {
                        user:"darren@hotmail.com",
                        text:"A Comment",
                        subComments:[]
                    },
                    {
                        user:"rue@gmail.com",
                        text:"Another Comment",
                        subComments:[
                            {
                                user:"rue@gmail.com",
                                text:"A sub comment"
                            },
                            {
                                user:"darren@hotmail.com",
                                text:"A Darren Sub Comment"
                            }
                        ]
                    }
                ]
            },
            {
                email:"rue@gmail.com",
                post:"A Post",
                img:"",
                comments:[
                {
                    user:"darren@hotmail.com",text:"A Comment","subComments":[]
                },
                {
                    user:"rue@gmail.com",
                    text:"A self comment",
                    subComments:[
                        {
                            user:"darren@hotmail.com",
                            text:"A Darren Sub Comment"
                        }
                    ]
                }
            ]
        }
    ]
    
    return posts
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
        date_joined: getDateToday(),
        img: ''
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
            return user; 
        }
    }
}

// Updates the users details
function updateUser(previousEmail, email, firstName, lastName, src) {
    const users = getUsers();
    for (const user of users)
    {
        if (user.email === previousEmail)
        {
            user.firstName = firstName;
            user.lastName = lastName;
            user.email = email;
            user.img = src;
            setUser(email);
        }
    }

    localStorage.setItem(USERS_KEY, JSON.stringify(users));
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
function getNameByEmail(email) {
    const users = getUsers();
    for (const user of users) {
        if (user.email === email) {
            return user.firstName + " " + user.lastName;
        }
    }
} 

// Function for deleting all posts and comments from the user's supplied email
// Function currently not in use but could be used in future
 // eslint-disable-next-line
function deletePostsfromUser(email) {
    const posts = getPostDetails();
    const newPosts = [];
    let count = 0;

    // Remove Posts with Email
    for (const post of posts)
    {   
        
        if (post.email !== email)
        {
            
            let commentCount = 0;
            const newpost =
            {
                email: post.email,
                post: post.post,
                img: post.img,
                comments: []
            }
            // Remove Comments with user
            for (const comment of post.comments)
            {
                if (comment.user !== email )
                {
                    const newComment = {
                        user: comment.user,
                        text: comment.text,
                        subComments: []
                    }
                    let subCommentCount = 0;

                    // Remove Subcomments with user
                    for (const subComment of comment.subComments)
                    {

                        if (subComment.user !== email)
                        {
                            newComment.subComments[subCommentCount] = subComment;
                            subCommentCount += 1;
                        }
                    }
                    newpost.comments[commentCount] = newComment;
                    commentCount +=1;
                }
            }

            newPosts[count] = newpost;
            count +=1;
        }
    }

    localStorage.setItem(POSTS_KEY, JSON.stringify(newPosts));
}


// Deletes the user from local storage
function deleteUser(email) {
    localStorage.removeItem(USER_KEY);
    const users = getUsers();
    const newUsers = [];
    let count = 0;
    for (const user of users)
    {
        if (user.email !== email)
        {
            newUsers[count] = user;
            count += 1;
        }
    }

    localStorage.setItem(USERS_KEY, JSON.stringify(newUsers));

}


// List of functions which can be imported and used in other pages.
export {
    initUsers,
    verifyUser,
    getUser,
    isLoggedIn,
    removeUser,
    getUserDetails,
    registerUser,
    updateUser,
    initPosts,
    getPostDetails,
    setPostDetails,
    getNameByEmail,
    deleteUser

}