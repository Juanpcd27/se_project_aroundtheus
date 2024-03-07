import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import * as constants from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

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
  constants.modalImagePreviewLink.src = link;
  constants.modalImagePreviewLink.alt = name;
  constants.modalPreviewTitle.textContent = name;
  openModal(constants.modalPreviewImage);
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
CardPreview.setEventListeners();

const UserInformation = new UserInfo({
  name: "#profile-title",
  description: "#profile-description",
});

const modalForm = new PopupWithForm("#profile-edt-modal", (data) => {
  UserInformation.setUserInfo({
    name: data.name,
    description: data.description,
  });
});
modalForm.setEventListeners();

const ModalAddForm = new PopupWithForm("#profile-add-modal", (data) => {
  CardSection.addItem(createCard(data));
});
ModalAddForm.setEventListeners();

const CardSection = new Section(
  {
    renderer: (item) => {
      renderCard(item, constants.cardListEl);
    },
  },
  constants.cardListSelector
);

CardSection.renderItems(constants.initialCards);

/* -----------------------------------------------------------------------------*/
/*                                  Event Handlers                              */
/* -----------------------------------------------------------------------------*/

function handleProfileSubmit(e) {
  e.preventDefault();
  constants.profileTitle.textContent = constants.profileModalInput.value;
  constants.profileDescription.textContent =
    constants.profileModalInputDescription.value;
  closeModal(constants.profileEditModal);
}

function handleAddProfileButtonSubmit(e) {
  e.preventDefault();
  const name = constants.profileModalInputTitle.value;
  const link = constants.profileModalInputLink.value;
  renderCard({ name, link }, constants.cardListEl);
  closeModal(constants.profileAddModal);
  e.target.reset();
  addCardFormValidator.disableButton();
}

/* -----------------------------------------------------------------------------*/
/*                                  Event Listeners                             */
/* -----------------------------------------------------------------------------*/

constants.profileEdtBtn.addEventListener("click", () => {
  constants.profileModalInput.value = constants.profileTitle.textContent.trim();
  constants.profileModalInputDescription.value =
    constants.profileDescription.textContent.trim();
  openModal(constants.profileEditModal);
});

constants.profileEdtBtn.addEventListener("click", () =>
  openModal(constants.profileEditModal)
);

constants.previewModalCloseButton.addEventListener("click", () =>
  closeModal(constants.modalPreviewImage)
);

constants.profileModalCloseButton.addEventListener("click", () =>
  closeModal(constants.profileEditModal)
);

//constants.profileModalForm.addEventListener("submit", handleProfileSubmit);
//constants.addProfileModalForm.addEventListener(
//"submit",
//handleAddProfileButtonSubmit
//);

constants.profileAddButton.addEventListener("click", () =>
  openModal(constants.profileAddModal)
);
constants.addCardModalCloseButton.addEventListener("click", () =>
  closeModal(constants.profileAddModal)
);

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

const editCardFormValidator = new FormValidator(
  constants.settings,
  constants.profileModalForm
);
const addCardFormValidator = new FormValidator(
  constants.settings,
  constants.addProfileModalForm
);

addCardFormValidator.enableValidation();
editCardFormValidator.enableValidation();
