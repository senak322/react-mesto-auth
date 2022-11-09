import React from 'react';
import PopupWithForm from './PopupWithForm.js';


function EditAvatarPopup(props) {
    const inputRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: inputRef.current.value
        });
    }

    React.useEffect(() => {
        inputRef.current.value= ('');
    }, [props.isOpen]);

    return (
        <PopupWithForm name={'avatar'} title={'Обновить аватар'}  buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'} children={<> 
            <input
                className="popup__input popup__input_type_link"
                id="avatar"
                name="avatar"
                type="url"
                placeholder="Ссылка на фото"
                required=""
                ref={inputRef}
            />
            <span className="popup__error popup__error_type_active avatar-error" />

        </>} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} />
    )
}

export default EditAvatarPopup;