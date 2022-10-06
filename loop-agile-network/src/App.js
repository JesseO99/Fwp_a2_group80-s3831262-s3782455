import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import React, {createContext, useState} from "react";
import Footer from "./components/Footer";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import CreatePost from './pages/CreatePost';
import People from './pages/People';
import Following from './pages/Following';
import {getUser, removeUser} from "./data/repository";
import ProfileEdit from './pages/ProfileEdit';
import usePost from "./hooks/usePost";
import useUsers from "./hooks/useUsers";
import {ToastContainer} from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import useToast from "./hooks/useToast";

//Create and pass contexts for multiple usage instances
export const UserContext = createContext();
export const LoginUserContext = createContext();
export const ToastContext = createContext();


function App() {
    const [user, setUser] = useState(getUser); //We save current user locally instead of username now to avoid


    //Call useToast custom hook
    const {
        toast,
        show,
        setShow,
        toastMessage
    } = useToast();

    //Call usePost custom hook
    const {
        addPost,
        removePost,
        posts,
        addComment,
        addSubComment,
        removeUserPosts,
        getAllPosts
    } = usePost();

    const {
        users, 
        getAllUsers
    } = useUsers();

    const loginUser = (user) => {
        setUser(user);
    }

    const logoutUser = () => {
        removeUser();
        setUser(null);
    }

    
    return (
        <UserContext.Provider value={user}>
            <ToastContext.Provider value={toastMessage}>
                <LoginUserContext.Provider value={loginUser}>
                    <div className="App">
                        <BrowserRouter>
                            <Header logoutUser={logoutUser}/>
                            <Navbar logoutUser={logoutUser}/>
                            <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/Signin" element={<Signin/>}/>
                                <Route path="/Profile"
                                       element={<Profile logoutUser={logoutUser} removeUserPosts={removeUserPosts}/>}/>
                                <Route path="/Signup" element={<Signup/>}/>
                                <Route path="Profile-Edit"
                                       element={<ProfileEdit/>}></Route>
                                <Route path="/Feed"
                                       element={<Feed posts={posts} removePost={removePost} addComment={addComment}
                                                      addSubComment={addSubComment}
                                                      getAllPosts={getAllPosts}/>}></Route>
                                <Route path="/CreatePost" element={<CreatePost addPost={addPost}/>}></Route>
                                <Route path="/People" element={<People users={users} getAllUsers={getAllUsers}/>}/>
                                <Route path="/Following" element={<Following/>}/>
                            </Routes>
                            {/*Toast Message for Success/Error Post Creation*/}
                            <ToastContainer className="p-3" position="top-end">
                                <Toast onClose={() =>
                                    setShow(false)}
                                       show={show}
                                       delay={6000}
                                       autohide>
                                    <Toast.Header>
                                        <img
                                            src={toast.img}
                                            className="rounded me-2"
                                            alt=""
                                            style={{height: "20px"}}
                                        />
                                        <strong className="me-auto">{toast.title}</strong>
                                        <small>0 mins ago</small>
                                    </Toast.Header>
                                    <Toast.Body>{toast.message}</Toast.Body>
                                </Toast>
                            </ToastContainer>
                            <Footer/>
                        </BrowserRouter>
                    </div>
                </LoginUserContext.Provider>
            </ToastContext.Provider>
        </UserContext.Provider>
    );
}

export default App;
