import { openWindow } from '../scripts/index.js';

const cardViewWindow = document.querySelector('.popup_type_card-view');
const imageToShow = document.querySelector('.popup__card-image');
const captionToShow = document.querySelector('.popup__card-caption');

export class Card {
  constructor(cardData, cardTemplate) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardTemplate = cardTemplate;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardTemplate).content.querySelector('.card').cloneNode(true);

    return cardElement;
  }

  renderCard() {
    this._card = this._getTemplate();
  
    this._cardCaption = this._card.querySelector('.card__caption');
    this._cardImage = this._card.querySelector('.card__image');
    this._cardLikeBtn = this._card.querySelector('.card__like-btn');
    this._cardDeleteBtn = this._card.querySelector('.card__delete-btn');
    
    this._cardCaption.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    this._setEventListeners();

    return this._card;
  }

  _likeCard() {
    this._cardLikeBtn.classList.toggle('card__like-btn_active');
  }

  _deleteCard() {
    this._card.remove();
  }

  _showImage() {
    imageToShow.src = this._link;
    imageToShow.alt = this._name;
    captionToShow.textContent = this._name;

    openWindow(cardViewWindow);   
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._showImage();
    });
    this._cardLikeBtn.addEventListener('click', () => {
      this._likeCard();
    });
    this._cardDeleteBtn.addEventListener('click', () => {
      this._deleteCard();
    });
  }
}
