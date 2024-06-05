import React from "react"; 
import Topbar from "../components/topbar.js"
import Clocktime from "../components/clock.js"
import Livefeed from "../components/livefeedpage.js"
import { useState,useEffect } from "react";

//import {useGoogleLogin} from "@react-oauth/google";


const LiveView = () => {
    const [temperature,SetTemp] = useState(0.0);
    const [humidity,SetHumidity] = useState(0.0);
    const [windspeed,SetWindSpeed] = useState(0.0);
    const Weather= async () => {
        let url='https://api.openweathermap.org/data/2.5/weather?zip=95014,us&appid=74166fb98e202fe44601eb635826e2ac&units=imperial';
        const response = await fetch(url);
        const weather = await response.json();
        console.log(weather);
        SetTemp(weather.main.temp);
        SetWindSpeed(weather.wind.speed);
        SetHumidity(weather.main.humidity);
        
    };
    useEffect(() => {
        Weather();
    
    });
    return (
        <div class="liveview">
            <Topbar />
            <div class="left-box">
                <div class="camera-info">
                    <p1>Camera Name: </p1> 
                     <Clocktime />
                     <p1>Temperature: {temperature}°F<br/> </p1>
                     <p1>Humidity: {humidity} % <br/></p1>
                     <p1>Wind Speed: {windspeed} mph</p1>
                </div>
                <Livefeed/>
            </div>
        </div>


    );

};
export default LiveView;