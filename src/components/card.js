import { REQUEST_CONFIG } from '../pages/index';
import { removePlace, likePlace, unlikePlace, getLink } from './api';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');
const cardContent = cardTemplate.content;

// placeholder image
const ERROR_IMG_LINK =
  'https://previews.123rf.com/images/krisckam/krisckam1307/krisckam130700312/20984907-404-error-file-not-found-illustration-vector.jpg';

// @todo: Функция создания карточки
export function createCard(
  card,
  removeCardHandler,
  likeCardHandler,
  showCardImageHandler,
  accountId,
) {
  const cardContentClone = cardContent.cloneNode(true);
  cardContentClone.querySelector('.card').setAttribute('data-id', `${card['_id']}`);
  cardContentClone.querySelector('.card__like-count').textContent = card.likes.length;
  cardContentClone.querySelector('.card__title').textContent = card.name;

  const cardCloneImg = cardContentClone.querySelector('.card__image');
  getLink(card.link, ERROR_IMG_LINK).then((linkImg) => (cardCloneImg.src = linkImg));

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
    .addEventListener('click', () => showCardImageHandler(card.name, card.link));

  const likeButton = cardContentClone.querySelector('.card__like-button');
  const isCardLiked = card.likes.some((user) => user['_id'] === accountId);
  const isOwnerCard = card.owner['_id'] === accountId;
  if (isCardLiked) likeButton.classList.add('card__like-button_is-active');
  if (!isOwnerCard) cardContentClone.querySelector('.card__delete-button').remove();

  return cardContentClone;
}

// handle liking card
export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
  const card = evt.target.closest('.card');
  const cardId = card.dataset.id;
  const cardLikeCount = card.querySelector('.card__like-count');
  if (evt.target.classList.contains('card__like-button_is-active')) {
    likePlace(REQUEST_CONFIG, cardId).then((data) => {
      cardLikeCount.textContent = data.likes.length;
    });
  } else {
    unlikePlace(REQUEST_CONFIG, cardId).then((data) => {
      cardLikeCount.textContent = data.likes.length;
    });
  }
}

// @todo: Функция удаления карточки
export function removeCard(evt) {
  const card = evt.target.closest('.card');
  const idCard = card.dataset.id;
  removePlace(REQUEST_CONFIG, idCard);
  card.remove();
}
