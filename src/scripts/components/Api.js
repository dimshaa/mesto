export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._cohortId = options.cohortId;
    this._token = options.token;
  }

  _handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/${this._cohortId}/users/me`, {
      headers: {
        authorization: this._token
      }
    })
      .then(res => this._handleResponse(res));
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/${this._cohortId}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => this._handleResponse(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/${this._cohortId}/cards`, {
      headers: {
        authorization: this._token,
      },
    })
      .then((res) => this._handleResponse(res));
  }

  uploadCard(data) {
    return fetch(`${this._baseUrl}/${this._cohortId}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => this._handleResponse(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/${this._cohortId}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      }
    })
    .then(res => this._handleResponse(res));
  }

}
