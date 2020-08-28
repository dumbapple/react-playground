import React from 'react';

const Card = ({ id, name, email }) => {
    // The actual contact card
    return (
        <div className='tc bg-light-green dib br3 ma3 pa3 grow bw2 shadow-5'>
            <img alt='robot' src={`http://robohash.org/${id}200x200`} />
            <div>
                <h2>{name}</h2>
                <p>{email}</p>
            </div>
        </div>
    );
}

export default Card;