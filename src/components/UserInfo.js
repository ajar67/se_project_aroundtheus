import {
  profileJob,
  profileName,
  nameInput,
  jobInput,
} from "../utils/constants";

export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    const profileInputs = document
      .querySelector("#profile-popup")
      .content.querySelector(".modal__input");
    const profileInputsObject = {};
    profileInputs.forEach((input) => {
      profileInputsObject[input.name] = input.value;
    });
    return profileInputsObject;
  }

  setUserInfo() {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
  }
}
