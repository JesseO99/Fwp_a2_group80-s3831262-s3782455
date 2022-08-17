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

function App() {
    const [username, setUsername] = useState(getUser);
    const [posts, setPosts] = useState([]);

    //Adds new post to the list
    const addPost = (post) => {
        setPosts([...posts, post]);
    };

    //Remove selected post from the list
    const removePost = (postToBeDeleted) => {
        setPosts(posts.filter((post) => postToBeDeleted !== post));
    };

    //Get saved old posts from initial render
    useEffect(() => {
        const posts = JSON.parse(localStorage.getItem('posts'));
        console.log("read first time "+posts)
        if (posts) {
            console.log("setItems "+posts)
            setPosts(posts);
        }
    }, []);

    //Save posts in the local storage
    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
        console.log("write into "+posts)

    }, [posts]);

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
                    <Route path="/Feed" element={<Feed username={username} posts={posts} removePost={removePost}/>}></Route>
                    <Route path="/CreatePost" element={<CreatePost username={username} addPost={addPost} />}></Route>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
