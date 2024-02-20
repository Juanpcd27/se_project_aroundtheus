import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

const card = new Card(cardData, "#card-template");
card.getView();

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
/*                                  Functions                                   */
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

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".delete__button");

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    modalImagePreviewLink.src = cardImageEl.src;
    modalImagePreviewLink.alt = cardImageEl.alt;
    modalPreviewTitle.textContent = cardTitleEl.textContent;
    openModal(modalPreviewImage);
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

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

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const addCardFormValidator = new FormValidator(config, "#add-card-form");
const editCardFormValidator = new FormValidator(config, "#profile-edt-modal");

addCardFormValidator.enableValidation();
editCardFormValidator.enableValidation();
