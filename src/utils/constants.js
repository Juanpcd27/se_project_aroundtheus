export const initialCards = [
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

export const selectors = {
  popupForm: "modal__form",
  previewImage: "modal__preview-image",
};

export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const cardSection = document.querySelector(".page__section");

export const profileEdtBtn = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edt-modal");
export const profileAddModal = document.querySelector("#profile-add-modal");
export const profileModalCloseButton = profileEditModal.querySelector(
  "#modal-close-buttonone"
);
export const addCardModalCloseButton = profileAddModal.querySelector(
  "#modal-close-buttontwo"
);
export const profileTitle = document.querySelector("#profile-title");
export const profileDescription = document.querySelector(
  "#profile-description"
);
export const profileModalInput = document.querySelector(
  ".modal__input_type_name"
);
export const profileModalInputDescription = document.querySelector(
  ".modal__input_type_description"
);
export const profileModalInputLink =
  profileAddModal.querySelector(".modal__input-link");
export const saveButtonOpen = document.querySelector("#save-button-opened");
export const profileModalForm = profileEditModal.querySelector(".modal__form");
export const addProfileModalForm =
  profileAddModal.querySelector(".modal__form");
export const modalPreviewImage = document.querySelector("#modal-image-preview");
export const modalImagePreviewLink = modalPreviewImage.querySelector(
  ".modal__preview-image"
);
export const modalPreviewTitle = modalPreviewImage.querySelector(
  ".modal__title-preview"
);

export const cardListEl = document.querySelector(".cards__list");
export const cardListSelector = ".cards__list";
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
export const profileAddButton = document.querySelector(".profile__add-button");
export const previewModalCloseButton = document.querySelector(
  "#modal__close-preview"
);
