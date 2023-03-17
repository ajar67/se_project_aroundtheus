export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("click", () => this._handleEscClose());
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("click", () => this._handleEscClose());
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners(evt) {
    evt.preventDefault();
    const modalButtonReset = this._popupElement.querySelector(
      ".modal__button-reset"
    );
    modalButtonReset.addEventListener("click", () => this.close());

    document.addEventListener("click", () => {
      if (evt.target.matches(".modal")) {
        this.close();
      }
    });
  }
}
