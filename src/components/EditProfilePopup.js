import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';


function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    
    
    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen ]);

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangedescription(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name,
          about: description,
        });
      }

    return (
        <PopupWithForm name={'edit'} title={'Редактировать профиль'} buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'} children={<>
            <input
                className="popup__input popup__input_type_name"
                id="name"
                name="name"
                type="text"
                placeholder="Введите имя"
                required=""
                minLength={2}
                maxLength={40}
                value={name || ''}
                onChange={handleChangeName}
            />
            <span className="popup__error name-error" />
            <input
                className="popup__input popup__input_type_job"
                id="job"
                name="job"
                type="text"
                placeholder="Укажите профессию"
                required=""
                minLength={2}
                maxLength={200}
                value={description || ''}
                onChange={handleChangedescription}
            />
            <span className="popup__error job-error" />

        </>} isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} />
    )
}

export default EditProfilePopup;