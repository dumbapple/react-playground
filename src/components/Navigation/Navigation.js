import React from 'react';

// Simple component with no state, so can just use function syntax
const Navigation = () => {
    return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p className='f3 link dim black underline pa3 pointer'>Sign out</p>
        </nav>
    );
}

export default Navigation;