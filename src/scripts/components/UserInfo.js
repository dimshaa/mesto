export default class UserInfo {
  constructor({ usernameSelector, userbioSelector, avatarSelector }) {
    this._username = document.querySelector(usernameSelector);
    this._userbio = document.querySelector(userbioSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this._user = {};
    this._user.username = this._username.textContent;
    this._user.userbio = this._userbio.textContent;
    this._user.avatar = this._avatar.src;

    return this._user;
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._username.textContent = name;
    this._userbio.textContent = about;
    this._avatar.src = avatar;
    this._id = _id;
  }

  getUserId() {
    return this._id;
  }
}
