import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitCallback = submitCallback;
  }

  _getInputValues() {
    const inputs = this._popupForm.querySelector("modal__input");
    const inputObject = {};
    inputs.forEach((input) => {
      inputObject[input.name] = input.value;
    });
    return inputObject;
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", () => {
      this._submitCallback();
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
