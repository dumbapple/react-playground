import React from 'react';


// Simple component with no state, so can just use function syntax
const Rank = () => {
    return (
        <div className='tc'>
            <div className='white f3'>
                {`Your current rank is...`}
            </div>
            <div className='white f1'>
                {`#5`}
            </div>
        </div>
    );
}

export default Rank;