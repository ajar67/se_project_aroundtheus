class Card {
  constructor(
    data,
    userId,
    isOwner,
    cardSelector,
    handleCardClick,
    handleDeleteCard,
    handleLikeButton
  ) {
    this._text = data.name;
    this._link = data.link;
    this.id = data._id;
    this._userId = userId;
    this._isOwner = isOwner;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeButton = handleLikeButton;
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeButton(this));

    this._trashButton = this._element.querySelector(".card__trash-button");
    this._trashButton.addEventListener("click", () =>
      this._handleDeleteCard(this)
    );

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () =>
        this._handleCardClick({ name: this._text, link: this._link })
      );
  }

  like() {
    this._element
      .querySelector(".card__like-button")
      .classList.add("card__like-button_active");
  }

  unlike() {
    this._element
      .querySelector(".card__like-button")
      .classList.remove("card__like-button_active");
  }

  isLiked() {
    return this._likes.find(({ _id }) => this._userId === _id);
  }

  updateLikes(likes) {
    this._likes = likes;
    this.renderLikes();
  }

  renderLikes() {
    const cardLikeNumber = this._element.querySelector(".card__like-number");
    cardLikeNumber.textContent = this._likes.length;
    if (this.isLiked(this._userId)) {
      this.like();
    } else {
      this.unlike();
    }
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
    const cardImage = this._element.querySelector(".card__image");
    const cardText = this._element.querySelector(".card__text");
    this.renderLikes();
    cardImage.src = this._link;
    cardImage.alt = this._text;
    cardText.textContent = this._text;
    if (this._isOwner) {
      this._trashButton.classList.add("card__trash_visible");
    }
    return this._element;
  }

  removeCard() {
    this._element.remove();
    this._element.null;
  }
}

export default Card;
