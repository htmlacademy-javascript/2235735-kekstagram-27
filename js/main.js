// Функция, возвращает случайное целое число из переданного диапазона включительно. Пример использования функции:
// имя_функции(от, до); // Результат: целое число из диапазона "от...до"

// - аргументамы: только положительные числа и ноль. Если функции пришли неправильные аргументы, она должна вернуть NaN
// -если передать значение «до» меньшее, чем значение «от», функция меняет их местами.
// -если передать значение «до» равное значению «от», функция возвращает это значение.
// Функция может не гарантировать верный результат, если в переданном диапазоне нет ни одного подходящего числа.

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

getRandom(10, 50);
// Функция для проверки максимальной длины строки.

// имя_функции(проверяемая_строка, максимальная_длина);
// Результат: true, если строка проходит по длине, и false — если не проходит

function checkStringLength(string, maxLength){
  return String(string).length <= Number(maxLength);
}

checkStringLength('',40);
