import { initialCards, createCard, removeCard } from '../components/cards.js';
import { toggleModal } from '../components/modal.js';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  placesList.append(createCard(card, removeCard));
});

// popup toggle
const profileSection = document.querySelector('.profile');
profileSection.addEventListener('click', toggleModal);
