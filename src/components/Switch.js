import '../App.css';
import { useTheme } from "../context/ThemeContext";


const Switch = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="form-check form-switch">
        <input 
            className="form-check-input" 
            type="checkbox" 
            role="switch" 
            checked={theme === "light"}
            onChange={toggleTheme}
        />
        <label 
            className="form-check-label" 
            for="flexSwitchCheckDefault"
            style={{
                color: theme === 'light' ? 'black' : 'white', 
            }}
        >
                Switch for mode
        </label>
    </div>
  );
};

export default Switch;
