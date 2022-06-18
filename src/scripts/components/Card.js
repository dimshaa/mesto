export default class Card {
  constructor(cardData, cardTemplate, handleCardClick, handleCardDelete, handleCardLike, userId) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._ownerId = cardData.owner._id;
    this._cardId = cardData._id;
    this._likes = cardData.likes;

    this._userId = userId;

    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardTemplate).content.querySelector('.card').cloneNode(true);

    return cardElement;
  }

  _isOwner() {
    return this._userId === this._ownerId;
  }

  hasLike() {
    return this._likes.find(like => like._id === this._userId);
  }

  getCardId() {
    return this._cardId;
  }

  renderCard() {
    this._card = this._getTemplate();
  
    this._cardCaption = this._card.querySelector('.card__caption');
    this._cardImage = this._card.querySelector('.card__image');
    this._cardLikeBtn = this._card.querySelector('.card__like-btn');
    this._cardLikeCounter = this._card.querySelector('.card__like-counter')
    this._cardDeleteBtn = this._card.querySelector('.card__delete-btn');
    this._cardLikeCounter.textContent = this._likes.length;
    
    this._cardCaption.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    if (!this._isOwner()) {
      this._cardDeleteBtn.classList.add('card__delete-btn_hidden');
    }

    this.showLikes(this._likes);

    this._setEventListeners();

    return this._card;
  }

  // _likeCard() {
  //   this._cardLikeBtn.classList.toggle('card__like-btn_active');
  // }

  showLikes(likes) {
    this._likes = likes;
    this._cardLikeCounter.textContent = this._likes.length;
      if (this.hasLike()) {
        this._cardLikeBtn.classList.add('card__like-btn_active');
      } else {
        this._cardLikeBtn.classList.remove('card__like-btn_active');
      }
  }

  deleteCard() {
    this._card.remove();
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
    this._cardLikeBtn.addEventListener('click', () => {
      this._handleCardLike();
    });
    this._cardDeleteBtn.addEventListener('click', () => {
      if (this._isOwner()) {
        this._handleCardDelete();
      }
    });
  }
}
