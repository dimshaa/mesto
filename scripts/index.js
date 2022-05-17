import { Card } from './Card.js';

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
const cardSubmitBtn =  cardAddWindow.querySelector('.popup__submit-btn');

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
  resetInputsError();
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
  openWindow(profileEditWindow);
}

function cardAddHandler() {
  formCardElement.reset();
  deactivateCardSubmit(cardSubmitBtn, formCardElement);
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

function resetInputsError() {
  const errorMessages = document.querySelectorAll('.popup__input-error');
  const inputs = document.querySelectorAll('.popup__input');

  errorMessages.forEach((msg) => msg.textContent = '');
  inputs.forEach((input) => input.classList.remove('popup__input_type_error'));
}

function deactivateCardSubmit(submitButtton, formElement) {
  submitButtton.disabled = !formElement.checkValidity();
  submitButtton.classList.add('popup__submit-btn_disabled');
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

setInitialCards(initialCards);
