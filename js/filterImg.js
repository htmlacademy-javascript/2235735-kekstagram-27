import {drawImg} from './drawImg.js';
import {createRandomIdFromRangeGenerator, debounce} from './util.js';

const imgFilter = document.querySelector('.img-filters');
const defaultBtn = document.querySelector('#filter-default');
const randomBtn = document.querySelector('#filter-random');
const popularBtn = document.querySelector('#filter-discussed');
const IMG_SECTION = document.querySelector('.pictures');

function deleteActiveClass (){
  const filterBtns = document.querySelectorAll('.img-filters__button');
  filterBtns.forEach((element)=>element.classList.remove('img-filters__button--active'));
}

function randomClick(cb, imgList) {
  randomBtn.addEventListener('click', (evt) => {
    deleteActiveClass();
    evt.target.classList.add('img-filters__button--active');
    const randomImgID = createRandomIdFromRangeGenerator(0, imgList.length - 1);
    const randomImg = () => imgList[randomImgID()];
    const randomImgList = Array.from({ length: 10 }, randomImg);
    cb(randomImgList, IMG_SECTION);
  });
}

function defaultClick (cb, imgList){
  defaultBtn.addEventListener('click', (evt)=>{
    deleteActiveClass();
    evt.target.classList.add('img-filters__button--active');
    cb(imgList, IMG_SECTION);
  });
}

function popularClick (cb, imgList){
  popularBtn.addEventListener('click', (evt)=>{
    deleteActiveClass();
    evt.target.classList.add('img-filters__button--active');
    const compareComments = (commentsImgA, commentsImgB)=>{
      const countA = commentsImgA.comments.length;
      const countB = commentsImgB.comments.length;
      return countB - countA;
    };
    const popularImgList = imgList.slice().sort(compareComments);
    cb(popularImgList, IMG_SECTION);
  });
}


const showFilter = (imgList)=>{
  imgFilter.classList.remove('img-filters--inactive');

  defaultClick(debounce(drawImg),imgList);

  randomClick(debounce(drawImg), imgList);

  popularClick (debounce(drawImg), imgList);

};

export {showFilter};
