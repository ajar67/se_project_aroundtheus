import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  open({ link, name }) {
    const image = this._popupElement.querySelector(".modal__image-clicked");
    const imageText = this._popupElement.querySelector(".modal__image-text");
    image.src = link;
    imageText.alt = name;
    imageText.textContent = name;
    super.open();
  }
}
