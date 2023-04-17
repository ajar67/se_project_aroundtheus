export default class Api {
  constructor() {
    this._baseUrl = "https://around.nomoreparties.co/v1/group-12/";
    this._header = {
      authorization: "3d5d45c7-6b7d-40fa-b3ac-6d464d71f592",
      "Content-Type": "application/json",
    };
  }

  getUserInformation() {
    fetch(`${this._baseUrl}users/me`, {
      headers: this._header,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialCards() {
    fetch(`${this._baseUrl}cards`, {
      headers: this._header,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  editProfile(name, about) {
    fetch(`${this._baseUrl}users/me`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addNewCard(name, link) {
    fetch(`${this._baseUrl}cards`, {
      method: "POST",
      headers: this._header,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteCard(id) {
    fetch(`${this._baseUrl}cards/${id}`, {
      method: "DELETE",
      headers: this._header,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  updateProfPic(avatar) {
    fetch(`${this._baseUrl}users/me/avatar`, {
      method: "PATCH",
      headers: this._header,
      body: JSON.stringify({
        avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
