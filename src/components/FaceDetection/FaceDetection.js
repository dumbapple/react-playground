import React from 'react';
import './FaceDetection.css';
// Simple component with no state, so can just use function syntax
const FaceDetection = ({ imageURL, box }) => {
    return (
        <div className='tc'>
            <div className='absolute mt2'>
                <img id='inputImage' alt='' src={imageURL} width='300px' height='auto' />
                <div className='bounding-box' style={{
                    top: box.topRow,
                    right: box.rightCol,
                    bottom: box.bottomRow,
                    left: box.leftCol,
                }}></div>
            </div>
        </div>
    );
}

export default FaceDetection;