import { useEffect, useReducer, useState } from "react";
import { API } from "../utils";
import { useTheme } from "../context/ThemeContext";
import DataReducer from "../reducer/DataReducer";
import CurrentWeather from "./CurrentWeather";
import ForecastWeather from "./ForecastWeather";
import MultipleWeather from "./MultipleWeather";

const Main = () => {

    const initialState = {
        data: [],
    };

    const { unit, city } = useTheme();

    const [isLoadingCurrent, setIsLoadingCurrent] = useState(true);
    const [isLoadingForecast, setIsLoadingForecast] = useState(true);
    const [isLoadingMultiple, setIsLoadingMultiple] = useState(true);
    const [currentAPI, dispatchCurrent] = useReducer(DataReducer, initialState);
    const [forecastAPI, dispatchForecast] = useReducer(DataReducer, initialState);
    const [multipleAPI, dispatchMultiple] = useReducer(DataReducer, initialState);

    useEffect(() => {
        // Set loader as true
        setIsLoadingCurrent(true);
        setIsLoadingForecast(true);

        fetch(API.current + city + API.units + unit + API.id + API.key)
            .then((response) => response.json())
            .then((data) => dispatchCurrent({ payload: data }))
            .catch((error) => console.log("Current: " + error))

        fetch(API.forecast + city + API.units + unit + API.id + API.key)
            .then((response) => response.json())
            .then((data) => dispatchForecast({ payload: data }))
            .catch((error) => console.log("Forecast: " + error))
    },[city]);

    useEffect(() => {
        // Set loader as true
        setIsLoadingCurrent(true);
        setIsLoadingForecast(true);

        fetch(API.current + city + API.units + unit + API.id + API.key)
            .then((response) => response.json())
            .then((data) => dispatchCurrent({ payload: data }))
            .catch((error) => console.log("Current: " + error))

        fetch(API.forecast + city + API.units + unit + API.id + API.key)
            .then((response) => response.json())
            .then((data) => dispatchForecast({ payload: data }))
            .catch((error) => console.log("Forecast: " + error))

        fetch(API.multiple + API.units + unit + API.id + API.key)
            .then((response) => response.json())
            .then((data) => dispatchMultiple({ payload: data }))
            .catch((error) => console.log("Multiple: " + error))
    },[unit]);

    useEffect(() => {
        // Update isLoading current API
        if(Object.keys(currentAPI.data).length ){
            setIsLoadingCurrent(false)
        } 
        
        // Update isLoading forecast API
        if(Object.keys(forecastAPI.data).length ){
            setIsLoadingForecast(false)
        }
        
        // Update isLoading multiple API
        if(Object.keys(multipleAPI.data).length ){
            setIsLoadingMultiple(false)
        }
    }, [currentAPI, forecastAPI, multipleAPI])

    useEffect(() => {
        console.log(currentAPI)             
    }, [currentAPI])

    return (
        <div id="main">
            <div className="container">
                <div className="row py-5">
                    <div className="col-12 col-lg-8">
                        <CurrentWeather 
                            isLoading={isLoadingCurrent}
                            currentAPI={currentAPI}
                        />
                        {<ForecastWeather 
                            isLoading={isLoadingForecast}
                            forecastAPI={forecastAPI}
                            showItems={5}
                        />}
                    </div>
                    <div className="col-12 col-lg-4">
                        <MultipleWeather 
                            isLoading={isLoadingMultiple}
                            multipleAPI={multipleAPI}
                        /> 
                    </div>
                </div>
            </div>     
        </div>
    );
};

export default Main;
