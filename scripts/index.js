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

/* -----------------------------------------------------------------------------*/
/*                                  Elements                                    */
/* -----------------------------------------------------------------------------*/

const profileEdtBtn = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edt-modal");
const profileAddModal = document.querySelector("#profile-add-modal");
const profileModalCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
);
const profileTitle = document.querySelector("#profile-title");
const profileDescription = document.querySelector("#profile-description");
const profileModalInput = document.querySelector("#modal-input-title");
const profileModalInputDescription = document.querySelector(
  "#modal-input-description"
);
const saveButtonOpen = document.querySelector("#save-button-open");
const profileModalForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const profileAddButton = document.querySelector(".profile__add-button");

/* -----------------------------------------------------------------------------*/
/*                                  Functions                                   */
/* -----------------------------------------------------------------------------*/

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  return cardElement;
}
//function openModal() {
//profileModalInput.value = profileTitle.textContent.trim();
//profileModalInputDescription.value = profileDescription.textContent.trim();
//profileEditModal.classList.add("modal_opened");
//}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

/* -----------------------------------------------------------------------------*/
/*                                  Event Handlers                              */
/* -----------------------------------------------------------------------------*/

function handleProfileSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileModalInput.value;
  profileDescription.textContent = profileModalInputDescription.value;
  closeModal();
}

/* -----------------------------------------------------------------------------*/
/*                                  Event Listeners                             */
/* -----------------------------------------------------------------------------*/

profileEdtBtn.addEventListener("click", function openModal() {
  profileModalInput.value = profileTitle.textContent.trim();
  profileModalInputDescription.value = profileDescription.textContent.trim();
  profileEditModal.classList.add("modal_opened");
});

profileEdtBtn.addEventListener("click", () => openModal(profileEditModal));

profileModalCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);

profileModalForm.addEventListener("submit", handleProfileSubmit);

profileAddButton.addEventListener("click", () => openModal(profileAddModal));

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
