
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

  setUserInfo(evt) {
    const profileName = document.querySelector(".profile__title");
    const profileJob = document.querySelector(".profile__description");
    evt.preventDefault();
    profileName.textContent = this._name.value;
    profileJob.textContent = this._job.value;
  }
}
