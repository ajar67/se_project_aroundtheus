class Api {
  constructor(name, about, cardName, link, avatar) {
    this._name = name;
    this._about = about;
    this._cardName = cardName;
    this._link = link;
    this._avatar = avatar;
  }

  getUserInformation() {
    fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
      headers: {
        authorization: "3d5d45c7-6b7d-40fa-b3ac-6d464d71f592",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getInitialCards() {
    fetch("https://around.nomoreparties.co/v1/group-12/cards", {
      headers: {
        authorization: "3d5d45c7-6b7d-40fa-b3ac-6d464d71f592",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  _editProfile() {
    fetch("https://around.nomoreparties.co/v1/group-12/users/me", {
      method: "PATCH",
      headers: {
        authorization: "3d5d45c7-6b7d-40fa-b3ac-6d464d71f592",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this._name,
        about: this._about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  _addNewCard() {
    fetch("https://around.nomoreparties.co/v1/group-12/cards", {
      method: "POST",
      headers: {
        authorization: "3d5d45c7-6b7d-40fa-b3ac-6d464d71f592",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this._cardName,
        link: this._link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  _deleteCard(id) {
    fetch(`https://around.nomoreparties.co/v1/group-12/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: "3d5d45c7-6b7d-40fa-b3ac-6d464d71f592",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  _updateProfPic() {
    fetch("https://around.nomoreparties.co/v1/group-12/users/me/avatar", {
      method: "PATCH",
      headers: {
        authorization: "3d5d45c7-6b7d-40fa-b3ac-6d464d71f592",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: this._avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}
