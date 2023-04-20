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

const deletePopup = new PopupWithConfirmation("#delete-card", () => {});
deletePopup.setEventListeners();

const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/group-12/",
  authorizationID: "3d5d45c7-6b7d-40fa-b3ac-6d464d71f592",
});

let userId;

Promise.all([api.getUserInformation(), api.getInitialCards()])
  .then(([res, cards]) => {
    userInfo.setUserInfo(res.name, res.about);
    userInfo.setAvatar(res.avatar);
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
  .catch(() => console.log("Error"));

/*api
  .getInitialCards()
  .then((cards) => {
    cardSection = new Section(
      {
        items: cards,
        renderer: (item) => createCard(item, item.owner._id === userId),
      },
      ".cards__list"
    );

    cardSection.renderItems();
  })
  .catch((res) => {
    Promise.reject(`Error: ${res.status}`);
});
api
  .getUserInformation()
  .then((res) => {
    userInfo.setUserInfo(res.name, res.about);
    userInfo.setAvatar(res.avatar);
    // profileTitle.textContent = res.name;
    // profileDescription.textContent = res.about;
    // profileImage.src = res.avatar;
    userId = res._id;
  })
  .catch((res) => {
    Promise.reject(`Error: ${res.status}`);
});*/

const handleDeleteClick = (card) => {
  deletePopup.setSubmitAction(() => {
    deletePopup.setSubmitButtonText();
    api
      .deleteCard(card.id)
      .then(() => {
        deletePopup.close();
        card.removeCard();
      })
      .catch((res) => {
        Promise.reject(`Error: ${res.status}`);
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
      .catch((res) => {
        Promise.reject(`Error: ${res.status}`);
      });
    //card.unlike();
  } else {
    api
      .addLike(card.id)
      .then((res) => {
        card.updateLikes(res.likes);
      })
      .catch((res) => {
        Promise.reject(`Error: ${res.status}`);
      });
    //card.like();
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

const profilePopup = new PopupWithForm("#profile-popup", (inputValues) => {
  profilePopup.setSubmitButtonText();
  api
    .editProfile({ name: inputValues.name, about: inputValues.description })
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about);
      //editFormValidator.disableButton();
      profilePopup.close();
    })
    .catch((res) => {
      Promise.reject(`Error: ${res.status}`);
    });
});

const cardPopup = new PopupWithForm("#add-card-popup", (inputValues) => {
  cardPopup.setSubmitButtonText();
  api
    .addNewCard({ name: inputValues.title, link: inputValues.image })
    .then((res) => {
      const card = createCard({ name: res.name, link: res.link });
      cardSection.addItem(card);
      cardPopup.close();
    })
    .catch((res) => {
      Promise.reject(`Error: ${res.status}`);
    });
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const profilePicture = new PopupWithForm(
  "#change-profile-pic",
  (inputValue) => {
    profilePicture.setSubmitButtonText();
    api
      .updateProfPic(inputValue.image)
      .then((res) => {
        //changePicValidator.disableButton();
        userInfo.setAvatar(res.avatar);
        profilePicture.close();
      })
      .catch((res) => {
        Promise.reject(`Error: ${res.status}`);
      });
  }
);

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
  addFormValidator.disableButton();
});
