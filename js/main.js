import {renderPhotos} from './render-photos.js';
import {showPhoto} from './show-photo.js';
import {showForm} from './show-form.js';
import {getData} from './api.js';
import {showFilter} from './show-filter.js';
import {showMessage} from './show-message.js';

getData((photos)=>{
  renderPhotos(photos);
  showPhoto(photos);
  showFilter(photos);
},()=>{showMessage('error', 'Сервер временно не доступен');} );
showForm();

