const getRandomInteger = (startNum, endNum)=>Math.round(Math.random() * (endNum - startNum)) + startNum;

const getRandom = (startNum, endNum) =>{
  if(startNum < 0 || endNum < 0) {
    return NaN;
  }
  startNum = Math.ceil(startNum);
  endNum = Math.floor(endNum);
  if (startNum === endNum){
    return startNum;
  }
  return startNum > endNum ? getRandomInteger(endNum, startNum) : getRandomInteger(startNum, endNum);
};

const checkStringLength = (string, maxLength)=>String(string).length <= Number(maxLength);

const createRandomIdFromRangeGenerator = (min, max)=>{
  const previousValues = [];
  return function () {
    let currentValue = getRandom(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandom(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const toggleElementClass = (element, className)=>{
  element.classList.toggle(className);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = 500)=> {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {createRandomIdFromRangeGenerator, toggleElementClass, isEscapeKey, checkStringLength, debounce};

