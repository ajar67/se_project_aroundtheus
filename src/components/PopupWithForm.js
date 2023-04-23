import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmit, buttonText, loadingButtonText }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleSubmit = handleSubmit;
    this._inputs = this._popupForm.querySelectorAll(".modal__input");
    this._buttonText = buttonText;
    this._loadingButtonText = loadingButtonText;
    this._popupSubmitButton =
      this._popupElement.querySelector(".modal__button");
  }

  _getInputValues() {
    const inputObject = {};
    this._inputs.forEach((input) => {
      inputObject[input.name] = input.value;
    });
    return inputObject;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  hideLoading() {
    this._popupSubmitButton.textContent = this._buttonText;
  }

  showLoading() {
    this._popupSubmitButton.textContent = this._loadingButtonText;
  }
}
