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

let profileEditButton = document.querySelector(".profile__edit-button");
let modalButtonReset = document.querySelector(".modal__button-reset");
let modal = document.querySelector(".modal");

const profileFormElement = document.querySelector(".modal__form");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const cardTemplate = document
  .querySelector(".template")
  .content.querySelector("card");

function editClick() {
  modal.style.removeProperty("display");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function resetClick() {
  modal.setAttribute("style", "display: none;");
}

profileEditButton.addEventListener("click", editClick);
modalButtonReset.addEventListener("click", resetClick);

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
}

modal.addEventListener("submit", handleProfileFormSubmit);

function getCardElement(data) {
  let cardElement = cardTemplate.cloneNode(true);
  let cardText = document.querySelector(".card__text");
  let cardImage = document.querySelector(".card__image");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardText.textContent = data.name;
  return cardElement;
}

for (let i = 0; i <= initialCards.length; i++) {
  getCardElement(data);
}
