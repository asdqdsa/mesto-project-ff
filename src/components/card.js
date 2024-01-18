import { config } from '../pages/index';
import { removePlace, likePlace, unlikePlace } from './api';

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
  cardContentClone
    .querySelector('.card')
    .setAttribute('data-id', `${card['_id']}`);
  // console.log(card.likes.length);
  cardContentClone.querySelector('.card__like-count').textContent =
    card.likes.length;
  cardContentClone.querySelector('.card__title').textContent = card.name;
  cardContentClone.querySelector('.card__image').src = card.link;
  cardContentClone.querySelector(
    '.card__image',
  ).alt = `Фотография местности ${card.name}`;

  // if (card.)
  cardContentClone
    .querySelector('.card__delete-button')
    .addEventListener('click', (evt) => removeCardHandler(evt));

  cardContentClone
    .querySelector('.card__like-button')
    .addEventListener('click', (evt) => likeCardHandler(evt));

  cardContentClone
    .querySelector('.card__image')
    .addEventListener('click', () =>
      showCardImageHandler(card.name, card.link),
    );

  const likeButton = cardContentClone.querySelector('.card__like-button');
  const isCardLiked = card.likes.some((user) => {
    return user['_id'] === 'b1d9d2a8723cef39cda63569';
  });
  if (isCardLiked) likeButton.classList.add('card__like-button_is-active');

  const isOwnerCard = card.owner['_id'] === 'b1d9d2a8723cef39cda63569';
  if (!isOwnerCard) {
    cardContentClone.querySelector('.card__delete-button').remove();
  }
  return cardContentClone;
}

// handle liking card
export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
  const card = evt.target.closest('.card');
  const cardId = card.dataset.id;
  const cardLikeCount = card.querySelector('.card__like-count');
  if (evt.target.classList.contains('card__like-button_is-active')) {
    likePlace(config, cardId).then((data) => {
      cardLikeCount.textContent = data.likes.length;
    });
  } else {
    unlikePlace(config, cardId).then((data) => {
      cardLikeCount.textContent = data.likes.length;
    });
  }
}

// @todo: Функция удаления карточки
export function removeCard(evt) {
  const card = evt.target.closest('.card');
  const idCard = card.dataset.id;
  removePlace(config, idCard);
  card.remove();
}
