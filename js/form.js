import { toggleElementClass, isEscapeKey, checkStringLength } from './util.js';
import { changeScale, removeScaleHandlers } from './change-scale.js';
import { changeEffect, removeEffectHandlers, createSlider, destroySlider } from './change-effect.js';

const HASHTAG_RULES = [
  'хеш-тег не может состоять только из одной решётки;',
  'максимальная длина одного хэш-тега 20 символов, включая решётку;',
  'хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;',
  'хэш-теги разделяются пробелами;',
  'один и тот же хэш-тег не может быть использован дважды;',
  'нельзя указать больше пяти хэш-тегов;'
];
const HASHTAG_COUNT_MAX = 5;

const form = document.querySelector('.img-upload__form');
const formFile = form.querySelector('#upload-file');
const formPopup = form.querySelector('.img-upload__overlay ');
const closeFormBtn = form.querySelector('#upload-cancel');
const hashTagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;
const hashTagArea = form.querySelector('.text__hashtags');
const commentArea = form.querySelector('.text__description');

function onPopupClick() {
  closePopup();
}

function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    if (document.activeElement !== commentArea && document.activeElement !== hashTagArea){
      evt.preventDefault();
      closePopup();
    }
  }
}

function changeElementClass() {
  toggleElementClass(formPopup, 'hidden');
  toggleElementClass(document.body, 'modal-open');
}

function closePopup() {
  changeElementClass();

  document.removeEventListener('keydown', onPopupEscKeydown);
  closeFormBtn.removeEventListener('click', onPopupClick);
  form.removeEventListener('submit', formValidate);
  form.reset();
  removeScaleHandlers();
  removeEffectHandlers();
  destroySlider();
}

function openPopup() {
  changeElementClass();

  document.addEventListener('keydown', onPopupEscKeydown);
  closeFormBtn.addEventListener('click', onPopupClick);
  changeScale();
  changeEffect();
  createSlider();
}

const pristine = new Pristine(form,{
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
}, false);

function formValidate (evt){
  const isValid = pristine.validate();
  if (isValid) {
    //отправка формы
  }else{
    evt.preventDefault();
  }
}

function validateComment(value){
  return checkStringLength(value, 140);
}

function validateHashTag(value){
  if(checkStringLength(value, 0)){
    return true;
  }
  const hashTags = value.trim().toLowerCase().split(' ');
  if (hashTags.length > HASHTAG_COUNT_MAX){
    return false;
  }
  const uniqueHashTag = new Set(hashTags);
  if (uniqueHashTag.size !== hashTags.length){
    return false;
  }
  const trueOrFalse = hashTags.map((element)=>hashTagRegExp.test(element));
  return !trueOrFalse.includes(false);
}

pristine.addValidator(
  form.querySelector('.text__description'),
  validateComment,
  'Длина поля с комментариями - до 140 символов'
);

const hashTagError = ()=>HASHTAG_RULES.join('<br>');

pristine.addValidator(
  form.querySelector('.text__hashtags'),
  validateHashTag,
  hashTagError
);

const uploadImg = ()=>{
  formFile.addEventListener('change', openPopup);
  form.addEventListener('submit', formValidate);
};

export {uploadImg};
