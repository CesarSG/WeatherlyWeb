import { useEffect, useReducer, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { API } from "../utils";
import DataReducer from "../reducer/DataReducer";
import Loader from "./Loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";


const Main = () => {

    const initialState = {
        data: [],
    };

    const { theme, toggleTheme } = useTheme();
    const [isLoadingCurrent, setIsLoadingCurrent] = useState(true);
    const [isLoadingForecast, setIsLoadingForecast] = useState(true);
    const [city, setCity] = useState('Los Angeles')
    const [time, setTime] = useState('');
    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');
    const [unit, setUnit] = useState('imperial')
    const [currentAPI, dispatchCurrent] = useReducer(DataReducer, initialState);
    const [forecastAPI, dispatchForecast] = useReducer(DataReducer, initialState);

    useEffect(() => {
        fetch(API.current + city + API.units + unit + API.id + API.key)
            .then((response) => response.json())
            .then((data) => dispatchCurrent({ payload: data }))
            .catch((error) => console.log("Current: " + error))

        fetch(API.forecast + city + API.units + unit + API.id + API.key)
            .then((response) => response.json())
            .then((data) => dispatchForecast({ payload: data }))
            .catch((error) => console.log("Forecast: " + error))
    },[]);

    useEffect(() => {
        if(Object.keys(currentAPI.data).length ){
            setIsLoadingCurrent(false)
            getTimes();
        }            
    }, [currentAPI])

    useEffect(() => {
        console.log(forecastAPI)
        if(Object.keys(forecastAPI.data).length ){
            setIsLoadingForecast(false)
            getTimes();
        }            
    }, [forecastAPI])

    const getTimes = () => {
        let now = new Date;
        //let hours = Math.abs(now - date_2) / 36e5;

        setSunrise(getFormatTime(currentAPI.data.sys.sunrise));
        setSunset(getFormatTime(currentAPI.data.sys.sunset));
        setTime(getFormatTime(now, true));
    }

    // Return Time in format HH:MM PM/AM
    const getFormatTime = (dt, now = false) => {
        let date
        now ? date = dt : date = new Date(dt * 1000);
        let time = date.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});

        return time;
    }

    const getLocation = () => {
        if (!navigator.geolocation) {
            console.log('Geolocation is not supported by your browser');
        } else {
            console.log('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position.coords.latitude);
                console.log(position.coords.longitude);
            }, () => {
                console.log('Unable to retrieve your location');
            });
        }
    }


    return (
        <div id="main">
            {isLoadingCurrent ? (
                <Loader />
            ) : (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h3>{currentAPI.data.name}</h3>
                            <p>Today overview</p>
                        </div>
                        <div className="col-4">
                            <p>Temperature: {currentAPI.data.main.temp}</p>
                            <p>Feels like: {currentAPI.data.main.feels_like}</p>
                            <p>Min Temp: {currentAPI.data.main.temp_min}</p>
                            <p>Max Temp: {currentAPI.data.main.temp_max}</p>
                            <p>Pressure: {currentAPI.data.main.pressure}</p>
                            <p>Humidity: {currentAPI.data.main.humidity}</p>
                        </div>
                        <div className="col-4">
                            <p>Main: {currentAPI.data.weather[0].main}</p>
                            <p>Description: {currentAPI.data.weather[0].description}</p>

                            <p>Wind Speed: {currentAPI.data.wind.speed}</p>
                        </div>
                        <div className="col-4">
                            <p>Sunrise: {sunrise}</p>
                            <p>Sunset: {sunset}</p>
                            <p>Current: {time}</p>
                        </div>
                    </div>
                </div>
            )}   

            {isLoadingForecast ? (<Loader />) : ( 
                <div className="container my-5">
                <div className="row">
                    <div className="col-12">
                        <h3>{forecastAPI.data.city.name}</h3>
                        <p>Today overview</p>
                    </div>
                </div>
            </div>
            )}         
        </div>
    );
};

export default Main;
