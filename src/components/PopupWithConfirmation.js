import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmationCallback) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleConfirmationCallback = handleConfirmationCallback;
    this._popupDeleteButton = this._popupForm.querySelector(".modal__button");
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.setSubmitAction();
    });
    super.setEventListeners();
  }

  setSubmitAction(callback) {
    this._handleConfirmationCallback = callback;
  }

  setDeleteButtonText() {
    this._popupDeleteButton.textContent = "Deleting...";
  }

  close() {
    this._popupForm.reset();
    this._popupDeleteButton.textContent = "Yes";
    super.close();
  }
}
