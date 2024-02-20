export default class FormValidator {
  constructor(settings, formElement) {
    this.formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
  }

  _showInputError(inputEl) {
    this._errorMessageEl = this._form.querySelector(
      "#" + inputEl.id + "-error"
    );
    inputEl.classList.add(this._inputErrorClass);
    this._errorMessageEl.textContent = inputEl.validationMessage;
    this._errorMessageEl.classList.add(this._errorClass);
  }

  _toggleButtonState() {
    if (hasInvalidInput(this._inputEls)) {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
      return;
    }
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    } else {
      this._hideInputError(inputEl);
    }
  }

  _hideInputError(inputEl) {
    this._errorMessageEl = this._form.querySelector(
      "#" + inputEl.id + "-error"
    );
    inputEl.classList.remove(this._inputErrorClass);
    this._errorMessageEl.textContent = "";
    this._errorMessageEl.classList.remove(this._errorClass);
  }

  _hasInvalidInput() {
    return !inputList.every((inputEl) => inputEl.validity.valid);
  }

  _setEventListeners() {
    this._inputEls = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    inputEls.forEach((_inputEl) => {
      this._inputEl.addEventListener("input", (_e) => {
        checkInputValidity(this._form, this._inputEl, options);
        toggleButtonState(this._inputEls, this._submitButton, options);
      });
    });

    this._toggleButtonState();
  }

  enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  }

  disableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }
}

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
