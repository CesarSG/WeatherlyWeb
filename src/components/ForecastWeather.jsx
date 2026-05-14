import Loader from "./Loader";
import { getFormatTimeTimezone, getTemperatureFormat, getImageWeather } from "../utils";
import { Fragment } from 'react';

const ForecastWeather = (props) => {

    const { 
        isLoading, 
        forecastAPI,
        showItems
    } = props;

    return (
        <>
            { !isLoading && forecastAPI.data.cod === '200' ? (
                <div className="container my-3" id="forecast">
                    <div className="row">
                        <div className="col-12 mb-3">
                            <p className="forecast-text">Today forecats</p>
                        </div>
                        {forecastAPI.data.list.slice(0, showItems).map((item, index) => {
                            return (
                                <div className="col-6 col-md text-center py-3" key={index}>
                                    <div className="bg-card py-3">
                                        <p>{getFormatTimeTimezone(item.dt, forecastAPI.data.city.timezone)}</p>
                                        <img className="px-2" alt="icon" src={getImageWeather(item.weather[0].icon)} />
                                        <p className="temp">{getTemperatureFormat(item.main.temp)}</p>
                                        <p>Real feel: {getTemperatureFormat(item.main.feels_like)}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                
            ) : ( 
                <>
                    {forecastAPI.data.hasOwnProperty('cod') && <Loader />}                  
                </>
            )}
        </>
    );

};

export default ForecastWeather;
