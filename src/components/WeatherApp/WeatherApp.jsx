import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WeatherApp.css";

import search_icon from "../assets/search_icon.png";
import cloud_icon from "../assets/cloud_icon.png";
import humidity from "../assets/humidity.png";
import wind from "../assets/wind.png";

const WeatherApp = () => {
   const [data, setData] = useState({
    celcius: 10,
    name: "London",
    humidity: 10,
    speed: 2,
  });

  const updateData = (data) => {
    setData({
        name: data.name,
        speed: data.wind.speed,
        humidity: data.main.humidity,
        celcius: data.main.temp
    })
  }

  useEffect(() => {
    const apiurl =
      "https://api.openweathermap.org/data/2.5/weather?q=London&appid=01c093f41412816425633c4c580d76cb&units=metric";
    axios
      .get(apiurl)
      .then((res) => { updateData(res.data); console.log(res.data);})
      .catch((err) => console.log(err));
  }, []);

  let api_key = "01c093f41412816425633c4c580d76cb";

  const search = async () => {
    const cityName = document.getElementsByClassName("cityInput")[0].value;
    if (cityName === "") {
      return 0;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=Metric&appid=${api_key}`;
    try {
    let response = await fetch(url);
    let data = await response.json();
    updateData(data);
    } catch (e) {
        alert('City not found '+ cityName)
    }
  };
  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Enter City Name"
        />
        <div className="search-icon">
          <img src={search_icon} alt="" onClick={() => search()}/>
        </div>
      </div>
      <div className="weather-image" >
        <img src={cloud_icon} alt="" />
      </div>
      <div className="weather-temp">{data.celcius}°C</div>
      <div className="weather-location">{data.name}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percentage">{data.humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percentage">{data.speed} km/h</div>
            <div className="text">Wind Speed </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
