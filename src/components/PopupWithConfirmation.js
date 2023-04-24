import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { buttonText, loadingButtonText }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._popupDeleteButton = this._popupForm.querySelector(".modal__button");
    this._buttonText = buttonText;
    this._loadingBUttonText = loadingButtonText;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleConfirmationCallback();
    });
    super.setEventListeners();
  }

  setSubmitAction(callback) {
    this._handleConfirmationCallback = callback;
  }

  showLoadingDelete() {
    this._popupDeleteButton.textContent = this._loadingButtonText;
  }

  hideLoadingDelete() {
    this._popupDeleteButton.textContent = this._buttonText;
  }

  close() {
    this._popupForm.reset();
    this._popupDeleteButton.textContent = "Yes";
    super.close();
  }
}
