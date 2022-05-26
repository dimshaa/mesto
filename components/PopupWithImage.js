import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.card__image');
    this._caption = this._popup.querySelector('.popup__card-caption');
  }

  open({ imageCaption, imageSrc }) {
    this._image.src = imageSrc;
    this._image.alt = imageCaption;
    this._caption = imageCaption;

    super.open();
  }
}
