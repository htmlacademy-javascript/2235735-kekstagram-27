const EFFECT_PARAMETERS = {
  original: 'none',
  chrome: 'chrome',
  sepia: 'sepia',
  marvin: 'marvin',
  phobos: 'phobos',
  heat: 'heat'
};

const form = document.querySelector('.img-upload__form');
const imgPreview = form.querySelector('.img-upload__preview').querySelector('img');

const removeEffectHandlers = ()=>{
  // smallerScaleBtn.removeEventListener('click', onSmallerClick );
  // biggerScaleBtn.removeEventListener('click', onBiggerClick);
};

const changeEffect = ()=>{
  imgPreview.classList.add(EFFECT_PARAMETERS.original);
};


export {changeEffect, removeEffectHandlers};
