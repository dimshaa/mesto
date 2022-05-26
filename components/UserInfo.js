export default class UserInfo {
  constructor({ usernameSelector, userbioSelector }) {
    this._username = document.querySelector(usernameSelector);
    this._userbio = document.querySelector(userbioSelector);
  }

  getUserInfo() {
    this._user = {};
    this._user.username = this._username.textContent;
    this._user.userbio = this._userbio.textContent;

    return this._user;
  }

  setUserInfo(name, bio) {
    this._username.textContent = name;
    this._userbio.textContent = bio;
  }
}
