import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { useForm } from '../hooks/useForm.js';

function AddPlacePopup(props) {

  const { values, handleChange, setValues } = useForm({})

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(
      values
    )
  }

  React.useEffect(() => {
    setValues({});

  }, [props.isOpen]);

  return (
    <PopupWithForm name={'add'} title={'Новое место'} buttonText={props.isLoading ? 'Сохранение...' : 'Создать'} children={<>
      <input
        className="popup__input popup__input_type_place"
        id="place"
        name="place"
        type="text"
        placeholder="Название"
        required=""
        minLength={2}
        maxLength={30}
        value={values.place || ''}
        onChange={handleChange}
      />
      <span className="popup__error place-error" />
      <input
        className="popup__input popup__input_type_link"
        id="link"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required=""
        value={values.link || ''}
        onChange={handleChange}
      />
      <span className="popup__error popup__error_type_active link-error" /></>}

     isOpen = { props.isOpen } onClose = { props.onClose } onSubmit = { handleSubmit } />)
     
}

export default AddPlacePopup;