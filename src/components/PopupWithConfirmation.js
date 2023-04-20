import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmationCallback) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleConfirmationCallback = handleConfirmationCallback;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    super.setEventListeners();
  }

  setSubmitAction(callback) {
    this._handleConfirmationCallback = callback;
  }
}
