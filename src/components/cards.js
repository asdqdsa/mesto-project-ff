import {
  popupImageFrame,
  popupImageCaption,
  popupTypeImage,
} from '../scripts/index';

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');
const cardContent = cardTemplate.content;

// @todo: Функция создания карточки
export function createCard(
  card,
  removeCardHandler,
  likeCardHandler,
  showCardImageHandler,
) {
  const cardContentClone = cardContent.cloneNode(true);
  cardContentClone.querySelector('.card__title').textContent = card.name;
  cardContentClone.querySelector('.card__image').src = card.link;
  cardContentClone.querySelector(
    '.card__image',
  ).alt = `Фотография местности ${card.name}`;
  cardContentClone
    .querySelector('.card__delete-button')
    .addEventListener('click', (evt) => removeCardHandler(evt));

  cardContentClone
    .querySelector('.card__like-button')
    .addEventListener('click', (evt) => likeCardHandler(evt));

  cardContentClone
    .querySelector('.card__image')
    .addEventListener('click', (evt) => showCardImageHandler(evt));

  return cardContentClone;
}

// handle show cards photo
export function showCardImage(evt) {
  popupTypeImage.classList.toggle('popup_is-opened');
  popupImageFrame.src = evt.target.src;
  popupImageCaption.textContent =
    evt.currentTarget.parentNode.querySelector(
      '.card__description',
    ).textContent;
}

// handle liking card
export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

// @todo: Функция удаления карточки
export function removeCard(evt) {
  const card = evt.target.closest('.card');
  card.remove();
}
