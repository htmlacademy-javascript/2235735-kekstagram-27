const SLIDER_FILTERS = {
  'chrome':{
    name:'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    ext:''
  },
  'sepia':{
    name:'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    ext: ''
  },
  'marvin':{
    name:'invert',
    min: 0,
    max: 100,
    step: 1,
    ext: '%'
  },
  'phobos':{
    name:'blur',
    min: 0,
    max: 3,
    step: 0.1,
    ext: 'px'

  },
  'heat': {
    name:'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    ext: ''
  }
};

const form = document.querySelector('.img-upload__form');
const imgPreview = form.querySelector('.img-upload__preview').querySelector('img');
const effectList = form.querySelector('.effects__list');

const sliderElement = document.querySelector('.effect-level__slider');
const valueElement = document.querySelector('.effect-level__value');


let classClicked;

const changeClass = (effect)=>{
  const targetClass = `effects__preview--${effect}`;
  imgPreview.classList.forEach((e)=>imgPreview.classList.remove(e));
  imgPreview.classList.add(targetClass);
  showOrHideSlider(effect);
  if (effect !== 'none'){
    updateSlider(SLIDER_FILTERS[effect].min, SLIDER_FILTERS[effect].max, SLIDER_FILTERS[effect].step);
  }
};


const showOrHideSlider = (effect)=>{
  if (effect === 'none'){
    hideSlider();
  }else if(sliderElement.classList.contains('hidden') && effect !== 'none'){
    showSlider();
  }
};

const updateSlider = (min, max, step )=>{
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    step: step,
    start: max,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
};


const onEffectClick = (evt)=>{
  const classes = evt.target.id.split('-');
  classClicked = classes[1];
  changeClass(classClicked);
};

const removeEffectHandlers = ()=>{
  effectList.removeEventListener('change', onEffectClick);
};

const changeEffect = ()=>{
  imgPreview.classList.forEach((e)=>imgPreview.classList.remove(e));
  imgPreview.classList.add('effects__preview--none');
  hideSlider();

  effectList.addEventListener('change', onEffectClick);
};

const changeCSSStyle = (value)=>{
  if(classClicked === 'none' || classClicked === undefined){
    imgPreview.style.filter = 'none';
  }else {
    imgPreview.style.filter = `${SLIDER_FILTERS[classClicked].name}(${value}${SLIDER_FILTERS[classClicked].ext})`;

  }
};

const createSlider = ()=>{

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', () => {
    valueElement.value = sliderElement.noUiSlider.get();
    changeCSSStyle(sliderElement.noUiSlider.get());
  });
};


const destroySlider = ()=>{
  imgPreview.style.filter = 'none';
  sliderElement.noUiSlider.destroy();
};

const hideSlider = () =>{
  imgPreview.style.filter = 'none';
  sliderElement.classList.add('hidden');
};

const showSlider = () =>{
  sliderElement.classList.remove('hidden');
};

export {changeEffect, removeEffectHandlers, createSlider, destroySlider};
