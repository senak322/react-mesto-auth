import React from 'react';
function PopupWithForm({isOpen, onClose, name, title, buttonText, children, onSubmit}) {
    return (

        <div className={`popup ${isOpen ? 'popup_is-open' : ''} popup_type_${name}`}>
            <div className={`popup__content popup__content_type_${name}`}>
                <button type="button" onClick={onClose} className={`popup__close popup__close_type_${name}`} />
                <h3 className={`popup__title popup__title_type_${name}`}>
                    {title}
                </h3>
                <form
                    className="popup__form"
                    action="#"
                    name={`${name}-profile`}
                    
                    onSubmit={onSubmit}
                >
                    {children}
                    <button className={`popup__save popup__save_type_${name}`} type="submit">
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>


    )
}

export default PopupWithForm;