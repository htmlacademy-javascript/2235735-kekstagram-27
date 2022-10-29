const SCALE_PARAMETERS = {
  step: 25,
  max: 100,
  min: 25
};

const form = document.querySelector('.img-upload__form');
const imgPreview = form.querySelector('.img-upload__preview');
const smallerScaleBtn = form.querySelector('.scale__control--smaller');
const biggerScaleBtn = form.querySelector('.scale__control--bigger');
const scaleCurrent = form.querySelector('.scale__control--value');

let scaleTarget;

const onSmallerClick = ()=>{
  scaleTarget = getScaleDigitalValue() - SCALE_PARAMETERS.step;
  if (scaleTarget >= SCALE_PARAMETERS.min){
    modifyScale(scaleTarget);
  }
};

const onBiggerClick = ()=>{
  scaleTarget = getScaleDigitalValue() + SCALE_PARAMETERS.step;
  if (scaleTarget <= SCALE_PARAMETERS.max){
    modifyScale(scaleTarget);
  }
};

function getScaleDigitalValue(){
  const symbols = scaleCurrent.value.split('%');
  return +symbols[0];
}

function modifyScale(value){
  scaleCurrent.value = `${value}%`;
  imgPreview.style.transform = `scale(${value / 100})`;
}

const removeScaleHandlers = ()=>{
  smallerScaleBtn.removeEventListener('click', onSmallerClick );
  biggerScaleBtn.removeEventListener('click', onBiggerClick);
};

const changeScale = ()=>{
  scaleCurrent.value = `${SCALE_PARAMETERS.max}%`;
  smallerScaleBtn.addEventListener('click', onSmallerClick);
  biggerScaleBtn.addEventListener('click', onBiggerClick);
};

export {changeScale, removeScaleHandlers};
