
const getImg = (onSuccess, onFail)=>{
  fetch('https://27.javascript.pages.academy/kekstagram/data')
    .then((response)=> response.json())
    .then((imgFromServer)=>{
      onSuccess(imgFromServer);
    })
    .catch(()=>{
      onFail();
    });
};

const sendImg = (onSuccess, onFail, body)=>{
  fetch('https://27.javascript.pages.academy/kekstagram',
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
    .catch(() => {
      onFail();
    });
};

export {getImg, sendImg};
