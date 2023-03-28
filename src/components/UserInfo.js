export default class UserInfo {
  constructor({ name, job }) {
    this._nameElement = name;
    this._jobElement = job;
  }

  getUserInfo() {
    const userData = {
      name: this._nameElement.textContent,
      description: this._jobElement.textContent,
    };
    return userData;
  }

  setUserInfo(name, job) {
    const profileName = document.querySelector(".profile__title");
    const profileJob = document.querySelector(".profile__description");
    profileName.textContent = name;
    profileJob.textContent = job;
  }
}
