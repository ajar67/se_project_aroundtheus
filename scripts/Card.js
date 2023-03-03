import { openPopup } from "./utils.js";

const picturePopup = document.querySelector("#picture-popup");
const pictureButtonReset = picturePopup.querySelector(".modal__button-reset");
const pictureImageOpen = picturePopup.querySelector(".modal__image-clicked");
const pictureImageText = picturePopup.querySelector(".modal__image-text");

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closePopup(modalOpened);
  }
}

// -------------------------------------- class Card -----------------------------------------

class Card {
  constructor(data, cardSelector) {
    this._text = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeButton());
    this._element
      .querySelector(".card__trash-button")
      .addEventListener("click", () => this._handleTrashButton());
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handlePictureView());
  }

  _handleLikeButton() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleTrashButton() {
    this._element.remove();
  }

  _handlePictureView() {
    openPopup(picturePopup);
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._text;
    this._element.querySelector(".card__text").textContent = this._text;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".card__text").textContent = this._text;
    return this._element;
  }
}

export default Card;
