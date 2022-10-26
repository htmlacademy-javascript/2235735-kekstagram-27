import {toggleElementClass, isEscapeKey} from './util.js';

const popup = document.querySelector('.big-picture');
const img = popup.querySelector('img');
const likesCount = popup.querySelector('.likes-count');
const commentsCount = popup.querySelector('.comments-count');
const socialCommentsCount = popup.querySelector('.social__comment-count');
const socialCommentsContainer = popup.querySelector('.social__comments');
const commentsLoader = popup.querySelector('.comments-loader');
const imgDescription = popup.querySelector('.social__caption');
const closePopupBtn = popup.querySelector('.big-picture__cancel');


function changeElementClass() {
  toggleElementClass(document.body, 'modal-open');
  toggleElementClass(popup, 'hidden');
  toggleElementClass(socialCommentsCount, 'hidden');
  toggleElementClass(commentsLoader, 'hidden');
}

function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
}

function onPopupClick() {
  closePopup();
}

function closePopup () {
  changeElementClass();

  document.removeEventListener('keydown', onPopupEscKeydown);
  closePopupBtn.removeEventListener('click', onPopupClick);
}

function openPopup () {
  changeElementClass();

  document.addEventListener('keydown', onPopupEscKeydown);
  closePopupBtn.addEventListener('click',onPopupClick);
}

const createPopup = ({url, description, likes, comments})=>{
  img.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  imgDescription.textContent = description;
  const commentFragment = document.createDocumentFragment();
  comments.forEach(({avatar, message, name})=>{
    const commentTemplate = socialCommentsContainer.querySelector('.social__comment').cloneNode(true);
    commentTemplate.querySelector('img').src = avatar;
    commentTemplate.querySelector('img').alt = name;
    commentTemplate.querySelector('p').textContent = message;
    commentFragment.append(commentTemplate);
  });
  socialCommentsContainer.innerHTML = '';
  socialCommentsContainer.append(commentFragment);
  openPopup();
};


const getImgProperties = (imgList, targetImgURL)=>{
  for (let i = 0; i < imgList.length; i++){
    if(targetImgURL.includes(imgList[i].url)){
      return imgList[i];
    }
  }
};

const showBigImg = (imgList, imgSection)=>{
  imgSection.addEventListener('click', (evt)=>{
    if (evt.target.classList.value === 'picture__img'){
      const targetImgURL = evt.target.src;
      const targetImgInfo = getImgProperties(imgList, targetImgURL);
      createPopup(targetImgInfo);
    }
  });
};

export {showBigImg};
