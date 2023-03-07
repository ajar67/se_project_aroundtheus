import { openPopup, closePopup } from "./utils.js";

const picturePopup = document.querySelector("#picture-popup");
const pictureImageOpen = picturePopup.querySelector(".modal__image-clicked");
const pictureImageText = picturePopup.querySelector(".modal__image-text");

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
      .querySelector("card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleTrashButton() {
    this._element.remove();
    this._element = null;
  }

  _handlePictureView() {
    openPopup(picturePopup);
    pictureImageOpen.src = this._link;
    pictureImageOpen.alt = this._text;
    pictureImageText.textContent = this._text;
  }

  /*createCard(){
    const createCard = (cardData) => {
      const card = new Card(cardData, ".template");
      return card.createCard();
    }
  }*/

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardText = this._element.querySelector(".card__text");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._text;
    this._cardText.textContent = this._text;
    return this._element;
  }
}

export default Card;
