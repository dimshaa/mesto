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

const cardViewWindow = document.querySelector('.popup_type_card-view');
const imageToShow = document.querySelector('.popup__card-image');
const captionToShow = document.querySelector('.popup__card-caption');

const popupWindows = document.querySelectorAll('.popup');

const cardTemplate = document.querySelector('#card-template').content;
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

function setInitialCards() {
  const cardsToAdd = initialCards.map(renderCard);
  cardsList.append(...cardsToAdd);
}

function renderCard(element) {
   const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
   const cardCaption = cardElement.querySelector('.card__caption');
   const cardImage = cardElement.querySelector('.card__image');
   const cardLikeBtn = cardElement.querySelector('.card__like-btn');
   const cardDeleteBtn = cardElement.querySelector('.card__delete-btn');

   cardCaption.textContent = element.name;
   cardImage.src = element.link;
   cardImage.alt = element.name;

   cardImage.addEventListener('click', function (event) {
     imageToShow.src = cardImage.src;
     imageToShow.alt = cardImage.alt;
     captionToShow.textContent = cardCaption.textContent;
     openWindow(cardViewWindow);
   })

   cardLikeBtn.addEventListener('click', function (event) {
     event.target.classList.toggle('card__like-btn_active');
   })

   cardDeleteBtn.addEventListener('click', function (event) {
     event.target.closest('.card').remove();
   })

   return cardElement;
}

function openWindow(element) {
  element.classList.add('popup_opened');
  window.addEventListener('keydown', handleEscKey);
}

function closeWindow(element) {
  element.classList.remove('popup_opened');
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
  formInputCardName.value = '';
  formInputCardUrl.value = '';
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
  const newCard = renderCard({name: formInputCardName.value, link: formInputCardUrl.value});
  cardsList.prepend(newCard);
  closeWindow(cardAddWindow);
}

function resetInputsError() {
  const errorMessages = document.querySelectorAll('.popup__input-error');
  const inputs = document.querySelectorAll('.popup__input');

  errorMessages.forEach((msg) => msg.textContent = '');
  inputs.forEach((input) => input.classList.remove('popup__input_type_error'));
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

setInitialCards();
