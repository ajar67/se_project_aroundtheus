import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  open({ link, name }) {
    const picturePopup = document.querySelector("#picture-popup");
    const imageOpen = picturePopup.querySelector(".modal__image-clicked");
    const imageText = picturePopup.querySelector(".modal__image-text");
    imageOpen.src = link;
    imageText.alt = name;
    imageText.textContent = name;
    super.setEventListeners();
    super.open();
  }
}
