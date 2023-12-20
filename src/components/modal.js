import { initialCards } from './cards';

// popup Nodes
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

// popup Edit Form Nodes
const popupEditForm = document.forms['edit-profile'];
const popupName = popupEditForm.name;
const popupDescription = popupEditForm.description;

// handle edit and submit
function handleEditFormSubmit(evt) {
  console.log('formsubmit');
  evt.preventDefault();
  profileTitle.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
}

popupEditForm.addEventListener('submit', handleEditFormSubmit);

// profile Nodes
const profileInfo = document.querySelector('.profile__info');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// list of elements to animate
const listOfElementsToAnimate = [
  popupTypeEdit,
  popupTypeNewCard,
  popupTypeImage,
];
// utility func adding styles to elements
function addStyleToElements(listOfElements, styleClass) {
  listOfElements.forEach((element) => element.classList.add(styleClass));
}
addStyleToElements(listOfElementsToAnimate, 'popup_is-animated');

// popup delegation which to open
export function toggleModal(evt) {
  const isImageSelected = evt.target.closest('.profile__image');
  const isEditBtnSelected = evt.target.closest('.profile__edit-button');
  const isAddBtnSelected = evt.target.closest('.profile__add-button');

  if (isImageSelected || isEditBtnSelected) {
    toggleElement(popupTypeEdit, 'popup_is-opened');
    document.removeEventListener('keydown', onKeyDown);
    setCredentials();
  } else if (isAddBtnSelected) {
    toggleElement(popupTypeNewCard, 'popup_is-opened');
    document.removeEventListener('keydown', onKeyDown);
  }
}

// popup Add Form Nodes
const popupAddForm = document.forms['new-place'];
const popupAddName = popupAddForm['place-name'];
const popupAddLink = popupAddForm.link;
const placesList = document.querySelector('.places__list');
// func add place with name and a link for image
export function addPlace(name, link) {
  const initCardObj = {};
  initCardObj.name = name.value;
  initCardObj.link = link.value;
  initialCards.unshift(initCardObj);
  // placesList.prepend.
}

function handleAddFormSubmit(evt) {
  console.log('formsubmit');
  evt.preventDefault();
  addPlace(popupAddName, popupAddLink);
}

popupAddForm.addEventListener('submit', handleAddFormSubmit);

// popup toggling
function toggleElement(element, styleClass) {
  element.classList.add(styleClass);
  element.addEventListener('click', (evt) =>
    closePopup(evt, element, styleClass),
  );
  document.addEventListener('keydown', (evt) =>
    onKeyDown(evt, element, styleClass),
  );
}

// handle close popup on click
function closePopup(evt, element, styleClass) {
  if (
    evt.target === element ||
    evt.target === element.querySelector('.popup__close') ||
    evt.target === element.querySelector('.popup__button')
  ) {
    element.classList.remove(styleClass);
  }
}

// handle close popup on key ESC
function onKeyDown(evt, element, styleClass) {
  if (evt.key === 'Escape') {
    element.classList.remove(styleClass);
  }
}

// filling in profile credentials
function setCredentials() {
  popupName.value = profileTitle.textContent;
  popupDescription.value = profileDescription.textContent;
}
