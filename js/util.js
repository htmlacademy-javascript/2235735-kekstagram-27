function getRandom(startNum, endNum){
  if(startNum < 0 || endNum < 0) {
    return NaN;
  }
  startNum = Math.ceil(startNum);
  endNum = Math.floor(endNum);
  if (startNum === endNum){
    return startNum;
  }
  return startNum > endNum ? getRandomInteger(endNum, startNum) : getRandomInteger(startNum, endNum);
}

function getRandomInteger(startNum, endNum){
  return (Math.round(Math.random() * (endNum - startNum)) + startNum);
}

const getRandomArrayElement = (array) => array[getRandom(0, array.length - 1)];

function checkStringLength(string, maxLength){
  return String(string).length <= Number(maxLength);
}

function createRandomIdFromRangeGenerator (min, max) {
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
}

function toggleElementClass (element, className){
  element.classList.toggle(className);
}

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomArrayElement, getRandom,createRandomIdFromRangeGenerator, toggleElementClass, isEscapeKey, checkStringLength};

