import React from 'react';
import './ImageLinkForm.css';


// Simple component with no state, so can just use function syntax
const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return (
        <div className='tc'>
            <p className='f3'>
                {`Give a picture, and I will find any faces in it!`}
            </p>

            <div className='form ma4 pa4 br3 shadow-5' >
                <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} />
                <button 
                    className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                    onClick={onButtonSubmit}
                >Detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm;