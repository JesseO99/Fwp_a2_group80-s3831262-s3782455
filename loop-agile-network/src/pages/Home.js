import React from "react";
import "./Home.css";
import socialImage from '../img/social.jpg';


function Home() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    {/*Landing Page Branding*/}
                    <p id="heading">Loop Agile Now</p>
                    <p id="slogan">Get connected to your network now!</p>
                </div>
                {/*Landing Page responsive Image*/}
                <div className="col-sm">
                    <img src={socialImage} className="img-fluid" alt="Loop Agile Now Network"></img>
                </div>
            </div>
        </div>
    );
}

export default Home;