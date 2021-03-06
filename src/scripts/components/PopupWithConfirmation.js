import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor({ deleteFunction, popupSelector }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._submitButton = this._form.querySelector('.popup__submit-btn');
    this._deleteFunction = deleteFunction;
  }

  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._deleteFunction(this._card);
    });
  }

  renderButtonText(text) {
    this._submitButton.textContent = text;
  }
}
