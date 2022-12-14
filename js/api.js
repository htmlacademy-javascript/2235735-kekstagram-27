
const GET_DATA_URL = 'https://27.javascript.pages.academy/kekstagram/data';
const SEND_DATA_URL = 'https://27.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onFail)=>{
  fetch(GET_DATA_URL)
    .then((response)=> response.json())
    .then((imgFromServer)=>{
      onSuccess(imgFromServer);
    })
    .catch(onFail);
};

const sendData = (onSuccess, onFail, body)=>{
  fetch(SEND_DATA_URL,
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

export {getData, sendData};
