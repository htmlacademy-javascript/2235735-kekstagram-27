const previewImg = () => {
  const formFile = document.querySelector('#upload-file');
  const preview = document.querySelector('.img-upload__preview').querySelector('img');
  const file = formFile.files[0];
  preview.src = URL.createObjectURL(file);
};

export {previewImg};
