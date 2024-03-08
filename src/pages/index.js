import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import * as constants from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";

const CardPreview = new PopupWithImage("#modal-image-preview");
CardPreview.setEventListeners();

function handleImageClick(name, link) {
  CardPreview.open({ name, link });
}

function createCard(cardData) {
  const cardElement = new Card(cardData, "#card-template", handleImageClick);
  return cardElement.getView();
}

function renderCard(cardData, wrapper) {
  const cardElement = createCard(cardData);
  wrapper.prepend(cardElement);
}

const UserInformation = new UserInfo({
  name: "#profile-title",
  description: "#profile-description",
});

const editModalForm = new PopupWithForm("#profile-edt-modal", (data) => {
  UserInformation.setUserInfo({
    name: data.title,
    description: data.description,
  });
});
editModalForm.setEventListeners();
constants.profileEdtBtn.addEventListener("click", () => editModalForm.open());

const ModalAddForm = new PopupWithForm("#profile-add-modal", (data) => {
  CardSection.addItem(createCard(data));
});
ModalAddForm.setEventListeners();
constants.profileAddButton.addEventListener("click", () => ModalAddForm.open());

const CardSection = new Section(
  {
    renderer: (item) => {
      renderCard(item, constants.cardListEl);
    },
  },
  constants.cardListSelector
);

CardSection.renderItems(constants.initialCards);

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