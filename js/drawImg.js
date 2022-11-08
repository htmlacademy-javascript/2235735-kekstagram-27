const imgTemplate = document.querySelector('#picture').content.querySelector('a');
const imgFragment = document.createDocumentFragment();

const drawImg = (imgList, imgContainer)=>{
  imgList.forEach(({url, likes, comments}) => {
    const img = imgTemplate.cloneNode(true);
    img.querySelector('img').src = url;
    img.querySelector('p').querySelector('.picture__comments').textContent = comments.length;
    img.querySelector('p').querySelector('.picture__likes').textContent = likes;
    imgFragment.appendChild(img);
  });
  imgContainer.querySelectorAll('.picture').forEach((element)=>element.remove());
  imgContainer.appendChild(imgFragment);
};

export {drawImg};
