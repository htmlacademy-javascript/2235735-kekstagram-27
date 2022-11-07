import {drawImg} from './drawImg.js';
import {showBigImg} from './showImg.js';
import {uploadImg, showMessage} from './form.js';
import {getImg} from './api.js';

const IMG_SECTION = document.querySelector('.pictures');

getImg((IMG_LIST)=>{
  drawImg(IMG_LIST,IMG_SECTION);
  showBigImg(IMG_LIST, IMG_SECTION);
},()=>{showMessage('error');} );
uploadImg();

