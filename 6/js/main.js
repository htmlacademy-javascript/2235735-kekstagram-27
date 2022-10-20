import {createObjectList} from './data.js';
import {drawImg} from './drawImg.js';
import {showImg} from './showImg.js';

const IMG_SECTION = document.querySelector('.pictures');
const IMG_LIST = createObjectList();

drawImg(IMG_LIST,IMG_SECTION);
showImg(IMG_LIST, IMG_SECTION);
