import Loader from "./Loader";

const CurrentWeather = (props) => {

    const { 
        isLoading, 
        currentAPI,
        sunrise,
        sunset,
        time,
    } = props;

    return (
        <>
            { isLoading ? (
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
        </>
    );

};

export default CurrentWeather;
