import {createObjectList} from './data.js';
import {drawImg} from './drawImg.js';
import {showBigImg} from './showImg.js';
import {uploadImg} from './form.js';

const IMG_SECTION = document.querySelector('.pictures');
const IMG_LIST = createObjectList();

drawImg(IMG_LIST,IMG_SECTION);
showBigImg(IMG_LIST, IMG_SECTION);
uploadImg();
