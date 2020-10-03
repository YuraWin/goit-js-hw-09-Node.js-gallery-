import srcGallery from '../gallery-items.js';
const galleryMarkup = createGalleryMarkup(srcGallery);

const galleryContainer = document.querySelector('.js-gallery');
const modalContainer = document.querySelector('.js-lightbox');
const image = document.querySelector('.lightbox__image');
const closeBtn = document.querySelector('button[data-action="close-lightbox"]');
const areaOverlay = document.querySelector('div.lightbox__overlay');

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);
galleryContainer.addEventListener('click', onFotoGalleryClick);
closeBtn.addEventListener('click', onCloseModalContainer);
areaOverlay.addEventListener('click', onCloseModalContainer);

function createGalleryMarkup(source) {
  return source
    .map(({ preview, original, description }) => {
      return `
       <li class="gallery__item">
     <a
       class="gallery__link"
       href="${original}"
     >
       <img
         class="gallery__image"
         src="${preview}"
         data-source="${original}"
         alt="${description}"
       />
     </a>
       </li>`;
    })
    .join('');
}

function onFotoGalleryClick(evt) {
  evt.preventDefault();
  const clickElement = evt.target;
  if (!clickElement.classList.contains('gallery__image')) return;

  const urlImage = clickElement.dataset.source;
  const altDescription = clickElement.getAttribute('alt');

  openModalContainer();
  openImage(urlImage, altDescription);
  addKeyEventListener();

  function openModalContainer() {
    modalContainer.classList.add('is-open');
  }
  function openImage(src, alt) {
    image.src = src;
    image.alt = alt;
  }
  function addKeyEventListener() {
    window.addEventListener('keydown', onEscPress);
  }
}

function onEscPress(evt) {
  if (evt.code !== 'Escape') return;
  onCloseModalContainer();
}

function onCloseModalContainer() {
  modalContainer.classList.remove('is-open');
  window.removeEventListener('keydown', onEscPress);
  image.src = '';
  image.alt = '';
}
