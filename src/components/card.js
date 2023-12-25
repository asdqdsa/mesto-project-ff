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
    .addEventListener('click', () =>
      showCardImageHandler(card.name, card.link),
    );

  return cardContentClone;
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
