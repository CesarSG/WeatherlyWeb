import Loader from "./Loader";
import { getImageWeather, getTemperatureFormat } from "../utils";
import { Fragment } from "react";

const MultipleWeather = (props) => {

    const { 
        isLoading, 
        multipleAPI,
    } = props;

    return (
        <>
            { isLoading ? (<Loader />) : ( 
                <Fragment>
                    <h3>Other cities</h3>
                    {multipleAPI.data.list.map((item, index) => {
                        return (
                            <div key={index} className="my-3 py-4 bg-card row">
                                <div className="col-4 text-center d-flex text-center align-items-center">
                                    <div>
                                        <img alt={item.weather[0].description} className="px-2" src={getImageWeather(item.weather[0].icon)} />
                                        <p className="fw-bold">{getTemperatureFormat(item.main.temp)}</p>
                                    </div>
                                </div>
                                <div className="col-4 px-1">
                                    <p>{item.sys.country}</p>
                                    <p>{item.name}</p>
                                    <p>Real feel: {item.main.feels_like}°</p>
                                    <p>{item.weather[0].description}</p>
                                </div>
                                <div className="col-4 d-flex text-center align-items-center justify-content-center">
                                    <p className="fw-bold">{getTemperatureFormat(item.main.temp_min)} / {getTemperatureFormat(item.main.temp_max)}</p>
                                </div>
                            </div>
                        )
                    })}
                </Fragment>
            )}
        </>
    );

};

export default MultipleWeather;
