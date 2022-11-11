import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import DeletePopup from './DeletePopup.js';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [isAuthOk, setIsAuthOk] = React.useState(true);
  const [deletedCard, setDeletedCard] = React.useState({})
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isSelect, setIsSelect] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    api.getImages().then(res => {
      setCards(res)
    }).catch((err) => { console.log(err) })
  }, [])

  function handleCardLike(card) {

    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => { console.log(err) });
  }

  function handleCardDelete(card) {
    setIsLoading(true)
    api.deleteCard(card._id).then(newCards => {
      setCards((cards) => cards.filter((el) => el._id !== card._id))
      closeAllPopups()
    }).catch((err) => { console.log(err) }).finally(() => { setIsLoading(false) })

  }

  React.useEffect(() => {
    api.getProfileInfo().then(res => {
      setCurrentUser(res)
    }).catch((err) => { console.log(err) });
  }, [])

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsSelect(false)
    setSelectedCard({});
    setIsDeletePopupOpen(false);
    setDeletedCard({})
    setIsInfoPopupOpen(false)
  }

  const isOpen = isEditProfilePopupOpen || isAddPlacePopupOpen || isEditAvatarPopupOpen || isDeletePopupOpen || selectedCard.link || isInfoPopupOpen;

  React.useEffect(() => {
    function closeByEscape(e) {
      if (e.key === 'Escape') {
        closeAllPopups()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsSelect(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function handleUpdateUser(data) {
    setIsLoading(true)
    api.editInfo(data).then(res => {
      setCurrentUser(res);
      closeAllPopups()
    }).catch((err) => { console.log(err) }).finally(() => { setIsLoading(false) })

  }

  function handleUpdateAvatar(data) {
    setIsLoading(true)
    api.setAvatar(data).then(res => {
      setCurrentUser(res);
      closeAllPopups()
    }).catch((err) => { console.log(err) }).finally(() => { setIsLoading(false) })

  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true)
    api.addCard(data).then(res => {
      setCards([res, ...cards]);
      closeAllPopups()
    }).catch((err) => { console.log(err) }).finally(() => { setIsLoading(false) })

  }

  function handleDeleteClick(card) {
    setIsDeletePopupOpen(!isDeletePopupOpen);
    setDeletedCard(card);
  }

  function handleHeaderClick() {
    setLoggedIn(false)
  }

  function handleRegister(bool) {
    setIsInfoPopupOpen(!isInfoPopupOpen);
    setIsAuthOk(bool)
  }

  function handleLogin () {
    setLoggedIn(true)
  }


  return (
    <div className="page">

      <Switch>

        <CurrentUserContext.Provider value={currentUser}>

          <ProtectedRoute path="/home" loggedIn={loggedIn}
            children={<>
              <Header link="/login" headerText="Выйти" loggedIn={loggedIn} onExit={handleHeaderClick} />
              <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleDeleteClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
              <Footer />
              <EditProfilePopup isLoading={isLoading} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
              <EditAvatarPopup isLoading={isLoading} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
              <AddPlacePopup isLoading={isLoading} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
              <DeletePopup isLoading={isLoading} isOpen={isDeletePopupOpen} onClose={closeAllPopups} onDelete={handleCardDelete} card={deletedCard} />
              <ImagePopup isSelect={isSelect} card={selectedCard} onClose={closeAllPopups} />
              </>} />

          <Route path="/register" >
            <Header link="/login" headerText="Войти" />
            <Register onRegister={handleRegister} />
            <InfoTooltip isOpen={isInfoPopupOpen} isOk={isAuthOk} onClose={closeAllPopups} />
          </Route>
          <Route path="/login" >
            <Header link="/register" headerText="Регистрация" />
            <Login onLogin={handleLogin} />
            <InfoTooltip isOpen={isInfoPopupOpen} isOk={isAuthOk} onClose={closeAllPopups} />
          </Route>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/home" /> : <Redirect to="/login" />}
          </Route>
        </CurrentUserContext.Provider>
      </Switch>

    </div >
  );
}

export default App;
