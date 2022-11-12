const ScaleParameters = {
  STEP: 25,
  MAX: 100,
  MIN: 25
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
  scaleTarget = getScaleDigitalValue() + ScaleParameters.STEP;
  if (scaleTarget <= ScaleParameters.MAX){
    modifyScale(scaleTarget);
  }
};

const decreaseScale = ()=>{
  scaleTarget = getScaleDigitalValue() - ScaleParameters.STEP;
  if (scaleTarget >= ScaleParameters.MIN){
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
  modifyScale(ScaleParameters.MAX);
  smallerScaleBtn.removeEventListener('click', onSmallerClick );
  biggerScaleBtn.removeEventListener('click', onBiggerClick);
};

const changeScale = ()=>{
  scaleCurrent.value = `${ScaleParameters.MAX}%`;
  smallerScaleBtn.addEventListener('click', onSmallerClick);
  biggerScaleBtn.addEventListener('click', onBiggerClick);
};

export {changeScale, removeScaleHandlers};
