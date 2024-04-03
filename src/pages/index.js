import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import * as constants from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import Api from "../components/Api.js";
import PopupConfirm from "../components/PopupConfirm.js";
import { data } from "autoprefixer";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d0764cda-b1ee-4837-a694-3cacde791a83",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((res) => {
    cardSection.renderItems(res);
  })
  .catch((err) => {
    console.error(err);
  });

api
  .getUserInfo()
  .then((res) => {
    userInformation.setUserInfo({
      name: res.name,
      description: res.about,
    });
    userInformation.setUserAvatar(res.avatar);

    editModalForm.close();
  })
  .catch((err) => {
    console.error(err);
  });

const deleteCardModal = new PopupConfirm(
  "#modal-delete-card",
  handleDeleteClick
);
deleteCardModal.setEventListeners();

function handleDeleteClick(card) {
  deleteCardModal.open();
  deleteCardModal.setConfirmCall(() => {
    deleteCardModal.renderLoading(true);
    api
      .deleteCard(card.getId())
      .then(() => {
        card.handleDeleteCard();
        deleteCardModal.close();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        deleteCardModal.renderLoading(false);
      });
  });
}

const cardPreview = new PopupWithImage("#modal-image-preview");
cardPreview.setEventListeners();

function handleImageClick(name, link) {
  cardPreview.open({ name, link });
}

function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteClick,
    removeLike,
    likeCard
  );
  return cardElement.getView();
}

const userInformation = new UserInfo({
  name: "#profile-title",
  description: "#profile-description",
  avatar: ".profile__image",
});

const editModalAvatar = new PopupWithForm("#modal-avatar", (data) => {
  editModalAvatar.renderLoading(true);
  api
    .updateProfilePicture(data)
    .then((res) => {
      userInformation.setUserAvatar(res.avatar);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editModalAvatar.renderLoading(false);
    });
});

editModalAvatar.setEventListeners();
constants.editButtonAvatar.addEventListener("click", () => {
  avatarValidator.enableValidation();
  editModalAvatar.open();
});

const editModalForm = new PopupWithForm("#profile-edt-modal", (data) => {
  editModalForm.renderLoading(true);
  api
    .updateProfileInfo(data)
    .then((res) => {
      userInformation.setUserInfo({
        name: res.name,
        description: res.about,
      });
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      editModalForm.renderLoading(false);
    });
});
editModalForm.setEventListeners();
constants.profileEdtBtn.addEventListener("click", () => {
  editCardFormValidator.resetValidation();
  const userData = userInformation.getUserInfo();
  constants.profileModalInput.value = userData.name;
  constants.profileModalInputDescription.value = userData.description.trim();

  editModalForm.open();
});

const modalAddForm = new PopupWithForm("#profile-add-modal", (data) => {
  modalAddForm.renderLoading(true);
  api
    .addNewCard(data)
    .then((res) => {
      cardSection.addItem(createCard(res));
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      modalAddForm.renderLoading(false);
    });
});
modalAddForm.setEventListeners();
constants.profileAddButton.addEventListener("click", () => {
  modalAddForm.open();
  addCardFormValidator.resetValidation();
});

const cardSection = new Section(
  {
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  constants.cardListSelector
);

//cardSection.renderItems(constants.initialCards);

const editCardFormValidator = new FormValidator(
  constants.settings,
  constants.profileModalForm
);
const addCardFormValidator = new FormValidator(
  constants.settings,
  constants.addProfileModalForm
);

const avatarValidator = new FormValidator(
  constants.settings,
  constants.profileAvatarForm
);

addCardFormValidator.enableValidation();
editCardFormValidator.enableValidation();
avatarValidator.enableValidation();

function likeCard(card) {
  api
    .likeCard(card.getId())
    .then(() => {
      card.setIsLiked();
    })
    .catch((err) => {
      console.error(err);
    });
}

function removeLike(card) {
  api
    .removeLikeCard(card.getId())
    .then(() => {
      card.setIsLiked();
    })
    .catch((err) => {
      console.error(err);
    });
}
