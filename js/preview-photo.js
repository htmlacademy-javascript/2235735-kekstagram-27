import {showMessage} from './show-message.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const showPreviewPhoto = () => {
  const formFile = document.querySelector('#upload-file');
  const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
  const file = formFile.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
  }else {
    showMessage('error', 'Формат файла не поддерживается');
  }
};

export {showPreviewPhoto};
