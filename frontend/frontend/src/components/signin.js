import React, {useEffect} from "react"; 
import { GoogleButton } from 'react-google-button';
import {UserAuth} from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import ".././styles/SignIn.css"
import Logo from ".././media/Hive Logo.png"

const SignIn = () => {

    const {googleSignIn, user} = UserAuth(); //Getting access to googleSignIn func from AuthContext.js
    const navigate = useNavigate();
    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn()
        } catch(error) {
            console.log(error)
        }
    };

    useEffect(()=> { //makes sure user is logged in before naving to home
        if(user != null) {
            navigate('/');
        }
    }, [user]);

   

    return (
    <div className = 'signinposition'>
        <div className='leftside'>
            <div classname ="alltext">
                <h1 className = 'headertext'>Welcome To The HIV3!</h1>

                <div className ="bottomtext">
                    <p className = 'bodytext'>Our goal is to help Beekeepers keep track of traffic of their hives. Our new system utilizes an ESP-32 Camera powered by solar energy
                    in which we will be able to provide a live view where users will be able to modify features like quality, framerate,etc. while taking pictures and transmitting
                    the captured images to be processed at a server. The server will apply our machine learning model which will quantify bees that are going in and out of the hive
                    and will connect with our database. The database will communicate with this application to display an accurate traffic of bees in and out. 
                    </p>
                </div>


            </div>
        </div>

        <div className='rightside'>
            <div className='signinbox'>
                <img src={Logo} className="HiveLogo" alt="Hive Logo" /> 
             
                <div className="logintext">
                <h1>HIV3 Monitor</h1>
                <br />
                <div className='googlebutton'>
                    <GoogleButton onClick={handleGoogleSignIn} />
                </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default SignIn;


           
