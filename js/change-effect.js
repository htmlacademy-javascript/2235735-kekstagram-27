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
const slider = form.querySelector('.effect-level__slider');
const effectValue = form.querySelector('.effect-level__value');


let classTarget;

const updateSlider = (min, max, step )=>{
  slider.noUiSlider.updateOptions({
    range: {
      min,
      max,
    },
    step,
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

const hideSlider = () =>{
  imgPreview.style.filter = 'none';
  slider.classList.add('hidden');
  slider.noUiSlider.off('update');
};

const changeImgFilter = (value)=>{
  imgPreview.style.filter = `${SLIDER_FILTERS[classTarget].name}(${value}${SLIDER_FILTERS[classTarget].ext})`;

};


const changeImgClass = (effect)=>{
  const targetClass = `effects__preview--${effect}`;
  imgPreview.classList.forEach((e)=>imgPreview.classList.remove(e));
  imgPreview.classList.add(targetClass);
  showOrHideSlider(effect);

  if (effect !== 'none'){
    updateSlider(SLIDER_FILTERS[effect].min, SLIDER_FILTERS[effect].max, SLIDER_FILTERS[effect].step);
  }
};

const onEffectClick = (evt)=>{
  const classes = evt.target.id.split('-');
  classTarget = classes[1];
  changeImgClass(classTarget);
};


const destroySlider = ()=>{
  imgPreview.style.filter = 'none';
  slider.noUiSlider.destroy();
};

const showSlider = () =>{
  slider.classList.remove('hidden');
  slider.noUiSlider.on('update', () => {
    effectValue.value = slider.noUiSlider.get();
    changeImgFilter(slider.noUiSlider.get());
  });
};
function showOrHideSlider(effect) {
  if (effect === 'none') {
    hideSlider();
  } else if (slider.classList.contains('hidden') && effect !== 'none') {
    showSlider();
  }
}

const createSlider = ()=>{
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
  });
};

const changeEffect = ()=>{
  imgPreview.classList.forEach((e)=>imgPreview.classList.remove(e));
  imgPreview.classList.add('effects__preview--none');
  createSlider();
  hideSlider();

  effectList.addEventListener('change', onEffectClick);
};

const removeEffectHandlers = ()=>{
  effectList.removeEventListener('change', onEffectClick);
  destroySlider();
};

export {changeEffect, removeEffectHandlers};
