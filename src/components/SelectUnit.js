import { useTheme } from "../context/ThemeContext";
import { Select } from '@chakra-ui/react';

const Switch = () => {
    const { unit, toggleUnit } = useTheme();

    const handleSelect = (event) => {
        let value = event.nativeEvent.target.value;
        toggleUnit(value);
    }

    return (
        <Select 
            onChange={handleSelect} 
            className="select-unit"
            value={unit}
            style={{ borderRadius: '20px'}}
        >
            <option value='imperial'>Fahrenheit</option>
            <option value='metric'>Celsius</option>
        </Select>
    );
};

export default Switch;
