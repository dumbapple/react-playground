import React from 'react';
import './ImageLinkForm.css';


// Simple component with no state, so can just use function syntax
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className=''>
            <p className='f3'>
                {`Give a picture, and I will find any faces in it!`}
            </p>

            <div className='form pa4 br3 shadow-5' >
                <input className='f4 w-70' type='text' onChange={onInputChange} />
                <button 
                    className='w-30 grow f4 link ph3 pv2 white bg-light-purple'
                    onClick={onButtonSubmit}
                >Detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm;