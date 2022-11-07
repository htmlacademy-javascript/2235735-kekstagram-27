
const getImgUrl = 'https://27.javascript.pages.academy/kekstagram/data';
const sendImgUrl = 'https://27.javascript.pages.academy/kekstagram';

const getImg = (onSuccess, onFail)=>{
  fetch(getImgUrl)
    .then((response)=> response.json())
    .then((imgFromServer)=>{
      onSuccess(imgFromServer);
    })
    .catch(onFail);
};

const sendImg = (onSuccess, onFail, body)=>{
  fetch(sendImgUrl,
    {
      method: 'POST',
      body
    })
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(onFail);
};

export {getImg, sendImg};
