import {renderPhotos} from './render-photos.js';
import {createRandomIdFromRangeGenerator, debounce} from './util.js';

const imgFilter = document.querySelector('.img-filters');
const defaultBtn = imgFilter.querySelector('#filter-default');
const randomBtn = imgFilter.querySelector('#filter-random');
const popularBtn = imgFilter.querySelector('#filter-discussed');

const deleteActiveClass = ()=>{
  const filterBtns = document.querySelectorAll('.img-filters__button');
  filterBtns.forEach((element)=>element.classList.remove('img-filters__button--active'));
};

const onRandomBtnClick = (cb, imgList)=>{
  randomBtn.addEventListener('click', (evt) => {
    deleteActiveClass();
    evt.target.classList.add('img-filters__button--active');
    const randomImgID = createRandomIdFromRangeGenerator(0, imgList.length - 1);
    const randomImg = () => imgList[randomImgID()];
    const randomImgList = Array.from({ length: 10 }, randomImg);
    cb(randomImgList);
  });
};

const onDefaultBtnClick = (cb, imgList)=>{
  defaultBtn.addEventListener('click', (evt)=>{
    deleteActiveClass();
    evt.target.classList.add('img-filters__button--active');
    cb(imgList);
  });
};

const onPopularBtnClick = (cb, imgList)=>{
  popularBtn.addEventListener('click', (evt)=>{
    deleteActiveClass();
    evt.target.classList.add('img-filters__button--active');
    const compareComments = (commentsImgA, commentsImgB)=>{
      const countA = commentsImgA.comments.length;
      const countB = commentsImgB.comments.length;
      return countB - countA;
    };
    const popularImgList = imgList.slice().sort(compareComments);
    cb(popularImgList);
  });
};

const showFilter = (imgList)=>{
  imgFilter.classList.remove('img-filters--inactive');
  onDefaultBtnClick(debounce(renderPhotos),imgList);
  onRandomBtnClick(debounce(renderPhotos), imgList);
  onPopularBtnClick(debounce(renderPhotos), imgList);
};

export {showFilter};
