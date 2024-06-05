import React, { useState, useEffect } from 'react'

const weather= async () => {
        let url='https://api.openweathermap.org/data/2.5/weather?zip=95014,us&appid=733cc9a44ea1fb2deea063b934b579fd&units=imperial';
        const response = await fetch(url);
        const weather = await response.json();
        console.log(weather);

            /*
            const temp=json.getElementsByClassName("weather-temp");
            const windspeed= json.getElementsByClassName("wind-rate");
            const humidity= json.getElementsByClassName("humidity-percent");
            windspeed[0].innerHTML=json.wind.speed+"mph";
            temp[0].innerHTML=json.main.temp +"°F";
            humidity[0].innerHTML=json.main.humidity+"%";
            */
        };
        /*
    
        <div>
            <p>Temperature: {temp}</p>
            <p>Humidity: {humidity}</p>
            <p>Wind Speed: {windspeed}</p>
        </div>
        */
