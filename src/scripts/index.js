import {
  createCard,
  removeCard,
  likeCard,
  showCardImage,
} from '../components/card';

import { initialCards } from '../components/cards';

import {
  openModal,
  closeModal,
  onKeyDown,
  handleEditFormSubmit,
  handleAddFormSubmit,
} from '../components/modal';

// @todo: DOM узлы
export const placesList = document.querySelector('.places__list');
export const profileSection = document.querySelector('.profile');

// profile Nodes
const profileInfo = document.querySelector('.profile__info');
const profilePicture = document.querySelector('.profile__image');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');
export const profileTitle = document.querySelector('.profile__title');
export const profileDescription = document.querySelector(
  '.profile__description',
);

// modal Nodes
export const popupTypeEdit = document.querySelector('.popup_type_edit');
export const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupEditCloseBtn = popupTypeEdit.querySelector('.popup__close');
const popupAddCloseBtn = popupTypeNewCard.querySelector('.popup__close');
const popupEditSubmitBtn = popupTypeEdit.querySelector('.popup__button');
const popupAddSubmitBtn = popupTypeNewCard.querySelector('.popup__button');

// card Image Nodes
export const popupTypeImage = document.querySelector('.popup_type_image');
export const popupImageFrame = popupTypeImage.querySelector('.popup__image');
export const popupImageCaption =
  popupTypeImage.querySelector('.popup__caption');
export const popupImageCloseBtn = popupTypeImage.querySelector('.popup__close');

// popup Edit Form Nodes
const popupEditForm = document.forms['edit-profile'];
export const popupName = popupEditForm.name;
export const popupDescription = popupEditForm.description;
// popup Add Form Nodes
const popupAddForm = document.forms['new-place'];
export const popupAddName = popupAddForm['place-name'];
export const popupAddLink = popupAddForm.link;

// modal style modifiers
export const activeModalStyle = 'popup_is-opened';
const animateModalStyle = 'popup_is-animated';

// list of elements to animate
const listOfElementsToAnimate = [
  popupTypeEdit,
  popupTypeNewCard,
  popupTypeImage,
];

// modal open-close EventListeners
profilePicture.addEventListener('click', (evt) => {
  document.addEventListener('keydown', onKeyDown);
  openModal(evt, activeModalStyle, popupTypeEdit);
});

profileEditBtn.addEventListener('click', (evt) => {
  document.addEventListener('keydown', onKeyDown);
  openModal(evt, activeModalStyle, popupTypeEdit);
});

profileAddBtn.addEventListener('click', (evt) => {
  document.addEventListener('keydown', onKeyDown);
  openModal(evt, activeModalStyle, popupTypeNewCard);
});

popupTypeEdit.addEventListener('click', (evt) => {
  closeModal(evt, activeModalStyle, popupEditCloseBtn);
});

popupTypeNewCard.addEventListener('click', (evt) => {
  closeModal(evt, activeModalStyle, popupAddCloseBtn);
});

popupTypeEdit.addEventListener('click', (evt) => {
  closeModal(evt, activeModalStyle, popupEditSubmitBtn);
});

popupTypeNewCard.addEventListener('click', (evt) => {
  closeModal(evt, activeModalStyle, popupAddSubmitBtn);
});

popupTypeImage.addEventListener('click', (evt) => {
  closeModal(evt, activeModalStyle, popupImageCloseBtn);
});

popupEditForm.addEventListener('submit', handleEditFormSubmit);
popupAddForm.addEventListener('submit', handleAddFormSubmit);

// add styles to the list of elements
function addStyleToElements(listOfElements, styleClass) {
  listOfElements.forEach((element) => element.classList.add(styleClass));
}
addStyleToElements(listOfElementsToAnimate, animateModalStyle);

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  placesList.append(createCard(card, removeCard, likeCard, showCardImage));
});
