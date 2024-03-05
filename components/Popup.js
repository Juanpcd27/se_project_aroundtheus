export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add(".modal_opened");
  }

  close() {
    this._popupElement.classList.remove(".modal_opened");
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close(this.open);
    }
  }

  setEventListeners() {
    this._popupElement.addEventListeners("click", (e) => {
      e.prevenDefault();
      document.addEventListener("keydown", this._handleEscClose);
      document.removeEventListener("keydown", this._handleEscClose);
    });
  }
}
