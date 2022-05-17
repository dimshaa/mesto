import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

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

const cardsList = document.querySelector('.cards__list');

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

function setCard(card, cardTemplate) {
  const newCard = new Card(card, cardTemplate).renderCard();
  
  return newCard;
}

function setInitialCards(cards) {
  cards.forEach((card) => {
    cardsList.append(setCard(card, '#card-template'));
  });
}

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

function profileEditHandler() {
  formInputUsername.value = profileUsername.textContent;
  formInputUserbio.value = profileUserbio.textContent;
  userFormValidator.resetForm();
  openWindow(profileEditWindow);
}

function cardAddHandler() {
  formCardElement.reset();
  cardFormValidator.resetForm();
  openWindow(cardAddWindow);
}

function userSubmitHandler(event) {
  event.preventDefault();
  profileUsername.textContent = formInputUsername.value;
  profileUserbio.textContent = formInputUserbio.value;
  closeWindow(profileEditWindow);
}

function cardSubmitHandler(event) {
  event.preventDefault();

  cardsList.prepend(setCard({name: formInputCardName.value, link: formInputCardUrl.value}, '#card-template'));
  closeWindow(cardAddWindow);
}

profileEditBtn.addEventListener('click', profileEditHandler);
cardAddBtn.addEventListener('click', cardAddHandler);
formUserElement.addEventListener('submit', userSubmitHandler);
formCardElement.addEventListener('submit', cardSubmitHandler);
popupWindows.forEach((popup) => {
  popup.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup__close-btn') || (event.target === event.currentTarget)) {
      closeWindow(popup);
    }
  });
});

userFormValidator.enableValidation();
cardFormValidator.enableValidation();

setInitialCards(initialCards);
