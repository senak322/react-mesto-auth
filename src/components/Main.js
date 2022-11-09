import React from 'react';
import penFoto from '../pictures/penfoto.svg';
import { api } from '../utils/Api.js';
import Card from './Card.js';
import {CurrentUserContext } from '../contexts/CurrentUserContext.js'


function Main(props) {

  const userContext = React.useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__user-info">
          <div className="profile__wrapper">
            <img className="profile__foto" alt="фото профиля" src={userContext.avatar} />
            <div className="profile__foto profile__foto_type_overlay" onClick={props.onEditAvatar}>
              <img
                className="profile__pen"
                src={penFoto} 
                alt='Изменить фото'
              />
            </div>
          </div>
          <div className="profile__info">
            <div className="profile__container">
              <h1 className="profile__name">{userContext.name}</h1>
              <button type="button" className="profile__edit" onClick={props.onEditProfile} />
            </div>
            <p className="profile__job">{userContext.about}</p>
          </div>
        </div>
        <button type="button" className="profile__add" onClick={props.onAddPlace} />
      </section>
      <section className="elements">
        {props.cards.map(cardEl => (
          
          <Card card={cardEl} key={cardEl._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
        ))}
      </section>
    </main>
  )
}

export default Main;