function enableValidation(config) {
  const forms = document.querySelectorAll(config.formSelector);

  forms.forEach((form) => {
    form.addEventListener('input', (event) => validateInput(event, form, config));

    toggleSubmitButton(form, config);
  });
}

function toggleSubmitButton(form, config) {
  const buttons = document.querySelectorAll(config.submitButtonSelector);

  buttons.forEach((btn) => {
    btn.disabled = !form.checkValidity();
    btn.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
});
}

function validateInput(event, form, config) {
  const input = event.target;
  const errorText = document.querySelector(`#${input.id}-error`);

  if (input.validity.valid) {
    errorText.textContent = '';
    input.classList.remove(config.inputErrorClass);
  } else {
    errorText.textContent = input.validationMessage;
    input.classList.add(config.inputErrorClass);
  }
  
  toggleSubmitButton(form, config);
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__input_type_error'
}); 
