const profile = document.querySelector('.profile');
const profileEditBtn = profile.querySelector('.profile__edit-btn');
const profileUsername = profile.querySelector('.profile__username');
const profileUserbio = profile.querySelector('.profile__userbio');

const cardAddBtn = profile.querySelector('.profile__add-btn');

const profileEditWindow = document.querySelector('.popup_type_profile-edit');
const cardAddWindow = document.querySelector('.popup_type_card-add');

const windowCloseBtns = document.querySelectorAll('.popup__close-btn');
const formUserElement = profileEditWindow.querySelector('.popup__container');
const formCardElement = cardAddWindow.querySelector('.popup__container');
const formInputUsername = profileEditWindow.querySelector('.popup__input_type_username');
const formInputUserbio = profileEditWindow.querySelector('.popup__input_type_userbio');
const formInputCardName = cardAddWindow.querySelector('.popup__input_type_card-name');
const formInputCardUrl = cardAddWindow.querySelector('.popup__input_type_card-url');

const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('.cards__list');


function setInitialCards() {
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

  const cardsToAdd = initialCards.map(renderCard);
  cardsList.append(...cardsToAdd);
}

function renderCard(element) {
   const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
   const cardCaption = cardElement.querySelector('.card__caption');
   const cardImage = cardElement.querySelector('.card__image');
   const cardLikeBtn = cardElement.querySelector('.card__like-btn');

   cardCaption.textContent = element.name;
   cardImage.setAttribute('src', element.link);

   cardLikeBtn.addEventListener('click', function (event) {
     event.target.classList.toggle('card__like-btn_active');
   })

   return cardElement;
}

function openWindow(element) {
  element.classList.add('popup_opened');
}

function closeWindow(element) {
  const activeWindow = element.target.closest('.popup_opened');
  activeWindow.classList.remove('popup_opened');
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
  closeWindow(event);
}

function cardSubmitHandler(event) {
  event.preventDefault();
  const newCard = renderCard({name: formInputCardName.value, link: formInputCardUrl.value});
  cardsList.prepend(newCard);
  closeWindow(event);
}

profileEditBtn.addEventListener('click', profileEditHandler);
cardAddBtn.addEventListener('click', cardAddHandler);
windowCloseBtns.forEach((btns) => btns.addEventListener('click', closeWindow));
formUserElement.addEventListener('submit', userSubmitHandler);
formCardElement.addEventListener('submit', cardSubmitHandler);

setInitialCards();
