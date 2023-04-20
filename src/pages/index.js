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

let newCardSection;

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

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12/",
  authorizationID: "3d5d45c7-6b7d-40fa-b3ac-6d464d71f592",
});

let userId = "";

api.getUserInformation().then((res) => {
  profileTitle.textContent = res.name;
  profileDescription.textContent = res.about;
  profileImage.src = res.avatar;
  userId = res._id;
});

const handleDeleteClick = (card) => {
  newDeletePopup.setSubmitAction(() => {
    api.deleteCard(card.id).then(() => {
      newDeletePopup.close();
      card.removeCard();
    });
  });
  newDeletePopup.open();
};

const handleLikeButton = (card) => {
  if (card.isLiked(userId)) {
    api.removingLikes(card.id).then((res) => {
      card.updateLikes(res.likes);
    });
    card.unlike();
  } else {
    api.addingLikes(card.id).then((res) => {
      card.updateLikes(res.likes);
    });
    card.like();
  }
};

const createCard = (cardData) => {
  const card = new Card(
    cardData,
    userId,
    cardData.owner._id === userId,
    ".template",
    (data) => {
      newPopupImage.open(data);
    },
    handleDeleteClick,
    handleLikeButton
  );
  return card.getView();
};

const newProfilePopup = new PopupWithForm("#profile-popup", (inputValues) => {
  api
    .editProfile({ name: inputValues.name, about: inputValues.description })
    .then((res) => {
      newUserInfo.setUserInfo(res.name, res.about);
      editFormValidator.disableButton();
    });
});

const newCardPopup = new PopupWithForm("#add-card-popup", (inputValues) => {
  api
    .addNewCard({ name: inputValues.title, link: inputValues.image })
    .then((res) => {
      const card = createCard({ name: res.name, link: res.link });
      newCardSection.addItem(card);
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const newProfilePicture = new PopupWithForm(
  "#change-profile-pic",
  (inputValue) => {
    api.updateProfPic(inputValue.image).then((res) => {
      changePicValidator.disableButton();
      newUserInfo.setAvatar(res.avatar);
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

api.getInitialCards().then((cards) => {
  newCardSection = new Section(
    {
      items: cards,
      renderer: (item) => createCard(item, item.owner._id === userId),
    },
    ".cards__list"
  );

  newCardSection.renderItems();
});

/*
cardLikeNumber.textContent = res.likes.length
*/
