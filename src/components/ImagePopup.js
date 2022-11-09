import React from 'react';

function ImagePopup(props) {

  return (
    <div className={`popup popup_type_photo ${props.isSelect ? 'popup_is-open' : ''}`} >
      <div className="popup__photo-container">

        <button type="button" className="popup__close popup__close_type_photo" onClick={props.onClose} />
        <img className="popup__image" src={props.card.link} alt={props.card.name} />
        <p className="popup__place">{props.card.name}</p>
      </div>
    </div>

  )
}

export default ImagePopup;