import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmitCallback) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleSubmitCallback = handleSubmitCallback;
    this._inputs = this._popupForm.querySelectorAll(".modal__input");
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
      this._handleSubmitCallback(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
