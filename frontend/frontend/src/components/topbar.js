import React from "react"; 
import Home from ".././media/homebutton.png"
import Logo from ".././media/Hive Logo.png"
import Pfp from ".././media/user-pfp.png"
import ".././styles/Topbar.css";
import { Link, Navigate } from "react-router-dom";
const Topbar = () => {
    return (
    <div>
    <div class = "topbar-container">
            <Link to =".././">
                <button class ="HomeButtonclick">
                    <img src={Home} className="homebutton" alt="homebutton" />
                </button>
            </Link>
                <button class="logo">
                    <img src={Logo} className="center" alt="Hive Logo" />
                </button>
            <Link to =".././Profile">
                <button class ="pfpclick">
                    <img src={Pfp} className="right" alt ="pfp" />
                </button>
            </Link>
    </div>
    <div class="bar"></div>
    </div>
    );
};

export default Topbar;