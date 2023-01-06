import { useEffect, useReducer, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { API } from "../utils";
import DataReducer from "../reducer/DataReducer";
import Loader from "./Loader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";


const Main = () => {

    const initialState = {
        isLoading: true,
        current: [],
    };

    const { theme, toggleTheme } = useTheme();
    const [currentTime, setCurrentTime] = useState('');
    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');
    const [dataWeather, dispatch] = useReducer(DataReducer, initialState);

    useEffect(() => {
        fetch(API.current + 'Fort Worth' + API.units + "imperial" + API.id + API.key)
            .then((response) => response.json())
            .then((data) => dispatch({status: false, payload: data }))
    },[]);

    useEffect(() => {
        console.log(dataWeather);

        if(Object.keys(dataWeather.current).length){
            let now = new Date;
            let date_1 = new Date(dataWeather.current.sys.sunrise  * 1000);
            let date_2 = new Date(dataWeather.current.sys.sunset  * 1000);
            let nowTime = now.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
            let sunrise = date_1.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});
            let sunset = date_2.toLocaleTimeString(navigator.language, {hour: '2-digit', minute:'2-digit'});

            var hours = Math.abs(now - date_2) / 36e5;

            setSunrise(sunrise);
            setSunset(sunset);
            setCurrentTime(nowTime);

            console.log('Now: ' + nowTime)
            console.log('Sunrise: ' + sunrise);
            console.log('Sunset: ' + sunset);
            console.log("Diference: " + hours)
        }

    }, [dataWeather])

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
        <div className=''>
            {dataWeather.isLoading ? (
                <Loader />
            ) : (
                <>
                    <div id="main" className="container">
                        <div className="row">
                            <div className="col-12">
                                <h3>{dataWeather.current.name}</h3>
                                <p>Today overview</p>
                            </div>
                            <div className="col-4">
                                <p>Temperature: {dataWeather.current.main.temp}</p>
                                <p>Feels like: {dataWeather.current.main.feels_like}</p>
                                <p>Min Temp: {dataWeather.current.main.temp_min}</p>
                                <p>Max Temp: {dataWeather.current.main.temp_max}</p>
                                <p>Pressure: {dataWeather.current.main.pressure}</p>
                                <p>Humidity: {dataWeather.current.main.humidity}</p>
                            </div>
                            <div className="col-4">
                                <p>Main: {dataWeather.current.weather[0].main}</p>
                                <p>Description: {dataWeather.current.weather[0].description}</p>

                                <p>Wind Speed: {dataWeather.current.wind.speed}</p>
                            </div>
                            <div className="col-4">
                                <p>Sunrise: {sunrise}</p>
                                <p>Sunset: {sunset}</p>
                                <p>Current: {currentTime}</p>
                            </div>
                        </div>
                    </div>
                </>
            )}            
        </div>
    );
};

export default Main;
