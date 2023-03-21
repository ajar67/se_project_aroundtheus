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

export const profileEditButton = document.querySelector(
  ".profile__edit-button"
);
export const profilePopup = document.querySelector("#profile-popup");
export const profileFormElement = profilePopup.querySelector(".modal__form");
export const profileButtonReset = profilePopup.querySelector(
  ".modal__button-reset"
);
export const nameInput = document.querySelector("#name");
export const jobInput = document.querySelector("#description");
export const profileName = document.querySelector(".profile__title");
export const profileJob = document.querySelector(".profile__description");
export const profileAddButton = document.querySelector(".profile__add-button");

export const addCardPopup = document.querySelector("#add-card-popup");
export const addCardPopupResetButton = addCardPopup.querySelector(
  ".modal__button-reset"
);
export const addCardPopupForm = addCardPopup.querySelector(".modal__form");
export const titleInput = document.querySelector("#title");
export const imageInput = document.querySelector("#image");

export const picturePopup = document.querySelector("#picture-popup");

