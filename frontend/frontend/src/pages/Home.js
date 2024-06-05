import React, {useEffect,useState} from "react"; 
import ".././styles/Home.css";
import Topbar from "../components/topbar.js"
import Clocktime from "../components/clock.js"
import Livefeed from "../components/livefeed.js"
import Pastdata from "../components/pastdata.js"
import CurrentCount from "../components/currentcount.js"
import { Link } from "react-router-dom";
import {UserAuth} from '../context/AuthContext'
import {Navigate} from 'react-router-dom'
import Stream from "../components/stream.js";


const Home = () => {
    const {user, logOut} = UserAuth();
    const current_user = user.email;
    const current_user_id = user.uid;
    const [temperature,SetTemp] = useState(0.0);
    const [humidity,SetHumidity] = useState(0.0);
    const [windspeed,SetWindSpeed] = useState(0.0);

    /*Finding if user has a role*/
    /*End Of Finding if user has a role*/
    const checkMembersInRole = (role, userEmail)  => {
        //console.log(role);
        //console.log(userEmail);
       return fetch(`https://hiv3-app-1abe045e0a88.herokuapp.com/findmember?role=${encodeURIComponent(role)}&current_user=${encodeURIComponent(userEmail)}`)
            .then(response => response.json())
            .then(data=> {
                console.log(data.message);
                return data.message.includes("Member exists in role");
            })
            .catch(error => {
                console.error('Error', error);
                return false;
            });
    }



    const fetchOwnerRole = async () => {
        
        try {
            const isOwner = await checkMembersInRole('Owner', current_user);
            const isAdmin = await checkMembersInRole('Admin', current_user);
            const isGuest = await checkMembersInRole('Guest', current_user);
            const isBanned = await checkMembersInRole('Banned', current_user);
            if(isOwner) {
                console.log("The user is a member of owner")
            }
            else if(isAdmin){
                console.log("The user is a member of admin")
            }
            else if(isGuest) {
                console.log("The user is a member of guest")
            }
            else if(isBanned) { //Will need to rethink this, banned user can escape by clicking other link fast
                return [ 
                <Navigate to='/signin' />,
                logOut()
                ];
            }
             else {
                console.log("The user is not any role yet")
                assignUser();
            }
        } catch (error) {
            console.error("Error Fetching DA Role", error);
        }
    }
    const Weather= async () => {
        let url='https://api.openweathermap.org/data/2.5/weather?zip=95014,us&appid=74166fb98e202fe44601eb635826e2ac&units=imperial';
        const response = await fetch(url);
        const weather = await response.json();
        console.log(weather);
        SetTemp(weather.main.temp);
        SetWindSpeed(weather.wind.speed);
        SetHumidity(weather.main.humidity);
        
    };

    const assignUser = async () =>{
       console.log("Unassigned User Detected.. Launching Function");
        const roleId = "e024"; //RoleId = guest
       const memberData = { aemail: current_user, userid: current_user_id, roleId: roleId};

       try {
            const response = await fetch('https://hiv3-app-1abe045e0a88.herokuapp.com/members', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(memberData)
            });
            const responseBody = await response.text();
            console.log('Raw Response', responseBody);

            if(!response.ok) {
                throw new Error('failed to add guest');
            }

            const data = JSON.parse(responseBody);
            console.log('Member Added successfully', data);
       } catch (error) {
        console.error('Error adding member:', error)
       }
    }

    useEffect(() => {
        if(current_user) {
            fetchOwnerRole();
    }

        Weather();

});

    return (
        <div class="homepage">
            <Topbar />
            <div className="container">
            <div className="firstCol">
                <div className="camera-info">
                    <p1>Camera Name: </p1> 
                     <Clocktime />
                     <p1>Temperature: {temperature}°F<br/> </p1>
                     <p1>Humidity: {humidity} % <br/></p1>
                     <p1>Wind Speed: {windspeed} mph</p1>
                </div>
                <div className ="Manage_Camera">
                    <button className ="Sidebar_Button">
                    <Link to='/ManageCamera' className="titles">Manage Camera</Link>
                    </button>
                </div>
                <div className ="Live_View">
                    <button className="Sidebar_Button">
                        <Link to='/LiveView' className="titles">LiveView</Link>
                    </button>
                </div>
                <div className ="View_Data">
                    <button className="Sidebar_Button">
                    <Link to='/ViewData' className="titles">View Data</Link>
                    </button>
                </div>
    
            </div>
            <div className="secondCol">
                <Stream/>
                <CurrentCount/>
            </div>
            <div className="thirdCol">
            </div>
            <div className="fourthCol">
            <Pastdata />
            </div>
            <div className="fifthCol">
            </div>
        </div>

        </div>


    );

};
export default Home;


