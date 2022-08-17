import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import {useEffect, useState} from "react";
import Footer from "./components/Footer";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import CreatePost from './pages/CreatePost';
import {getUser, removeUser} from "./data/repository";
import usePost from "./hooks/usePost";


function App() {
    const [username, setUsername] = useState(getUser);
    //Call usePost custom hook
    const {
        addPost,
        removePost,
        posts
    } = usePost();


    const loginUser = (username) => {
        setUsername(username);
    }

    const logoutUser = () => {
        removeUser();
        setUsername(null);
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Header username={username} logoutUser={logoutUser}/>
                <Navbar username={username} logoutUser={logoutUser}/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/Signin" element={<Signin loginUser={loginUser}/>}/>
                    <Route path="/Profile" element={<Profile username={username}/>}/>
                    <Route path="/Signup" element={<Signup loginUser={loginUser}/>}/>
                    <Route path="/Feed"
                           element={<Feed username={username} posts={posts} removePost={removePost}/>}></Route>
                    <Route path="/CreatePost" element={<CreatePost username={username} addPost={addPost}/>}></Route>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
