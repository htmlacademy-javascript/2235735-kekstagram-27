const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const USERS = [
  'User1',
  'User2',
  'User3',
  'User4',
  'User5',
  'User6',
  'User7'
];

const USER_COMMENT_ID_MAX = 1000;
const USER_COMMENT_ID_MIN = 1;
const USER_AVATAR_SRC_MAX = 6;
const USER_AVATAR_SRC_MIN = 1;
const OBJECT_LIKES_COUNT_MAX = 200;
const OBJECT_LIKES_COUNT_MIN = 15;
const OBJECT_COMMENT_COUNT_MAX = 2;
const OBJECT_COMMENT_COUNT_MIN = 1;
const OBJECT_COUNT = 25;

const objects = [];


/*Задание 2.18. Нужно больше функций

 Функция, возвращает случайное целое число из переданного диапазона включительно. Пример использования функции:
 имя_функции(от, до); // Результат: целое число из диапазона "от...до"
 - аргументамы: только положительные числа и ноль. Если функции пришли неправильные аргументы, она должна вернуть NaN
 - если передать значение «до» меньшее, чем значение «от», функция меняет их местами.
 - если передать значение «до» равное значению «от», функция возвращает это значение.
 Функция может не гарантировать верный результат, если в переданном диапазоне нет ни одного подходящего числа.
*/
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


/*Функция для проверки максимальной длины строки.
 имя_функции(проверяемая_строка, максимальная_длина);
 Результат: true, если строка проходит по длине, и false — если не проходит
*/
function checkStringLength(string, maxLength){
  return String(string).length <= Number(maxLength);
}

checkStringLength('',40);


/* Задание 4.15. Больше деталей

Структура обьекта:
- id, число от 1 до 25, не повторяется
- url, строка => photos/{{i}}.jpg, где {{i}} — это число от 1 до 25, не повторяется
- description, строка
- likes, случайное число от 15 до 200
- comments, массив объектов:
      {
      id: 135,
      avatar: 'img/avatar-6.svg',
      message: 'В целом всё неплохо. Но не всё.',
      name: 'Артём',
    }
    - id, случайное число
    - avatar, это строка => img/avatar-{{случайное число от 1 до 6}}.svg. Аватарки подготовлены в директории img
    - message, строка из примера:
        Всё отлично!
        В целом всё неплохо. Но не всё.
        Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.
        Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.
        Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.
        Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!
    - name, случайное имя
*/

const getRandomArrayElement = (array) => array[getRandom(0, array.length - 1)];

const createUserComment = () => ({
  id: getRandom(USER_COMMENT_ID_MIN, USER_COMMENT_ID_MAX),
  avatar: `img/avatar-${getRandom(USER_AVATAR_SRC_MIN, USER_AVATAR_SRC_MAX)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(USERS)
});

const createObject = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: 'Кекстаграм Фото',
  likes: getRandom(OBJECT_LIKES_COUNT_MIN, OBJECT_LIKES_COUNT_MAX),
  comments: Array.from({ length: getRandom(OBJECT_COMMENT_COUNT_MIN, OBJECT_COMMENT_COUNT_MAX) }, createUserComment)
});

for (let i = 1; i <= OBJECT_COUNT; i++){
  objects.push(createObject(i));
}

// eslint-disable-next-line no-console
console.log(objects);
