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

api.getInitialCards()
  .then((data) => {
    cardsList.renderItems(data.reverse());
  })
  .catch(err => console.log(err));

api.getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data)
  })

const userFormValidator = new FormValidator(validatorConfig, profileEditForm);
const cardFormValidator = new FormValidator(validatorConfig, cardAddForm);

const cardViewPopup = new PopupWithImage('.popup_type_card-view');

const cardAddPopup = new PopupWithForm({
  formSubmitter: (formData) => {
    api.uploadCard({ name: formData.cardName, link: formData.cardUrl })
      .then((card) => {
        const newCardElement = createCard(card);
        cardsList.addItem(newCardElement);
      })

    cardAddPopup.close();
  },
  popupSelector: '.popup_type_card-add'
});

const cardDeletePopup = new PopupWithConfirmation({
  deleteFunction: (card) => {
    api.deleteCard(card.getCardId())
      .then(() => {
        card.deleteCard();
      })

      cardDeletePopup.close();
  },
  popupSelector: '.popup_type_confirm'
})

cardDeletePopup.setEventListeners();

const profileEditPopup = new PopupWithForm({
  formSubmitter: (formData) => {
    api.setUserInfo({ name: formData.userName, about: formData.userBio })
      .then((data) => userInfo.setUserInfo(data))
      .catch((err) => console.log(err));
    profileEditPopup.close()
  },
  popupSelector: '.popup_type_profile-edit'
});

const userInfo = new UserInfo({
  usernameSelector: '.profile__username',
  userbioSelector: '.profile__userbio',
  avatarSelector: '.profile__avatar',
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


cardViewPopup.setEventListeners();
cardAddPopup.setEventListeners();
profileEditPopup.setEventListeners();
