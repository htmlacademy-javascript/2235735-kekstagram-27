import {toggleElementClass, isEscapeKey} from './util.js';
import {changeScale, removeScaleHandlers} from './change-scale.js';
import {changeEffect, removeEffectHandlers} from './change-effect.js';
import {sendData} from './api.js';
import {showPreviewPhoto} from './preview-photo.js';
import {showMessage} from './show-message.js';
import {validateForm} from './validate-form.js';

const MESSAGE_SUCCESS_CLASS = 'success';
const MESSAGE_ERROR_CLASS = 'error';
const DEFAULT_IMG_URL = 'img/upload-default-image.jpg';

const form = document.querySelector('.img-upload__form');
const formFile = form.querySelector('#upload-file');
const formPopup = form.querySelector('.img-upload__overlay ');
const closeFormBtn = form.querySelector('#upload-cancel');
const hashTagArea = form.querySelector('.text__hashtags');
const commentArea = form.querySelector('.text__description');
const submitFormBtn = form.querySelector('.img-upload__submit');
const imgPreview = form.querySelector('.img-upload__preview').querySelector('img');

const blockSubmitButton = ()=>{
  submitFormBtn.disabled = true;
};

const unblockSubmitButton = ()=>{
  submitFormBtn.disabled = false;
};

const onPopupClick = ()=>{
  closePopup();
};

const onPopupEscKeydown = (evt)=>{
  if (isEscapeKey(evt)) {
    if (document.activeElement !== commentArea && document.activeElement !== hashTagArea && document.querySelector('.error') === null){
      evt.preventDefault();
      closePopup();
    }
  }
};

const changeElementClass = ()=>{
  toggleElementClass(formPopup, 'hidden');
  toggleElementClass(document.body, 'modal-open');
};

const checkForm = (evt)=>{
  evt.preventDefault();
  if (validateForm()) {
    blockSubmitButton();
    const formData = new FormData(evt.target);
    sendData(
      ()=>{
        closePopup();
        showMessage(MESSAGE_SUCCESS_CLASS);
        unblockSubmitButton();
      },
      ()=>{
        showMessage(MESSAGE_ERROR_CLASS);
        unblockSubmitButton();
      },
      formData);
  }
};


function closePopup() {
  changeElementClass();
  document.removeEventListener('keydown', onPopupEscKeydown);
  closeFormBtn.removeEventListener('click', onPopupClick);
  form.removeEventListener('submit', checkForm);
  form.reset();
  removeScaleHandlers();
  removeEffectHandlers();
  const pristineMessages = document.querySelectorAll('.pristine-error');
  if (pristineMessages) {
    pristineMessages.forEach((element) => { element.textContent = ''; });
  }
  imgPreview.src = DEFAULT_IMG_URL;
}

const openPopup = ()=>{
  changeElementClass();

  document.addEventListener('keydown', onPopupEscKeydown);
  closeFormBtn.addEventListener('click', onPopupClick);
  form.addEventListener('submit', checkForm);
  showPreviewPhoto();
  changeScale();
  changeEffect();
};

const showForm = ()=>{
  formFile.addEventListener('change', openPopup);
};

export {showForm};
