import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Home from  './pages/Home';
import Signin from './pages/Signin';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

function App() {
  return (
    <div class="body">
      <Router>
        <Header/>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Signin" element={<Signin/>}/>
        </Routes>
        
      </Router>
    </div>
  );
}

export default App;
