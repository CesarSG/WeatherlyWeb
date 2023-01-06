import '../App.css';
import { useTheme } from "../context/ThemeContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";


const Switch = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className='row'>
      <div className='col'>
        <FontAwesomeIcon icon={faMoon} className='px-0'/>
      </div>
      <div className="form-check form-switch col d-flex justify-content-end">
          <input 
              className="form-check-input" 
              type="checkbox" 
              role="switch" 
              checked={theme === "light"}
              onChange={toggleTheme}
          />
      </div>
      <div className='col'>
        <FontAwesomeIcon icon={faSun} className='px-0'/>
      </div>
    </div>
  );
};

export default Switch;
