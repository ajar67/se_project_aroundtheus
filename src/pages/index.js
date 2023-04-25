import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import {
  initialCards,
  profileEditButton,
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
import Api from "../utils/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

let cardSection;

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

const popupImage = new PopupWithImage({ popupSelector: "#picture-popup" });
popupImage.setEventListeners();

const deletePopup = new PopupWithConfirmation("#delete-card", {
  buttonText: "Yes",
  loadingButtonText: "Deleting...",
});
deletePopup.setEventListeners();

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12/",
  authorizationID: "3d5d45c7-6b7d-40fa-b3ac-6d464d71f592",
});

let userId;

Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([user, cards]) => {
    userInfo.setUserInfo(user.name, user.about);
    userInfo.setAvatar(user.avatar);
    userId = user._id;
    // initialize cards section
    cardSection = new Section(
      {
        items: cards,
        renderer: (item) => createCard(item, item.owner._id === userId),
      },
      ".cards__list"
    );

    cardSection.renderItems();
  })
  .catch((err) => console.log(err));

const handleDeleteClick = (card) => {
  deletePopup.setSubmitAction(() => {
    deletePopup.showLoading();
    api
      .deleteCard(card.id)
      .then(() => {
        deletePopup.close();
        card.removeCard();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        deletePopup.hideLoading();
      });
  });
  deletePopup.open();
};

const handleLikeButton = (card) => {
  if (card.isLiked()) {
    api
      .removeLike(card.id)
      .then((res) => {
        card.updateLikes(res.likes);
      })
      .catch((err) => console.log(err));
  } else {
    api
      .addLike(card.id)
      .then((res) => {
        card.updateLikes(res.likes);
      })
      .catch((err) => console.log(err));
  }
};

const createCard = (cardData) => {
  const card = new Card(
    cardData,
    userId,
    cardData.owner._id === userId,
    ".template",
    (data) => {
      popupImage.open(data);
    },
    handleDeleteClick,
    handleLikeButton
  );
  return card.getView();
};

const profilePopup = new PopupWithForm("#profile-popup", {
  handleSubmit: (inputValues) => {
    profilePopup.showLoading();
    api
      .editProfile({ name: inputValues.name, about: inputValues.description })
      .then((res) => {
        userInfo.setUserInfo(res.name, res.about);
        profilePopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        profilePopup.hideLoading();
      });
  },
  buttonText: "Save",
  loadingButtonText: "Saving..",
});

const cardPopup = new PopupWithForm("#add-card-popup", {
  handleSubmit: (inputValues) => {
    cardPopup.showLoading();
    api
      .addNewCard({ name: inputValues.title, link: inputValues.image })
      .then((res) => {
        const card = createCard(res);
        cardSection.addItem(card);
        cardPopup.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        cardPopup.hideLoading();
      });
  },
  buttonText: "Create",
  loadingButtonText: "Creating...",
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const profilePicture = new PopupWithForm("#change-profile-pic", {
  handleSubmit: (inputValue) => {
    profilePicture.showLoading();
    api
      .updateProfPic(inputValue.image)
      .then((res) => {
        //changePicValidator.disableButton();
        userInfo.setAvatar(res.avatar);
        profilePicture.close();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        profilePicture.hideLoading();
      });
  },
  buttonText: "Save",
  loadingButtonText: "Saving..",
});

profileImageButton.addEventListener("click", () => {
  changePicValidator.disableButton();
  profilePicture.open();
});

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

cardPopup.setEventListeners();
profilePopup.setEventListeners();
profilePicture.setEventListeners();

profileAddButton.addEventListener("click", () => {
  cardPopup.open();
  addFormValidator.disableButton();
});
profileEditButton.addEventListener("click", () => {
  editFormValidator.disableButton();
  profilePopup.open();
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.description;
});
