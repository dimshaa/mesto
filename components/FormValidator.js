export default class FormValidator {
  constructor(config, form) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonClass = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._form = form;

    this._submitButton = this._form.querySelector(this._submitButtonClass);
    this._inputList = this._form.querySelectorAll(this._inputSelector);
  }

  _toggleSubmitButton() {
    this._submitButton.disabled = !this._form.checkValidity();
    this._submitButton.classList.toggle(this._inactiveButtonClass, !this._form.checkValidity());
  }

  _showInputError(input) {
    const errorText = this._form.querySelector(`#${input.id}-error`);
    
    errorText.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
  }

  _hideInputError(input) {
    const errorText = this._form.querySelector(`#${input.id}-error`);
    
    errorText.textContent = '';
    input.classList.remove(this._inputErrorClass);   
  }

  _validateInput(input) {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }

    this._toggleSubmitButton();
  }

  _setEventListeners() {
    this._form.addEventListener('input', (event) => {
      this._validateInput(event.target);
    });
  }

  enableValidation() {
    this._setEventListeners();
    this._toggleSubmitButton();
  }

  resetValidation() {
    this._toggleSubmitButton();
    
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
  }
}
