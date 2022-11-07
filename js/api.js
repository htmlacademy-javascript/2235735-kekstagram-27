
const GET_IMG_URL = 'https://27.javascript.pages.academy/kekstagram/data';
const SEND_IMG_URL = 'https://27.javascript.pages.academy/kekstagram';

const getImg = (onSuccess, onFail)=>{
  fetch(GET_IMG_URL)
    .then((response)=> response.json())
    .then((imgFromServer)=>{
      onSuccess(imgFromServer);
    })
    .catch(onFail);
};

const sendImg = (onSuccess, onFail, body)=>{
  fetch(SEND_IMG_URL,
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
