import React from "react";
import '../Modal/Modal.css'

function Modal({closeModal, vendor}) {
    return (
        <div className='modalBackground'>
            <div className='modalContainer'>
                <div className='titleCloseBtn'>
                    <button onClick={() => closeModal(false)}> X </button>
                </div>
                <div className='title'></div>
                    <h1 id='modalTitle'>{vendor.title}</h1>
                <div className='body'>
                    <p>{vendor.location}</p> 
                    <br />
                    <p>{vendor.website}</p>
                </div>
                <div className='footer'>
                    <button onClick={() => closeModal(false)} id="cancelBtn">Cancel</button>
                    <button>Favorites</button>
                </div>
            </div>
        </div>
    )
}

export default Modal