import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';

const profile = document.querySelector('.profile');
const profileUsername = profile.querySelector('.profile__username');
const profileUserbio = profile.querySelector('.profile__userbio');
const profileEditBtn = profile.querySelector('.profile__edit-btn');
const cardAddBtn = profile.querySelector('.profile__add-btn');

const profileEditWindow = document.querySelector('.popup_type_profile-edit');
const formUserElement = profileEditWindow.querySelector('.popup__form');
const formInputUsername = profileEditWindow.querySelector('.popup__input_type_username');
const formInputUserbio = profileEditWindow.querySelector('.popup__input_type_userbio');

const cardAddWindow = document.querySelector('.popup_type_card-add');
const formCardElement = cardAddWindow.querySelector('.popup__form');
const formInputCardName = cardAddWindow.querySelector('.popup__input_type_card-name');
const formInputCardUrl = cardAddWindow.querySelector('.popup__input_type_card-url');

const popupWindows = document.querySelectorAll('.popup');



const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const validatorConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error'
};

const userFormValidator = new FormValidator(validatorConfig, formUserElement);
const cardFormValidator = new FormValidator(validatorConfig, formCardElement);

const cardsList = new Section({
  items: initialCards,
  renderer: (item) => {
    const newCard = new Card(item, '#card-template');
    const newCardElement = newCard.renderCard();

    cardsList.addItem(newCardElement);
  }
}, '.cards__list');

export function openWindow(popupElement) {
  popupElement.classList.add('popup_opened');
  window.addEventListener('keydown', handleEscKey);
}

function closeWindow(popupElement) {
  popupElement.classList.remove('popup_opened');
  window.removeEventListener('keydown', handleEscKey);
}

function handleEscKey(event) {
  if (event.key === 'Escape') {
    const popupToClose = document.querySelector('.popup_opened');
    closeWindow(popupToClose);
  }
}

function openProfileEditForm() {
  formInputUsername.value = profileUsername.textContent;
  formInputUserbio.value = profileUserbio.textContent;
  userFormValidator.resetValidation();
  openWindow(profileEditWindow);
}

function openCardAddForm() {
  formCardElement.reset();
  cardFormValidator.resetValidation();
  openWindow(cardAddWindow);
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileUsername.textContent = formInputUsername.value;
  profileUserbio.textContent = formInputUserbio.value;
  closeWindow(profileEditWindow);
}

function handleCardFormSubmit(event) {
  event.preventDefault();
  const newCard = new Card({
    name: formInputCardName.value,
    link: formInputCardUrl.value
  }, '#card-template');
  const newCardElement = newCard.renderCard();

  cardsList.addItem(newCardElement);
  closeWindow(cardAddWindow);
}

profileEditBtn.addEventListener('click', openProfileEditForm);
cardAddBtn.addEventListener('click', openCardAddForm);
formUserElement.addEventListener('submit', handleProfileFormSubmit);
formCardElement.addEventListener('submit', handleCardFormSubmit);
popupWindows.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup__close-btn') || (event.target === event.currentTarget)) {
      closeWindow(popup);
    }
  });
});

userFormValidator.enableValidation();
cardFormValidator.enableValidation();
cardsList.renderItems();
