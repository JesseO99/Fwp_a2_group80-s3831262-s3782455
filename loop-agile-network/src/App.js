import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Home from "./pages/Home";
import {useState} from "react";
import Footer from "./components/Footer";

function App() {
    const [username, setUsername] = useState(null);

    return (
        <div className="App">
            <BrowserRouter>
                <Header username={username}/>
                <Navbar username={"username"}/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;
