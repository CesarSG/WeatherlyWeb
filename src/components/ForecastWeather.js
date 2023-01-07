import Loader from "./Loader";
import { getFormatTime } from "../utils";
import { Fragment } from 'react';

const ForecastWeather = (props) => {

    const { 
        isLoading, 
        forecastAPI,
        showItems
    } = props;

    return (
        <>
            { isLoading ? (<Loader />) : ( 
                <div className="container my-5">
                    <div className="row">
                        <div className="col-12">
                            <p>{forecastAPI.data.city.name}</p>
                            <p>Today forecats</p>
                            {forecastAPI.data.list.slice(0, showItems).map((item, index) => {
                                return (
                                    <Fragment key={index}>
                                        <p>Time {getFormatTime(item.dt)}</p>
                                        <p>Temperature {item.main.temp}</p>
                                        <p>Feels Like {item.main.feels_like}</p>
                                    </Fragment>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
        </>
    );

};

export default ForecastWeather;
