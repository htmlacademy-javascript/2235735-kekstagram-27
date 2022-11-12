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
const imgContainer = document.querySelector('.pictures');

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
  loadCommentsBtn.removeEventListener('click', onLoadCommentsBtnClick);
}

function openPopup () {
  changeElementClass();
  document.addEventListener('keydown', onPopupEscKeydown);
  closePopupBtn.addEventListener('click',onPopupClick);
  loadCommentsBtn.addEventListener('click', onLoadCommentsBtnClick);
}

function onLoadCommentsBtnClick(){
  const hiddenComments = socialCommentsContainer.querySelectorAll('.hidden');
  for (let i = 0; i < DEFAULT_COMMENTS_VISIBLE; i++){
    hiddenComments[i].classList.remove('hidden');
    commentsCountVisible.textContent++;
    if(hiddenComments[i] === hiddenComments[hiddenComments.length - 1]){
      loadCommentsBtn.classList.add('hidden');
      break;
    }
  }
}

const displayComments = (comments)=>{
  if (comments.length > DEFAULT_COMMENTS_VISIBLE){
    commentsCountVisible.textContent = DEFAULT_COMMENTS_VISIBLE;
  } else {
    commentsCountVisible.textContent = comments.length;
    loadCommentsBtn.classList.add('hidden');
  }
  comments.forEach(({avatar, message, name}, index)=>{
    const comment = commentTemplate.cloneNode(true);
    if (index > DEFAULT_COMMENTS_VISIBLE - 1){
      comment.classList.add('hidden');
    }
    comment.querySelector('img').src = avatar;
    comment.querySelector('img').alt = name;
    comment.querySelector('p').textContent = message;
    commentFragment.append(comment);
  });

  socialCommentsContainer.innerHTML = '';
  socialCommentsContainer.append(commentFragment);
};

const createPopup = ({url, description, likes, comments})=>{
  img.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  imgDescription.textContent = description;
  displayComments(comments);
  openPopup();
};

const getImgProperties = (imgList, targetImgURL)=>{
  for (let i = 0; i < imgList.length; i++){
    if(targetImgURL.includes(imgList[i].url)){
      return imgList[i];
    }
  }
};

const showPhoto = (imgList)=>{
  imgContainer.addEventListener('click', (evt)=>{
    if (evt.target.classList.value === 'picture__img'){
      const targetImgURL = evt.target.src;
      const targetImgInfo = getImgProperties(imgList, targetImgURL);
      createPopup(targetImgInfo);
    }
  });
};

export {showPhoto};
