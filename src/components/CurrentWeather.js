import Loader from "./Loader";
import { getImageWeather } from "../utils";
import SelectUnit from "./SelectUnit";
import { useTheme } from "../context/ThemeContext"


const CurrentWeather = (props) => {

    const { 
        isLoading, 
        currentAPI,
        sunrise,
        sunset,
        time,
    } = props;

    const { city } = useTheme();

    return (
        <>
            { !isLoading && currentAPI.data.cod === 200 ? (
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <h3>{currentAPI.data.name}</h3> 
                        </div>
                        <div className="col-3">
                            <SelectUnit />
                        </div>
                        <div className="col-12">
                            <p>Today overview</p>
                        </div>
                        <div className="col-4">
                            <img alt={currentAPI.data.weather[0].main} src={getImageWeather(currentAPI.data.weather[0].icon)} />
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
            ) : (
                <>
                    {!currentAPI.data.hasOwnProperty('cod') ? 
                    (<Loader />) : (
                        <div className="d-flex justify-content-center my-5">
                            <div className="text-center">
                                <p>{currentAPI.data.message}</p>
                                <p><b>{city}</b></p>
                            </div>
                        </div>
                    ) }                    
                </>
            )} 
        </>
    );

};

export default CurrentWeather;
