import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import { openPopup, closePopup, closePopupByOverlayClick } from "./utils.js";

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

const profileEditButton = document.querySelector(".profile__edit-button");
const profilePopup = document.querySelector("#profile-popup");
const profileFormElement = profilePopup.querySelector(".modal__form");
const profileButtonReset = profilePopup.querySelector(".modal__button-reset");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileAddButton = document.querySelector(".profile__add-button");

const addCardPopup = document.querySelector("#add-card-popup");
const addCardPopupResetButton = addCardPopup.querySelector(
  ".modal__button-reset"
);
const addCardPopupForm = addCardPopup.querySelector(".modal__form");
const titleInput = document.querySelector("#title");
const imageInput = document.querySelector("#image");

const picturePopup = document.querySelector("#picture-popup");
const pictureButtonReset = picturePopup.querySelector(".modal__button-reset");

// ----------opens edit profile button--------------------------------------------------

function openProfileModal() {
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
profileEditButton.addEventListener("click", openProfileModal);
profileButtonReset.addEventListener("click", () => closePopup(profilePopup));

// -----------------makes submit button work-----------------------------------------------

function handleProfileModalSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profilePopup);
}
profilePopup.addEventListener("submit", handleProfileModalSubmit);

// -----------------opens add card button-----------------------------------------------------

profileAddButton.addEventListener("click", () => openPopup(addCardPopup));
addCardPopupResetButton.addEventListener("click", () =>
  closePopup(addCardPopup)
);

// -----------------adds card to page---------------------------------------------------------

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = titleInput.value;
  const link = imageInput.value;
  const card = createCard({ name, link });
  cardsList.prepend(card);

  closePopup(addCardPopup);
  evt.target.reset();
  //const submitButton = addCardPopup.querySelector(".modal__button");
  addFormValidator.disableButton();
}
addCardPopupForm.addEventListener("submit", handleCardFormSubmit);

// -----------------VALIDATION-------------------------------------------
const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "popup__error_visible",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileFormElement
);
const addFormValidator = new FormValidator(
  validationSettings,
  addCardPopupForm
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

pictureButtonReset.addEventListener("click", () => closePopup(picturePopup));
// -------------adds initial cards to the page---------------------------------------------

const cardsList = document.querySelector(".cards__list");
//initialCards.forEach((item) => {
//const card = new Card(item, ".template");
//cardsList.prepend(card.getView());
//});

const createCard = (cardData) => {
  const card = new Card(cardData, ".template");
  return card.getView();
};

initialCards.forEach((item) => {
  cardsList.prepend(createCard(item));
});

// const createCard = (cardData) => {
//    const card = new Card(cardData, ".template");
//    return card.getView();
//  }

const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("click", closePopupByOverlayClick);
});
