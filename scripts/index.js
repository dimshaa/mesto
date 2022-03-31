let profile = document.querySelector('.profile');
let profileEditBtn = profile.querySelector('.profile__edit-btn');
let profileUsername = profile.querySelector('.profile__username');
let profileUserbio = profile.querySelector('.profile__userbio');

let editWindow = document.querySelector('.popup');
let editWindowCloseBtn = editWindow.querySelector('.popup__close-btn');
let formElement = editWindow.querySelector('.popup__container');
let formInputUsername = editWindow.querySelector('.popup__input_type_username');
let formInputUserbio = editWindow.querySelector('.popup__input_type_userbio');


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
