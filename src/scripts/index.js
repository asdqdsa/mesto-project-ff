import {
  initialCards,
  createCard,
  removeCard,
  likeCard,
  showCardImage,
} from '../components/cards.js';
import { toggleModal } from '../components/modal.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  placesList.append(createCard(card, removeCard, likeCard, showCardImage));
});

// popup toggle
const profileSection = document.querySelector('.profile');
profileSection.addEventListener('click', toggleModal);
