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
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";

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

const createCard = (cardData) => {
  const card = new Card(cardData, ".template", (data) => {
    newPopupImage.open(data);
  });
  return card.getView();
};

const newCardSection = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
);
newCardSection.renderItems();

const newProfilePopup = new PopupWithForm("#profile-popup", (inputValues) => {
  newUserInfo.setUserInfo(inputValues.name, inputValues.description);
  editFormValidator.disableButton();
});

const newCardPopup = new PopupWithForm("#add-card-popup", (inputValues) => {
  const card = createCard({ name: inputValues.title, link: inputValues.image });
  newCardSection.addItem(card);
});
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const newDeletePopup = new PopupWithForm("#delete-card", () => {});
newDeletePopup.setEventListeners();
newDeletePopup.open();

const newProfilePicture = new PopupWithForm(
  "#change-profile-picture",
  (inputValue) => {}
);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const newUserInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

newCardPopup.setEventListeners();
newProfilePopup.setEventListeners();

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
///////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

// ------------------------- API ------------------------------------------
//profileImage.addEventListener
