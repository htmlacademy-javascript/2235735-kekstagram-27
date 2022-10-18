import {createObjectList} from './data.js';
import {drawImg} from './drawImg.js';

const IMG_SECTION = document.querySelector('.pictures');
drawImg(createObjectList(),IMG_SECTION);
