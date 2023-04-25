import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { buttonText, loadingButtonText }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._popupConfirmationButton =
      this._popupForm.querySelector(".modal__button");
    this._buttonText = buttonText;
    this._loadingButtonText = loadingButtonText;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleConfirmation();
    });
    super.setEventListeners();
  }

  setSubmitAction(callback) {
    this._handleConfirmation = callback;
  }

  showLoading() {
    this._popupConfirmationButton.textContent = this._loadingButtonText;
  }

  hideLoading() {
    this._popupConfirmationButton.textContent = this._buttonText;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
