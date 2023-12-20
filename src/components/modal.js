import { initialCards } from './cards';

import { createCard, removeCard, likeCard, showCardImage } from './card';

import {
  profileTitle,
  profileDescription,
  popupTypeEdit,
  popupTypeNewCard,
  activeModalStyle,
  popupName,
  popupDescription,
  popupAddName,
  popupAddLink,
  placesList,
} from '../scripts/index';

// handle edit and submit
export function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
}

// func add place with name and a link for image
function addPlace(name, link) {
  const initCardObj = {};
  initCardObj.name = name.value;
  initCardObj.link = link.value;
  initialCards.unshift(initCardObj);
  placesList.prepend(
    createCard(initCardObj, removeCard, likeCard, showCardImage),
  );
}

export function handleAddFormSubmit(evt) {
  evt.preventDefault();
  addPlace(popupAddName, popupAddLink);
  clearInputFields(popupAddName, popupAddLink);
}

// filling in profile credentials
function setCredentials() {
  popupName.value = profileTitle.textContent;
  popupDescription.value = profileDescription.textContent;
}

// clearing inputs
function clearInputFields(name, link) {
  name.value = '';
  link.value = '';
}

// open modal
export function openModal(evt, styleClass, modalNode) {
  modalNode.classList.add(styleClass);
  setCredentials();
}

export function closeModal(evt, styleClass, closeBtnNode) {
  if (evt.target === evt.currentTarget || evt.target === closeBtnNode) {
    evt.currentTarget.classList.remove(styleClass);
  }
}

function wrapperOnKeyDown(popupEdit, popupNewCard, styleClass) {
  if (popupEdit.classList.contains(styleClass)) {
    popupEdit.classList.remove(styleClass);
  }
  if (popupNewCard.classList.contains(styleClass)) {
    popupNewCard.classList.remove(styleClass);
  }
}

export function onKeyDown(evt) {
  if (evt.key === 'Escape') {
    wrapperOnKeyDown(popupTypeEdit, popupTypeNewCard, activeModalStyle);
    document.removeEventListener('keydown', onKeyDown);
  }
}
