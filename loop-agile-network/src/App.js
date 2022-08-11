import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Home from "./pages/Home";
import {useState} from "react";
import Footer from "./components/Footer";
import Signin from "./pages/Signin";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import CreatePost from './pages/CreatePost';
import {getUser, removeUser} from "./data/repository";

function App() {
    const [username, setUsername] = useState(getUser);

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
                    <Route path="/Profile" element={<Profile/>}/>
                    <Route path="/Feed" element={<Feed/>}></Route>
                    <Route path="/CreatePost" element={<CreatePost/>}></Route>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
