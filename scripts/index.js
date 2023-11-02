// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');
const cardContent = cardTemplate.content;

// @todo: DOM узлы
const addCardBtn = document.querySelector('.profile__add-button');
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardIndex = 0) {
  const [cardName, cardLink] = [
    initialCards[cardIndex].name,
    initialCards[cardIndex].link,
  ];
  const cardContentClone = cardContent.cloneNode(true);
  cardContentClone.querySelector('.card__title').textContent = cardName;
  cardContentClone.querySelector('.card__image').src = cardLink;
  cardContentClone
    .querySelector('.card__delete-button')
    .addEventListener('click', (event) => removeCard(event));

  return cardContentClone;
}

// @todo: Функция удаления карточки
function removeCard(event) {
  const card = event.target.closest('.card');
  card.remove();
}

// @todo: Вывести карточки на страницу
function init(createCard) {
  for (let i = 0; i < initialCards.length; i += 1) {
    const card = createCard(i);
    placesList.append(createCard(i));
  }
}

// Добавление случайной карточки
function addRandomCard(createCard) {
  const random = Math.floor(Math.random() * initialCards.length);
  const card = createCard(random);
  placesList.append(card);
}

addCardBtn.addEventListener('click', () => addRandomCard(createCard));

init(createCard);
