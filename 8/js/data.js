import {getRandomArrayElement, getRandom, createRandomIdFromRangeGenerator} from './util.js';

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
const OBJECT_COMMENT_COUNT_MAX = 16;
const OBJECT_COMMENT_COUNT_MIN = 7;
const OBJECT_COUNT = 25;

const radomID = createRandomIdFromRangeGenerator(1,25);
const randomURL = createRandomIdFromRangeGenerator(1,25);

const createUserComment = () => ({
  id: getRandom(USER_COMMENT_ID_MIN, USER_COMMENT_ID_MAX),
  avatar: `img/avatar-${getRandom(USER_AVATAR_SRC_MIN, USER_AVATAR_SRC_MAX)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(USERS)
});

const createObject = () => ({
  id: radomID(),
  url: `photos/${randomURL()}.jpg`,
  description: 'Кекстаграм Фото',
  likes: getRandom(OBJECT_LIKES_COUNT_MIN, OBJECT_LIKES_COUNT_MAX),
  comments: Array.from({ length: getRandom(OBJECT_COMMENT_COUNT_MIN, OBJECT_COMMENT_COUNT_MAX) }, createUserComment)
});


const createObjectList = ()=> Array.from({ length: OBJECT_COUNT }, createObject);

export {createObjectList};


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
