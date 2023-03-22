import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(data, popupSelector) {
    super({ popupSelector });
    //this._popupForm = this._popupElement.querySelector("#picture-popup");
    this._link = data.link;
    this._text = data.name;
  }

  open() {
    const imageOpen = document.querySelector(".modal__image-clicked");
    const imageText = document.querySelector(".modal__image-text");
    imageOpen.src = this._link;
    imageText.alt = this._text;
    imageText.textContent = this._text;
    super.open();
  }
}
