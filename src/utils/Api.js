 class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
    this._headers = {
      authorization: this._token,
      'Content-Type': 'application/json'
    }
  }

  

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getImages() {
    return fetch(`${this._url}/v1/cohort-50/cards`, {
      headers: this._headers
    })
    .then(this._getResponseData)
  }

  getProfileInfo() {
    return fetch(`${this._url}/v1/cohort-50/users/me`, {
    headers: this._headers
  })
    .then(this._getResponseData)
  }

  editInfo(values) {
    return fetch(`${this._url}/v1/cohort-50/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: values.name,
        about: values.about
      })
    })
    .then(this._getResponseData)
  }

  addCard(values) {
    return fetch(`${this._url}/v1/cohort-50/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: values.place,
        link: values.link
      })
    })
    .then(this._getResponseData)
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/v1/cohort-50/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._getResponseData)
  }

  likeCard(cardId) {
    return fetch(`${this._url}/v1/cohort-50/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers

    })
    .then(this._getResponseData)
  }

  unLikeCard(cardId) {
    return fetch(`${this._url}/v1/cohort-50/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers

    })
    .then(this._getResponseData)
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      this.status = this.unLikeCard(cardId);
      return this.status
    } else {
      this.status = this.likeCard(cardId);
      return this.status
    }
  }

  setAvatar(url) {
    return fetch(`${this._url}/v1/cohort-50/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: url.avatar
      })

    })
    .then(this._getResponseData)
  }

}
const api = new Api('https://nomoreparties.co', '83d4c574-f43f-43fb-a250-62d63411e3fe')

export {api};

