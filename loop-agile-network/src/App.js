import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from  './pages/Home';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {useState} from "react";
import { getUser, removeUser } from "./data/repository";


function App() {
  const [username, setUsername] = useState(getUser());
  
  const loginUser = (username) => {
    setUsername(username);
  }

  const logoutUser = () => {
    removeUser();
    setUsername(null);
  }

  return (
    <div class="body">
      <Router>
        <Header/>
        <Navbar username={username} logoutUser={logoutUser}/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Signin" element={<Signin loginUser={loginUser}/>}/>
          <Route path="/Profile" element={<Profile/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
