export default class Api {
  constructor({ baseUrl, authorizationID }) {
    this._baseUrl = baseUrl;
    this._header = {
      authorization: authorizationID,
      "Content-Type": "application/json",
    };
    this._processResponseServer = (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    };
  }

  getUserInformation() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._header,
    }).then(this._processServerResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._header,
    }).then(this._processServerResponse);
  }

  editProfile({ name, about }) {
    return fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._processServerResponse);
  }

  addNewCard({ name, link }) {
    return fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._header,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._processServerResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}cards/${id}`, {
      method: "DELETE",
      headers: this._header,
    }).then(this._processServerResponse);
  }

  updateProfPic(avatar) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._processServerResponse);
  }

  addLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: "PUT",
      headers: this._header,
    }).then(this._processServerResponse);
  }

  removeLike(id) {
    return fetch(`${this._baseUrl}cards/likes/${id}`, {
      method: "DELETE",
      headers: this._header,
    }).then(this._processServerResponse);
  }
}
