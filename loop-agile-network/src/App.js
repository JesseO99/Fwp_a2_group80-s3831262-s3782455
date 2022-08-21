import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import {useState} from "react";
import Footer from "./components/Footer";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Feed from "./pages/Feed";
import CreatePost from './pages/CreatePost';
import {getUser, removeUser} from "./data/repository";
import ProfileEdit from './pages/ProfileEdit';

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
                    <Route path="/Profile" element={<Profile username={username}/>}/>
                    <Route path="/Signup" element={<Signup loginUser={loginUser}/>}/>
                    <Route path="/Feed" element={<Feed username={username}/>}></Route>
                    <Route path="/CreatePost" element={<CreatePost username={username}/>}></Route>
                    <Route path="Profile-Edit" element={<ProfileEdit username={username} loginUser={loginUser} />}></Route>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
