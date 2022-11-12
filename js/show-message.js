import { isEscapeKey } from './util.js';

const formFragment = document.createDocumentFragment();

const showMessage = (messageClass, messageText)=>{
  const formMessageTemplate = document.querySelector(`#${ messageClass}`).content.querySelector(`.${ messageClass}`);
  const message = formMessageTemplate.cloneNode(true);
  if(messageText){
    message.querySelector('h2').textContent = messageText;
  }
  formFragment.appendChild(message);
  document.body.appendChild(formFragment);

  const closeMessageBtn = document.querySelector(`.${ messageClass }__button`);

  const onCloseMessageBtnClick = ()=>{
    closeMessage(messageClass);
  };

  const onMessageKeyDown = (evt)=>{
    if (isEscapeKey(evt) && document.querySelector(`.${messageClass}`) !== null) {
      closeMessage(messageClass);
    }
  };

  const onDocumentClick = (evt)=>{
    if (evt.target !== document.querySelector(`.${messageClass}__inner`) && evt.target !== document.querySelector(`.${messageClass}__title`)) {
      closeMessage(messageClass);
    }
  };

  function closeMessage() {
    document.querySelector(`.${messageClass}`).remove();
    closeMessageBtn.removeEventListener('click', onCloseMessageBtnClick);
    document.removeEventListener('keydown', onMessageKeyDown);
    document.removeEventListener('click', onDocumentClick);
  }

  closeMessageBtn.addEventListener('click', onCloseMessageBtnClick);
  document.addEventListener('keydown', onMessageKeyDown);
  document.addEventListener('click', onDocumentClick);
};

export{showMessage};
