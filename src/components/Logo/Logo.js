import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import robot from './robot.png';

// Simple component with no state, so can just use function syntax
const Logo = () => {
    return (
        <div className='ma4 mt0 pa3'>
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner tc pa3"> 
                <img style={{paddingTop: '5px'}} src={robot} alt='logo' />
            </div>
            </Tilt>
        </div>
    );
}

export default Logo;