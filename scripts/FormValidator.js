class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;

    this._form = formElement;
  }

  _showInputError(inputEl, errorMessage) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = errorMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      _disableButton();
      return;
    }
    _enableButton();
  }

  _hasInvalidInput() {
    this._inputList = [...this._form.querySelectorAll(this._inputSelector)];
    return !this._inputList.every((inputEl) => inputEl.validity.valid); //this._inputList needs to be defined
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return _showInputError(inputEl, errorMessage);
    }

    _hideInputError(inputEl);
  }

  _disableButton() {
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableButton() {
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _setEventListeners() {
    this._inputList = [...this._form.querySelectorAll(this._inputSelector)];
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(this._form, inputEl); // parameters
        this._toggleButtonState(this._inputList, this._submitButton); // parameters
      });
    });
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;