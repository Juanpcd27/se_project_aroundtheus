import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open({ name, link }) {
    this._popupElement.querySelector(".modal__title-preview").textContent =
      name;
    const image = this._popupElement.querySelector(".modal__preview-image");
    image.src = link;
    image.alt = `.modal__preview-image ${name}`;
    super.open();
  }
}
