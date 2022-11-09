import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'

function Card(props) {

  const userContext = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === userContext._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `elements__delete ${isOwn ? '' : 'elements__delete_type_hidden'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some(i => i._id === userContext._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `elements__like ${isLiked ? 'elements__like_active' : ''}`;

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleClick() {
    props.onCardClick(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <article className="elements__item">
      <img className="elements__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}/>
      <div className="elements__caption">
        <h2 className="elements__title">{props.card.name}</h2>
        <div className="elements__container">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}/>
          <span className="elements__counter">{props.card.likes.length}</span>
        </div>
      </div>
    </article>
  )
}

export default Card;