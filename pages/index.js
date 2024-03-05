import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import { initialCards, selectors } from "../components/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";

/* -----------------------------------------------------------------------------*/
/*                                  Elements                                    */
/* -----------------------------------------------------------------------------*/
const profileEdtBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edt-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const profileModalCloseButton = profileEditModal.querySelector(
  "#modal-close-buttonone"
);
const addCardModalCloseButton = profileAddModal.querySelector(
  "#modal-close-buttontwo"
);
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileModalInput = document.querySelector("#modal-input-title");
const profileModalInputDescription = document.querySelector(
  "#modal-input-description"
);
const profileModalInputTitle = profileAddModal.querySelector(
  ".modal__input-title"
);
const profileModalInputLink =
  profileAddModal.querySelector(".modal__input-link");
const saveButtonOpen = document.querySelector("#save-button-opened");
const profileModalForm = profileEditModal.querySelector(".modal__form");
const addProfileModalForm = profileAddModal.querySelector(".modal__form");
const modalPreviewImage = document.querySelector("#modal-image-preview");
const modalImagePreviewLink = modalPreviewImage.querySelector(
  ".modal__preview-image"
);
const modalPreviewTitle = modalPreviewImage.querySelector(
  ".modal__title-preview"
);

const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const profileAddButton = document.querySelector(".profile__add-button");
const previewModalCloseButton = document.querySelector("#modal__close-preview");
/* -----------------------------------------------------------------------------*/
/*                                  Popup                                       */
/* -----------------------------------------------------------------------------*/

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEscape);
}

function closeModalEscape(e) {
  if (e.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closeModal(modalOpened);
  }
}

/* -----------------------------------------------------------------------------*/
/*                                  card.js                                     */
/* -----------------------------------------------------------------------------*/

function handleImageClick(name, link) {
  modalImagePreviewLink.src = link;
  modalImagePreviewLink.alt = name;
  modalPreviewTitle.textContent = name;
  openModal(modalPreviewImage);
}

function createCard(cardData) {
  const cardElement = new Card(cardData, "#card-template", handleImageClick);
  return cardElement.getView();
}

function renderCard(cardData, wrapper) {
  const cardElement = createCard(cardData);
  wrapper.prepend(cardElement);
}

const CardPreview = new PopupWithImage("#modal-image-preview");

const CardSection = new Section(
  {
    renderer: (item) => {
      const cardElement = new Card(
        {
          item,
          handleImageClick: (ImageData) => {
            CardPreview.open(ImageData);
          },
        },
        "#card-template"
      );
      CardSection.addItem(cardElement.getView());
    },
  },
  selectors.cardSection
);

CardSection.renderItems(initialCards);
CardPreview.setEventListeners();

/* -----------------------------------------------------------------------------*/
/*                                  Event Handlers                              */
/* -----------------------------------------------------------------------------*/

function handleProfileSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileModalInput.value;
  profileDescription.textContent = profileModalInputDescription.value;
  closeModal(profileEditModal);
}

function handleAddProfileButtonSubmit(e) {
  e.preventDefault();
  const name = profileModalInputTitle.value;
  const link = profileModalInputLink.value;
  renderCard({ name, link }, cardListEl);
  closeModal(profileAddModal);
  e.target.reset();
  addCardFormValidator.disableButton();
}

/* -----------------------------------------------------------------------------*/
/*                                  Event Listeners                             */
/* -----------------------------------------------------------------------------*/

profileEdtBtn.addEventListener("click", () => {
  profileModalInput.value = profileTitle.textContent.trim();
  profileModalInputDescription.value = profileDescription.textContent.trim();
  openModal(profileEditModal);
});

profileEdtBtn.addEventListener("click", () => openModal(profileEditModal));

previewModalCloseButton.addEventListener("click", () =>
  closeModal(modalPreviewImage)
);

profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

profileModalForm.addEventListener("submit", handleProfileSubmit);
addProfileModalForm.addEventListener("submit", handleAddProfileButtonSubmit);

profileAddButton.addEventListener("click", () => openModal(profileAddModal));
addCardModalCloseButton.addEventListener("click", () =>
  closeModal(profileAddModal)
);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

/* -----------------------------------------------------------------------------*/
/*                                  Validation                             */
/* -----------------------------------------------------------------------------*/

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editCardFormValidator = new FormValidator(settings, profileModalForm);
const addCardFormValidator = new FormValidator(settings, addProfileModalForm);

addCardFormValidator.enableValidation();
editCardFormValidator.enableValidation();
