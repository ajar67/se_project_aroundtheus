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
const modalButtonReset = document.querySelector(".modal__button-reset");
const modal = document.querySelector(".modal");

const profileFormElement = document.querySelector(".modal__form");
const nameInput = document.querySelector("#name");
const jobInput = document.querySelector("#description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const cardTemplate = document
  .querySelector(".template")
  .content.querySelector(".card");

const profileAddButton = document.querySelector(".profile__add-button");
const formButtonReset = document.querySelector(".form__button-reset");
const form = document.querySelector(".form");
const profileFormStructure = document.querySelector(".form__structure");
const titleInput = document.querySelector("#title");
const imageInput = document.querySelector("#image");
const cardText = document.querySelector(".card__text");

function openProfileModal() {
  modal.classList.add("modal_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
function closeModal() {
  modal.classList.remove("modal_opened");
}
profileEditButton.addEventListener("click", openProfileModal);
modalButtonReset.addEventListener("click", closeModal);

function handleProfileModalSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal();
}
modal.addEventListener("submit", handleProfileModalSubmit);

function openProfileForm() {
  form.classList.add("form_opened");
}
function closeForm() {
  form.classList.remove("form_opened");
}
profileAddButton.addEventListener("click", openProfileForm);
formButtonReset.addEventListener("click", closeForm);

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  cardsList.prepend(
    getCardElement({ link: imageInput.value, name: titleInput.value })
  );
  closeForm();
}
form.addEventListener("submit", handleCardFormSubmit);

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardText = cardElement.querySelector(".card__text");
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardTrashButton = cardElement.querySelector(".card__trash-button");

  const picture = document.querySelector(".picture");
  const pictureButtonReset = document.querySelector(".picture__button-reset");
  const pictureImageClicked = document.querySelector(".picture__image_closed");
  const pictureImageText = document.querySelector(".picture__image_text");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardText.textContent = data.name;
  cardLikeButton.addEventListener("click", function () {
    cardLikeButton.classList.toggle("card__like-button_active");
  });

  cardTrashButton.addEventListener("click", function () {
    cardElement.remove();
  });

  cardImage.addEventListener("click", function () {
    picture.classList.add("picture_opened");
    pictureImageClicked.src = data.link;
    pictureImageText.textContent = data.name;
  });
  pictureButtonReset.addEventListener("click", function () {
    picture.classList.remove("picture_opened");
  });

  return cardElement;
}

const cardsList = document.querySelector(".cards__list");
initialCards.forEach(function (item) {
  cardsList.prepend(getCardElement(item));
});
