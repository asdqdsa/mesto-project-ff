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
export function createCard(card, removeCardHandler) {
  const cardContentClone = cardContent.cloneNode(true);
  cardContentClone.querySelector('.card__title').textContent = card.name;
  cardContentClone.querySelector('.card__image').src = card.link;
  cardContentClone.querySelector(
    '.card__image',
  ).alt = `Фотография местности ${card.name}`;
  cardContentClone
    .querySelector('.card__delete-button')
    .addEventListener('click', (event) => removeCardHandler(event));

  return cardContentClone;
}

// @todo: Функция удаления карточки
export function removeCard(event) {
  const card = event.target.closest('.card');
  card.remove();
}
