import { useTheme } from "../context/ThemeContext";
import { Select } from '@chakra-ui/react';

const Switch = () => {
    const { unit, toggleUnit } = useTheme();

    const handleSelect = (event) => {
        let value = event.nativeEvent.target.value;
        toggleUnit(value);
    }
    return (
        <Select onChange={handleSelect} className="select-unit">
            <option value='imperial' defaultValue={unit === "imperial"}>Fahrenheit</option>
            <option value='metric' defaultValue={unit === "metric"}>Celsius</option>
        </Select>
    );
};

export default Switch;
