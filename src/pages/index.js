import './index.css';

import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import {
  profileEditBtn,
  profileEditForm,
  cardAddBtn,
  cardAddForm,
  initialCards,
  validatorConfig
 } from '../scripts/utils/constants.js';

 function createCard(item) {
  const newCard = new Card(
    item,
    '#card-template',
    () => {
      cardViewPopup.open({
        name: item.name,
        link: item.link
      });
    });
    
  return newCard.renderCard();
 }

const userFormValidator = new FormValidator(validatorConfig, profileEditForm);
const cardFormValidator = new FormValidator(validatorConfig, cardAddForm);

const cardViewPopup = new PopupWithImage('.popup_type_card-view');

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCardElement = createCard(item);

    cardsList.addItem(newCardElement);
  }
}, '.cards__list');

const cardAddPopup = new PopupWithForm({
  formSubmitter: (formData) => {
    const newCardElement = createCard({name: formData.cardName, link: formData.cardUrl});

    cardsList.addItem(newCardElement);
    cardAddPopup.close();
  },
  popupSelector: '.popup_type_card-add'
});

const profileEditPopup = new PopupWithForm({
  formSubmitter: (formData) => {
    userInfo.setUserInfo(formData.userName, formData.userBio);
    profileEditPopup.close()
  },
  popupSelector: '.popup_type_profile-edit'
});

const userInfo = new UserInfo({
  usernameSelector: '.profile__username',
  userbioSelector: '.profile__userbio'
})

profileEditBtn.addEventListener('click', () => {
  const currentProfile = userInfo.getUserInfo();

  profileEditPopup._form.userName.value = currentProfile.username;
  profileEditPopup._form.userBio.value = currentProfile.userbio
  userFormValidator.resetValidation();
  profileEditPopup.open();
});

cardAddBtn.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  cardAddPopup.open();
});

userFormValidator.enableValidation();
cardFormValidator.enableValidation();

cardsList.renderItems();

cardViewPopup.setEventListeners();
cardAddPopup.setEventListeners();
profileEditPopup.setEventListeners();
