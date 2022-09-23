import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import {createContext, useState} from "react";
import Footer from "./components/Footer";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import CreatePost from './pages/CreatePost';
import {getUser, removeUser} from "./data/repository";
import ProfileEdit from './pages/ProfileEdit';
import usePost from "./hooks/usePost";

//Create and pass contexts for multiple usage instances
export const UsernameContext = createContext();
export const LoginUserContext = createContext();

function App() {
    const [username, setUser] = useState(getUser);
    //Call usePost custom hook
    const {
        addPost,
        removePost,
        posts,
        addComment,
        addSubComment,
        removeUserPosts,
        updateAllUserEntryEmails
    } = usePost();


    const loginUser = (user) => {
        setUser(user);
    }

    const logoutUser = () => {
        removeUser();
        setUser(null);
    }


    return (
        <UsernameContext.Provider value={username}>
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
                                   element={<ProfileEdit updateAllUserEntryEmails={updateAllUserEntryEmails}/>}></Route>
                            <Route path="/Feed"
                                   element={<Feed posts={posts} removePost={removePost} addComment={addComment}
                                                  addSubComment={addSubComment}/>}></Route>
                            <Route path="/CreatePost" element={<CreatePost addPost={addPost}/>}></Route>
                        </Routes>
                        <Footer/>
                    </BrowserRouter>
                </div>
            </LoginUserContext.Provider>
        </UsernameContext.Provider>
    );
}

export default App;
