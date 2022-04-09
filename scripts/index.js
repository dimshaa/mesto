const profile = document.querySelector('.profile');
const profileEditBtn = profile.querySelector('.profile__edit-btn');
const profileUsername = profile.querySelector('.profile__username');
const profileUserbio = profile.querySelector('.profile__userbio');

const editWindow = document.querySelector('.popup');
const editWindowCloseBtn = editWindow.querySelector('.popup__close-btn');
const formElement = editWindow.querySelector('.popup__container');
const formInputUsername = editWindow.querySelector('.popup__input_type_username');
const formInputUserbio = editWindow.querySelector('.popup__input_type_userbio');

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

   return cardElement;
}

function openEditWindow() {
  editWindow.classList.add('popup_opened');
  formInputUsername.value = profileUsername.textContent;
  formInputUserbio.value = profileUserbio.textContent;
}

function closeEditWindow() {
  editWindow.classList.remove('popup_opened');
}

function formSubmitHandler(event) {
  event.preventDefault();
  profileUsername.textContent = formInputUsername.value;
  profileUserbio.textContent = formInputUserbio.value;
  closeEditWindow();
}

profileEditBtn.addEventListener('click', openEditWindow);
editWindowCloseBtn.addEventListener('click', closeEditWindow);
formElement.addEventListener('submit', formSubmitHandler);

setInitialCards();
