import Switch from './Switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll, faBell, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
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
                <div className='col-4'>       
                    <button type="button" style={{ borderRadius: '50px' }} className="btn btn-outline-secondary"><FontAwesomeIcon icon={faBorderAll} /></button>
                    <button type="button" style={{ borderRadius: '50px' }} className="btn btn-outline-secondary ms-3"><FontAwesomeIcon icon={faBell} /></button> 
                </div>
                <div className='col-4'>
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
                <div className='col-4 d-flex justify-content-end'>
                    <Switch />
                </div>
            </div>
        </div>
    );
};

export default Header;
