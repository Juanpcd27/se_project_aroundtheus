import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
  }

  setEventListeners() {
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit();
      this.close();
    });
    super.setEventListeners();
  }

  setconfirmCall(handleFormSubmit) {
    this._handleFormSubmit = handleFormSubmit;
  }
}
