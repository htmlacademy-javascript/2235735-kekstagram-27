import {toggleElementClass, isEscapeKey} from './util.js';

const DEFAULT_COMMENTS_VISIBLE = 5;

const popup = document.querySelector('.big-picture');
const img = popup.querySelector('img');
const likesCount = popup.querySelector('.likes-count');
const commentsCount = popup.querySelector('.comments-count');
const commentsCountVisible = popup.querySelector('.comments-count-visible');
const socialCommentsContainer = popup.querySelector('.social__comments');
const loadCommentsBtn = popup.querySelector('.comments-loader');
const imgDescription = popup.querySelector('.social__caption');
const closePopupBtn = popup.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('li');
const commentFragment = document.createDocumentFragment();

function changeElementClass() {
  toggleElementClass(document.body, 'modal-open');
  toggleElementClass(popup, 'hidden');
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
  loadCommentsBtn.classList.remove('hidden');
  socialCommentsContainer.innerHTML = '';

  document.removeEventListener('keydown', onPopupEscKeydown);
  closePopupBtn.removeEventListener('click', onPopupClick);
  loadCommentsBtn.removeEventListener('click', onLoaderClick);
}

function openPopup () {
  changeElementClass();

  document.addEventListener('keydown', onPopupEscKeydown);
  closePopupBtn.addEventListener('click',onPopupClick);
  loadCommentsBtn.addEventListener('click', onLoaderClick);
}

function onLoaderClick(){
  const hiddenComments = socialCommentsContainer.querySelectorAll('.hidden');
  for (let i = 0; i <= DEFAULT_COMMENTS_VISIBLE - 1; i++){
    hiddenComments[i].classList.remove('hidden');
    commentsCountVisible.textContent++;
    if(hiddenComments[i] === hiddenComments[hiddenComments.length - 1]){
      loadCommentsBtn.classList.add('hidden');
      break;
    }
  }
}

const displayComments = (comments, count)=>{
  commentsCountVisible.textContent = count;
  comments.forEach(({avatar, message, name}, index)=>{
    const comment = commentTemplate.cloneNode(true);
    if (index > count - 1){
      comment.classList.add('hidden');
    }
    comment.querySelector('img').src = avatar;
    comment.querySelector('img').alt = name;
    comment.querySelector('p').textContent = message;
    commentFragment.append(comment);
  });
};

const createPopup = ({url, description, likes, comments})=>{
  img.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  imgDescription.textContent = description;
  if (comments.length > DEFAULT_COMMENTS_VISIBLE){
    displayComments(comments, DEFAULT_COMMENTS_VISIBLE);
  }else {
    displayComments(comments, comments.length);
    loadCommentsBtn.classList.add('hidden');
  }

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
