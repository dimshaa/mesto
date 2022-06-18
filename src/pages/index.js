import './index.css';

import Api from '../scripts/components/Api.js';
import Card from '../scripts/components/Card.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithConfirmation from '../scripts/components/PopupWithConfirmation.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import {
  profileEditBtn,
  profileEditForm,
  avatarEditElement,
  avatarEditForm,
  cardAddBtn,
  cardAddForm,
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
      })
    },
    () => {
      cardDeletePopup.open(newCard);
    },
    () => {
      api.likeCard(newCard.getCardId(), newCard.hasLike())
      .then(res => newCard.showLikes(res.likes))
      .catch(err => console.log(err));
    },
    userInfo.getUserId(),
    );

  return newCard.renderCard();
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1',
  cohortId: 'cohort-43',
  token: 'c4f0f8b8-a52c-4e71-bc8a-938ca58bb704'
});

const cardsList = new Section({
  renderer: (item) => {
    const newCardElement = createCard(item);

    cardsList.addItem(newCardElement);
  }
}, '.cards__list');

const userInfo = new UserInfo({
  usernameSelector: '.profile__username',
  userbioSelector: '.profile__userbio',
  avatarSelector: '.profile__avatar',
});

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData)
    cardsList.renderItems(cards.reverse());
  })
  .catch(err => console.log(err));

const userFormValidator = new FormValidator(validatorConfig, profileEditForm);
const cardFormValidator = new FormValidator(validatorConfig, cardAddForm);
const avatarFormValidator = new FormValidator(validatorConfig, avatarEditForm);

const cardViewPopup = new PopupWithImage('.popup_type_card-view');

const cardAddPopup = new PopupWithForm({
  formSubmitter: (formData) => {
    cardAddPopup.renderButtonText('Сохранение...');
    api.uploadCard({ name: formData.cardName, link: formData.cardUrl })
      .then((card) => {
        const newCardElement = createCard(card);
        cardsList.addItem(newCardElement);
      })
      .then(() => cardAddPopup.close())
      .catch(err => console.log(err))
      .finally(() => cardAddPopup.renderButtonText('Сохранить'));
  },
  popupSelector: '.popup_type_card-add'
});

const cardDeletePopup = new PopupWithConfirmation({
  deleteFunction: (card) => {
    cardDeletePopup.renderButtonText('Удаление...');
    api.deleteCard(card.getCardId())
      .then(() => card.deleteCard())
      .then(() => cardDeletePopup.close())
      .catch(err => console.log(err))
      .finally(() => cardDeletePopup.renderButtonText('Да'));
  },
  popupSelector: '.popup_type_confirm'
})

const profileEditPopup = new PopupWithForm({
  formSubmitter: (formData) => {
    profileEditPopup.renderButtonText('Сохранение...');
    api.setUserInfo({ name: formData.userName, about: formData.userBio })
      .then((data) => userInfo.setUserInfo(data))
      .then(() => profileEditPopup.close())
      .catch((err) => console.log(err))
      .finally(() => profileEditPopup.renderButtonText('Сохранить'));
  },
  popupSelector: '.popup_type_profile-edit'
});

const avatarEditPopup = new PopupWithForm({
  formSubmitter: (formData) => {
    avatarEditPopup.renderButtonText('Сохранение...')
    api.changeAvatar({ avatar: formData.avatarUrl })
      .then((data) => userInfo.setUserInfo(data))
      .then(() => avatarEditPopup.close())
      .catch((err) => console.log(err))
      .finally(() => avatarEditPopup.renderButtonText('Сохранить'));

  },
  popupSelector: '.popup_type_avatar-edit'
}) 

profileEditBtn.addEventListener('click', () => {
  const currentProfile = userInfo.getUserInfo();

  profileEditForm.userName.value = currentProfile.username;
  profileEditForm.userBio.value = currentProfile.userbio
  userFormValidator.resetValidation();
  profileEditPopup.open();
});

avatarEditElement.addEventListener('click',() => {
  avatarFormValidator.resetValidation();
  avatarEditPopup.open();
});

cardAddBtn.addEventListener('click', () => {
  cardFormValidator.resetValidation();
  cardAddPopup.open();
});

userFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

cardViewPopup.setEventListeners();
cardAddPopup.setEventListeners();
profileEditPopup.setEventListeners();
cardDeletePopup.setEventListeners();
avatarEditPopup.setEventListeners();
