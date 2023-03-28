export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    const modalButtonReset = this._popupElement.querySelector(
      ".modal__button-reset"
    );
    modalButtonReset.addEventListener("click", () => this.close());

    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target.matches(".modal")) {
        this.close();
      }
    });
  }
}
