import Switch from './Switch';
import { images } from "../utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';


const Header = () => {

    const [cityName, setCityName] = useState('');
    const { toggleCity } = useTheme();

    const clearForm = () => {
        setCityName("")
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        toggleCity(cityName);
        clearForm();
    }

    return (
        <div className='container pt-5' id="header">
            <div className='row align-items-center'>
                <div className='col-12 col-md-4 order-1'>       
                    <h2 className="d-inline"><img alt="icon weatherly" src={images.cloud_day} className="icon-name" />Weatherly</h2>
                </div>
                <div className='col-12 col-md-4 mt-3 mt-md-0 order-3'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-0">
                            <input 
                                type="text" 
                                className="form-control px-5" 
                                style={{ borderRadius: '20px'}} 
                                placeholder='Search city...'
                                value={cityName}
                                onChange={e => setCityName(e.target.value) }
                            />
                            <span className='icon-span icons'><FontAwesomeIcon icon={faMagnifyingGlass} className='px-1'/></span>
                        </div>
                    </form>
                </div>
                <div className='col-4 d-none d-md-flex justify-content-end order-2 order-md-3'>
                    <Switch />
                </div>
            </div>
        </div>
    );
};

export default Header;
