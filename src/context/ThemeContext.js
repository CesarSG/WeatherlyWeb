import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(undefined);

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState('light');
    const [unit, setUnit] = useState('imperial');
    const [city, setCity] = useState('Grapevine');

    const toggleTheme = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    }
    const toggleUnit = (units) => {
        units !== 'imperial' ? setUnit('metric') : setUnit('imperial');
    }
    const toggleCity = (selectCity) => {
        if(city !== selectCity){
            setCity(selectCity)
        }
    }

    return (
        <ThemeContext.Provider
            value={{ theme, unit, city, toggleTheme, toggleUnit, toggleCity }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext);