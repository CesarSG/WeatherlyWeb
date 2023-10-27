import Loader from "./Loader";
import { getImageWeather, getFormatTimeTimezone, getTemperatureFormat } from "../utils";
import SelectUnit from "./SelectUnit";
import { useTheme } from "../context/ThemeContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  
    faTemperatureQuarter, 
    faGaugeHigh, 
    faDroplet, 
    faWind,
    faSun,
    faExplosion 
} from "@fortawesome/free-solid-svg-icons";


const CurrentWeather = (props) => {

    const { 
        isLoading, 
        currentAPI,
    } = props;

    const { city } = useTheme();

    return (
        <>
            { !isLoading && currentAPI.data.cod === 200 ? (
                <div className="container" id="current">
                    <div className="row">

                        <div className="col-12 col-lg-9">
                            <h3>{currentAPI.data.name}</h3> 
                        </div>
                        <div className="col-6 col-lg-3 pt-2">
                            <SelectUnit />
                        </div>

                        <div className="col-12 mt-4 mt-lg-2">
                            <p>Today overview</p>
                        </div>
                        <div className="col-8 offset-2 col-md-6 col-lg-4 offset-md-0 text-center py-0 py-lg-5">
                            <img alt={currentAPI.data.weather[0].main} src={getImageWeather(currentAPI.data.weather[0].icon)} />
                            <p className="main-temp">{getTemperatureFormat(currentAPI.data.main.temp)}</p>
                            <p className="description">{currentAPI.data.weather[0].description}</p>
                            <p>Real feel: {getTemperatureFormat(currentAPI.data.main.feels_like)}</p>
                        </div>
                        <div className="col-12 col-md-6 col-lg-8 py-3 d-flex justify-content-between align-items-center">
                            <div className="row py-0 py-lg-4 flex-fill">
                                <div className="col-12">
                                    <div className="mx-3 mt-2">
                                        <p>{currentAPI.data.sys.country}</p>
                                    </div>
                                </div>
                                <div className="col-6 px-0 px-lg-3">
                                    {/* Min temperature */}
                                    <div className="d-flex align-items-center my-3">
                                        <div className="px-4">
                                            <FontAwesomeIcon icon={faTemperatureQuarter} className='fa-2xl'/>
                                        </div>
                                        <div>
                                            <p className="item-data">{getTemperatureFormat(currentAPI.data.main.temp_min)} / {getTemperatureFormat(currentAPI.data.main.temp_max)}</p>
                                            <p>min/max temp</p>
                                        </div>
                                    </div>
                                    {/* Humidity Weather */}
                                    <div className="d-flex align-items-center my-3">
                                        <div className="px-4">
                                            <FontAwesomeIcon icon={faDroplet} className='fa-2xl'/>
                                        </div>
                                        <div>
                                            <p className="item-data">{currentAPI.data.main.humidity}</p>
                                            <p>Humidity</p>
                                        </div>
                                    </div>
                                    {/* Sunrise */}
                                    <div className="d-flex align-items-center my-3">
                                        <div className="px-4">
                                            <FontAwesomeIcon icon={faSun} className='fa-2xl'/>
                                        </div>
                                        <div>
                                            <p className="item-data">{getFormatTimeTimezone(currentAPI.data.sys.sunrise, currentAPI.data.timezone)}</p>
                                            <p>Sunrise</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 px-0 px-lg-3">
                                    {/* Pressure Weather */}
                                    <div className="d-flex align-items-center my-3">
                                        <div className="px-4">
                                            <FontAwesomeIcon icon={faGaugeHigh} className='fa-2xl'/>
                                        </div>
                                        <div>
                                            <p className="item-data">{currentAPI.data.main.pressure}</p>
                                            <p>Pressure</p>
                                        </div>
                                    </div>
                                    {/* Wind Speed Weather */}
                                    <div className="d-flex align-items-center my-3">
                                        <div className="px-4">
                                            <FontAwesomeIcon icon={faWind} className='fa-2xl'/>
                                        </div>
                                        <div>
                                            <p className="item-data">{currentAPI.data.wind.speed}</p>
                                            <p>Wind Speed</p>
                                        </div>
                                    </div>
                                    {/* Sunset */}
                                    <div className="d-flex align-items-center my-3">
                                        <div className="px-4">
                                            <FontAwesomeIcon icon={faExplosion} className='fa-2xl'/>
                                        </div>
                                        <div>
                                            <p className="item-data">{getFormatTimeTimezone(currentAPI.data.sys.sunset, currentAPI.data.timezone)}</p>
                                            <p>Sunset</p>
                                        </div>
                                    </div>
                                </div>
                            </div> 
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
