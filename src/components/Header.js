import Switch from './Switch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBorderAll, faBell, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Avatar } from '@chakra-ui/react'


const Header = () => {
  return (
    <div className='container pt-5' id="header">
        <div className='row align-items-center'>
            <div className='col-4'>       
                <button type="button" style={{ borderRadius: '50px' }} className="btn btn-outline-secondary"><FontAwesomeIcon icon={faBorderAll} /></button>
                <button type="button" style={{ borderRadius: '50px' }} className="btn btn-outline-secondary ms-3"><FontAwesomeIcon icon={faBell} /></button>
                <p className='ps-3 mb-0 d-inline'><FontAwesomeIcon icon={faLocationDot} className='px-1'/> Seattle, Australia</p>    
            </div>
            <div className='col-4'>
                <form>
                    <div className="mb-0">
                        <input type="text" className="form-control px-5" style={{ borderRadius: '20px'}} placeholder='Search city...'/>
                        <span className='icon-span icons'><FontAwesomeIcon icon={faLocationDot} className='px-1'/></span>
                    </div>
                </form>
            </div>
            <div className='col-4 d-flex justify-content-end'>
                <Switch />
                <Avatar size='sm' className='mb-3 ms-5' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
            </div>
        </div>
    </div>
  );
};

export default Header;
