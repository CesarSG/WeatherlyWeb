import { useEffect, useReducer, useState } from "react";
import { API, getFormatTime } from "../utils";
import DataReducer from "../reducer/DataReducer";
import CurrentWeather from "./CurrentWeather";
import ForecastWeather from "./ForecastWeather";

const Main = () => {

    const initialState = {
        data: [],
    };

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
        // Update isLoading current API
        if(Object.keys(currentAPI.data).length ){
            setIsLoadingCurrent(false)
            getTimes();
        } 
        
        // Update isLoading forecast API
        if(Object.keys(forecastAPI.data).length ){
            setIsLoadingForecast(false)
        }
    }, )

    useEffect(() => {
        console.log(forecastAPI)             
    }, [forecastAPI])

    const getTimes = () => {
        let now = new Date();
        //let hours = Math.abs(now - date_2) / 36e5;

        setSunrise(getFormatTime(currentAPI.data.sys.sunrise));
        setSunset(getFormatTime(currentAPI.data.sys.sunset));
        setTime(getFormatTime(now, true));
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
            <CurrentWeather 
                isLoading={isLoadingCurrent}
                currentAPI={currentAPI}
                sunrise={sunrise}
                sunset={sunset}
                time={time}
            />  
            <ForecastWeather 
                isLoading={isLoadingForecast}
                forecastAPI={forecastAPI}
                showItems={5}
            />         
        </div>
    );
};

export default Main;
