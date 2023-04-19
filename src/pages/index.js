import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import {
  initialCards,
  profileEditButton,
  profilePopup,
  profileFormElement,
  profileImage,
  profileButtonReset,
  profileName,
  profileJob,
  profileAddButton,
  addCardPopup,
  addCardPopupResetButton,
  addCardPopupForm,
  picturePopup,
  nameInput,
  jobInput,
  cardsList,
  validationSettings,
  trashButton,
  profileImageButton,
  profileTitle,
  profileDescription,
  cardLikeNumber,
  changePicForm,
  deleteCardForm,
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";

const editFormValidator = new FormValidator(
  validationSettings,
  profileFormElement
);
const addFormValidator = new FormValidator(
  validationSettings,
  addCardPopupForm
);

const changePicValidator = new FormValidator(validationSettings, changePicForm);

const deleteCardValidator = new FormValidator(
  validationSettings,
  deleteCardForm
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
changePicValidator.enableValidation();
deleteCardValidator.enableValidation();

/*const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(formElement, config);
    const formName = formElement.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);


formValidators[ profileForm.getAttribute('name') ].resetValidation();
formValidators['profile-form'].resetValidation();*/

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------

const newPopupImage = new PopupWithImage({ popupSelector: "#picture-popup" });
newPopupImage.setEventListeners();

const newDeletePopup = new PopupWithForm("#delete-card", () => {});
newDeletePopup.setEventListeners();

const handleDeleteClick = (card) => {
  newDeletePopup.setSubmitAction(() => {
    api.deleteCard(card.id).then((res) => {
      console.log(res);
      newDeletePopup.close();
    });
  });
  newDeletePopup.open();
};

const createCard = (cardData) => {
  const card = new Card(
    cardData,
    ".template",
    (data) => {
      newPopupImage.open(data);
    },
    handleDeleteClick
  );
  return card.getView();
};

// const newCardSection = new Section(
//   { items: initialCards, renderer: createCard },
//   ".cards__list"
// );
//newCardSection.renderItems();

const newProfilePopup = new PopupWithForm("#profile-popup", (inputValues) => {
  newUserInfo.setUserInfo(inputValues.name, inputValues.description);
  editFormValidator.disableButton();
  api
    .editProfile({ name: inputValues.name, about: inputValues.description }) // It doesn't show that it is doing this in the browser
    .then((res) => {
      console.log(res);
    });
});

const newCardPopup = new PopupWithForm("#add-card-popup", (inputValues) => {
  const card = createCard({ name: inputValues.title, link: inputValues.image });
  newCardSection.addItem(card);
  api
    .addNewCard({ name: inputValues.title, link: inputValues.image }) // same thing doesn't show that it is getting to the server
    .then((res) => {
      console.log(res);
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const newProfilePicture = new PopupWithForm(
  "#change-profile-pic",
  (inputValue) => {
    changePicValidator.disableButton();
    newUserInfo.setAvatar(inputValue.image);
    api
      .updateProfPic(inputValue.image) // doesn't show that it is getting to the server gotta figure it out
      .then((res) => {
        console.log(res);
      });
  }
);

profileImageButton.addEventListener("click", () => {
  newProfilePicture.open();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const newUserInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

newCardPopup.setEventListeners();
newProfilePopup.setEventListeners();
newProfilePicture.setEventListeners();

profileAddButton.addEventListener("click", () => {
  newCardPopup.open();
  addFormValidator.disableButton();
});
profileEditButton.addEventListener("click", () => {
  newProfilePopup.open();
  const userData = newUserInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.description;
  addFormValidator.disableButton();
});

///////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
//API

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12/",
  authorizationID: "3d5d45c7-6b7d-40fa-b3ac-6d464d71f592",
});
api.getInitialCards().then((res) => {
  const newCardSection = new Section(
    { items: res, renderer: createCard },
    ".cards__list"
  );
  newCardSection.renderItems();
});

api.getUserInformation().then((res) => {
  profileTitle.textContent = res.name;
  profileDescription.textContent = res.about;
  profileImage.src = res.avatar;
});
