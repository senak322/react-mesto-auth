import React from 'react';
import ok from '../pictures/ok.svg';
import err from '../pictures/err.svg';


function InfoTooltip({ isOpen, onClose, isOk }) {
    return (
        <div className={`popup ${isOpen ? 'popup_is-open' : ''} popup_type_info `}>
            <div className="popup__content popup__content_type_info">
                <button type="button" onClick={onClose} className="popup__close" />
                <img src={isOk ?  ok  :  err }></img>
                <h3 className="popup__title popup__title_type_info">
                    {isOk ? 'Вы успешно зарегистрировались!' : `Что-то пошло не так!
Попробуйте ещё раз.`}
                </h3>

            </div>
        </div>
    )
}

export default InfoTooltip;