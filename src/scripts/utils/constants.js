const profile = document.querySelector('.profile');
export const profileEditBtn = profile.querySelector('.profile__edit-btn');
export const cardAddBtn = profile.querySelector('.profile__add-btn');
export const avatarEditElement = profile.querySelector('.profile__avatar-wrapper');

const profileEditWindow = document.querySelector('.popup_type_profile-edit');
export const profileEditForm = profileEditWindow.querySelector('.popup__form');

const cardAddWindow = document.querySelector('.popup_type_card-add');
export const cardAddForm = cardAddWindow.querySelector('.popup__form');

const avatarEditWindow = document.querySelector('.popup_type_avatar-edit');
export const avatarEditForm = avatarEditWindow.querySelector('.popup__form');

export const validatorConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error'
};
