const SCALE_PARAMETERS = {
  step: 25,
  max: 100,
  min: 25
};

const form = document.querySelector('.img-upload__form');
const imgPreview = form.querySelector('.img-upload__preview').querySelector('img');
const smallerScaleBtn = form.querySelector('.scale__control--smaller');
const biggerScaleBtn = form.querySelector('.scale__control--bigger');
const scaleCurrent = form.querySelector('.scale__control--value');

let scaleTarget;

const getScaleDigitalValue = ()=>{
  const symbols = scaleCurrent.value.split('%');
  return +symbols[0];
};

const modifyScale = (value)=>{
  scaleCurrent.value = `${value}%`;
  imgPreview.style.transform = `scale(${value / 100})`;
};

const increaseScale = ()=>{
  scaleTarget = getScaleDigitalValue() + SCALE_PARAMETERS.step;
  if (scaleTarget <= SCALE_PARAMETERS.max){
    modifyScale(scaleTarget);
  }
};

const decreaseScale = ()=>{
  scaleTarget = getScaleDigitalValue() - SCALE_PARAMETERS.step;
  if (scaleTarget >= SCALE_PARAMETERS.min){
    modifyScale(scaleTarget);
  }
};

const onSmallerClick = ()=>{
  decreaseScale();
};

const onBiggerClick = ()=>{
  increaseScale();
};


const removeScaleHandlers = ()=>{
  modifyScale(SCALE_PARAMETERS.max);
  smallerScaleBtn.removeEventListener('click', onSmallerClick );
  biggerScaleBtn.removeEventListener('click', onBiggerClick);
};

const changeScale = ()=>{
  scaleCurrent.value = `${SCALE_PARAMETERS.max}%`;
  smallerScaleBtn.addEventListener('click', onSmallerClick);
  biggerScaleBtn.addEventListener('click', onBiggerClick);
};

export {changeScale, removeScaleHandlers};
