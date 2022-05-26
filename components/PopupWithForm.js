import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ formSubmitter, popupSelector }) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._formSubmitter = formSubmitter;
  }

  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._inputData = {};

    this._inputList.forEach(input => {
      this._inputData[input.name] = input.value;
    });

    return this._inputData;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._formSubmitter(this._getInputValues());
      
      this._form.reset();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
