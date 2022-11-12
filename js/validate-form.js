import { checkStringLength } from './util.js';

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
const hashTagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(form,{
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
}, false);

const validateComment = (value)=>checkStringLength(value, 140);

const validateHashTag = (value)=>{
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
};

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

const validateForm = ()=>pristine.validate();

export {validateForm};
