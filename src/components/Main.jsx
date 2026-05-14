import { useTheme } from "../context/ThemeContext";
import useWeather from "../hooks/useWeather";
import CurrentWeather from "./CurrentWeather";
import ForecastWeather from "./ForecastWeather";
import MultipleWeather from "./MultipleWeather";

const Main = () => {
    const { unit, city } = useTheme();
    const {
        currentAPI,  isLoadingCurrent,
        forecastAPI, isLoadingForecast,
        multipleAPI, isLoadingMultiple,
    } = useWeather(city, unit);

    return (
        <div id="main">
            <div className="container">
                <div className="row py-5">
                    <div className="col-12 col-lg-8">
                        <CurrentWeather
                            isLoading={isLoadingCurrent}
                            currentAPI={currentAPI}
                        />
                        <ForecastWeather
                            isLoading={isLoadingForecast}
                            forecastAPI={forecastAPI}
                            showItems={5}
                        />
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
