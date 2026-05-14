import { useEffect, useReducer, useState } from "react";
import { API, wmoToIcon, wmoToMain, wmoToDescription } from "../utils";
import DataReducer from "../reducer/DataReducer";

const initialState = { data: [] };

const useWeather = (city, unit) => {
  const [isLoadingCurrent, setIsLoadingCurrent] = useState(true);
  const [isLoadingForecast, setIsLoadingForecast] = useState(true);
  const [isLoadingMultiple, setIsLoadingMultiple] = useState(true);
  const [currentAPI, dispatchCurrent] = useReducer(DataReducer, initialState);
  const [forecastAPI, dispatchForecast] = useReducer(DataReducer, initialState);
  const [multipleAPI, dispatchMultiple] = useReducer(DataReducer, initialState);

  useEffect(() => {
    setIsLoadingCurrent(true);
    setIsLoadingForecast(true);

    const tempUnit = unit === "imperial" ? "fahrenheit" : "celsius";
    const windUnit = unit === "imperial" ? "mph" : "kmh";

    fetch(
      `${API.geocoding}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`,
    )
      .then((r) => {
        if (!r.ok) throw new Error("Geocoding failed");
        return r.json();
      })
      .then((geo) => {
        if (!geo.results?.length) throw new Error(`City "${city}" not found`);
        const { latitude, longitude, name, country_code } = geo.results[0];
        return fetch(
          `${API.weather}?latitude=${latitude}&longitude=${longitude}` +
            `&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,surface_pressure,wind_speed_10m` +
            `&hourly=temperature_2m,apparent_temperature,weather_code,is_day` +
            `&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset` +
            `&temperature_unit=${tempUnit}&wind_speed_unit=${windUnit}` +
            `&timezone=auto&timeformat=unixtime&forecast_days=2`,
        )
          .then((r) => {
            if (!r.ok) throw new Error("Weather fetch failed");
            return r.json();
          })
          .then((weather) => ({ geo: { name, country_code }, weather }));
      })
      .then(({ geo, weather }) => {
        const { current, daily, hourly, utc_offset_seconds } = weather;

        dispatchCurrent({
          payload: {
            cod: 200,
            name: geo.name,
            weather: [
              {
                main: wmoToMain(current.weather_code),
                icon: wmoToIcon(current.weather_code, current.is_day),
                description: wmoToDescription(current.weather_code),
              },
            ],
            main: {
              temp: current.temperature_2m,
              feels_like: current.apparent_temperature,
              temp_min: daily.temperature_2m_min[0],
              temp_max: daily.temperature_2m_max[0],
              humidity: current.relative_humidity_2m,
              pressure: current.surface_pressure,
            },
            wind: { speed: current.wind_speed_10m },
            sys: {
              country: geo.country_code,
              sunrise: daily.sunrise[0],
              sunset: daily.sunset[0],
            },
            timezone: utc_offset_seconds,
          },
        });

        const now = Math.floor(Date.now() / 1000);
        const startIdx = hourly.time.findIndex((t) => t >= now);
        const idx = startIdx === -1 ? 0 : startIdx;

        dispatchForecast({
          payload: {
            cod: "200",
            list: hourly.time.slice(idx, idx + 5).map((dt, i) => ({
              dt,
              weather: [
                {
                  icon: wmoToIcon(
                    hourly.weather_code[idx + i],
                    hourly.is_day[idx + i],
                  ),
                },
              ],
              main: {
                temp: hourly.temperature_2m[idx + i],
                feels_like: hourly.apparent_temperature[idx + i],
              },
            })),
            city: { timezone: utc_offset_seconds },
          },
        });
      })
      .catch((err) => {
        console.error("Weather fetch error:", err);
        dispatchCurrent({ payload: { cod: 404, message: err.message } });
        dispatchForecast({ payload: { cod: "404" } });
        setIsLoadingCurrent(false);
        setIsLoadingForecast(false);
      });
  }, [city, unit]);

  useEffect(() => {
    setIsLoadingMultiple(true);

    const tempUnit = unit === "imperial" ? "fahrenheit" : "celsius";

    Promise.all(
      API.cities.map((c) =>
        fetch(
          `${API.weather}?latitude=${c.lat}&longitude=${c.lon}` +
            `&current=temperature_2m,apparent_temperature,is_day,weather_code` +
            `&daily=temperature_2m_max,temperature_2m_min` +
            `&temperature_unit=${tempUnit}&timezone=auto&timeformat=unixtime&forecast_days=1`,
        )
          .then((r) => {
            if (!r.ok) throw new Error(`Failed for ${c.name}`);
            return r.json();
          })
          .then((data) => ({
            name: c.name,
            sys: { country: c.country },
            weather: [
              {
                description: wmoToDescription(data.current.weather_code),
                icon: wmoToIcon(data.current.weather_code, data.current.is_day),
              },
            ],
            main: {
              temp: data.current.temperature_2m,
              feels_like: data.current.apparent_temperature,
              temp_min: data.daily.temperature_2m_min[0],
              temp_max: data.daily.temperature_2m_max[0],
            },
          })),
      ),
    )
      .then((list) => dispatchMultiple({ payload: { list } }))
      .catch((err) => {
        console.error("Multiple cities error:", err);
        setIsLoadingMultiple(false);
      });
  }, [unit]);

  useEffect(() => {
    if (Object.keys(currentAPI.data).length) setIsLoadingCurrent(false);
    if (Object.keys(forecastAPI.data).length) setIsLoadingForecast(false);
    if (Object.keys(multipleAPI.data).length) setIsLoadingMultiple(false);
  }, [currentAPI, forecastAPI, multipleAPI]);

  return {
    currentAPI,
    isLoadingCurrent,
    forecastAPI,
    isLoadingForecast,
    multipleAPI,
    isLoadingMultiple,
  };
};

export default useWeather;
