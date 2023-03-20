// const picturePopup = document.querySelector("#picture-popup");
// const pictureImageOpen = picturePopup.querySelector(".modal__image-clicked");
// const pictureImageText = picturePopup.querySelector(".modal__image-text");

// -------------------------------------- class Card -----------------------------------------

class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._text = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
      .addEventListener("click", () => this._handleCardClick);
  }

  _handleLikeButton() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  _handleTrashButton() {
    this._element.remove();
    this._element = null;
  }

  // _handlePictureView() {
  //   openPopup(picturePopup);
  //   pictureImageOpen.src = this._link;
  //   pictureImageOpen.alt = this._text;
  //   pictureImageText.textContent = this._text;
  // }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardImage = this._element.querySelector(".card__image");
    const cardText = this._element.querySelector(".card__text");
    cardImage.src = this._link;
    cardImage.alt = this._text;
    cardText.textContent = this._text;
    return this._element;
  }
}

export default Card;
