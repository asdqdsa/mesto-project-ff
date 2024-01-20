import './index.css';
import { createCard, removeCard, likeCard } from '../components/card';
import { openModal, closeModal } from '../components/modal';
import { enableValidation, clearValidation } from '../components/validation';
import {
  getAccountCredentials,
  getInitialCards,
  pushAccountCredentials,
  pushNewPlace,
  pushProfilePicture,
} from '../components/api';

// ID
const ACC_ID = localStorage.getItem('ACC_ID_MESTO');

// config request
export const REQUEST_CONFIG = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
  headers: {
    authorization: '14f77105-3b2d-422f-94c2-318e8127f8a3',
    'Content-Type': 'application/json',
  },
};

// validation variables
const VALIDATION_CONFIG = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_is-inactive',
  inputErrorClass: 'popup__input-error',
  errorElementClass: 'popup__input-error_active',
};

// DOM узлы
const placesList = document.querySelector('.places__list');

// profile Nodes
const profilePicture = document.querySelector('.profile__image');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// modal Nodes
const popupTypeProfile = document.querySelector('.popup_type_profile');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupProfileCloseBtn = popupTypeProfile.querySelector('.popup__close');
const popupEditCloseBtn = popupTypeEdit.querySelector('.popup__close');
const popupAddCloseBtn = popupTypeNewCard.querySelector('.popup__close');

// card Image Nodes
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImageFrame = popupTypeImage.querySelector('.popup__image');
const popupImageCaption = popupTypeImage.querySelector('.popup__caption');
const popupImageCloseBtn = popupTypeImage.querySelector('.popup__close');

// popup Profile Form Nodes
const popupProfilePictureForm = document.forms['new-picture'];
const popupAddPictureLink = popupProfilePictureForm.link;

// popup Edit Form Nodes
const popupProfileInfoForm = document.forms['edit-profile'];
const popupProfileName = popupProfileInfoForm.name;
const popupProfileDescription = popupProfileInfoForm.description;

// popup Add Form Nodes
const popupAddForm = document.forms['new-place'];
const popupAddName = popupAddForm['place-name'];
const popupAddLink = popupAddForm.link;

// modal style modifiers
const activeModalStyle = 'popup_is-opened';
const animateModalStyle = 'popup_is-animated';

// list of elements to animate
const listOfElementsToAnimate = [
  popupTypeEdit,
  popupTypeNewCard,
  popupTypeImage,
  popupTypeProfile,
];

// popup submit listeners
// submit profile-picture
popupProfilePictureForm.addEventListener('submit', (evt) =>
  handleProfileFormSubmit(evt, popupTypeProfile),
);

// submit profile-info
popupProfileInfoForm.addEventListener('submit', (evt) => {
  handleEditFormSubmit(evt, popupTypeEdit);
  clearValidation(popupProfileInfoForm, VALIDATION_CONFIG);
});

// submit add-place
popupAddForm.addEventListener('submit', (evt) =>
  handleAddFormSubmit(evt, popupTypeNewCard),
);

// add styles to the list of elements
function addStyleToElements(listOfElements, styleClass) {
  listOfElements.forEach((element) => element.classList.add(styleClass));
}
addStyleToElements(listOfElementsToAnimate, animateModalStyle);

// handle show cards photo
function showCardImage(name, link) {
  openModal(activeModalStyle, popupTypeImage, onKeyDown);
  popupImageFrame.src = link;
  popupImageFrame.alt = `Фотография местности ${name}`;
  popupImageCaption.textContent = name;
}

// filling in profile credentials
function setCredentials() {
  popupProfileName.value = profileTitle.textContent;
  popupProfileDescription.value = profileDescription.textContent;
}

// add place with name and a link for image
function addPlace(name, link, modalNode, accountId) {
  pushNewPlace(REQUEST_CONFIG, name.value, link.value.trim())
    .then((data) => {
      clearInputFields(popupAddName, popupAddLink);
      closeModal(activeModalStyle, modalNode, onKeyDown);
      clearValidation(popupAddForm, VALIDATION_CONFIG);
      placesList.prepend(
        createCard(data, removeCard, likeCard, showCardImage, accountId),
      );
    })
    .catch((error) => console.error(error))
    .finally(() => renderLoading(false, modalNode));
}

// clear given inputs
function clearInputFields(...inputs) {
  inputs.forEach((input) => (input.value = ''));
}

// submit handler set pfp
function handleProfileFormSubmit(evt, modalNode) {
  evt.preventDefault();
  renderLoading(true, modalNode);
  setProfilePicture(REQUEST_CONFIG, modalNode)
    .then(() => clearValidation(popupProfilePictureForm, VALIDATION_CONFIG))
    .catch((error) => error)
    .finally(() => renderLoading(false, modalNode));
}

// submit handler add card
function handleAddFormSubmit(evt, modalNode) {
  evt.preventDefault();
  renderLoading(true, modalNode);
  addPlace(popupAddName, popupAddLink, modalNode, ACC_ID);
  clearValidation(popupAddForm, VALIDATION_CONFIG);
}

// submit handler edit profile
function handleEditFormSubmit(evt, modalNode) {
  evt.preventDefault();
  renderLoading(true, modalNode);
  pushAccountCredentials(
    REQUEST_CONFIG,
    popupProfileName.value,
    popupProfileDescription.value,
  )
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(activeModalStyle, modalNode, onKeyDown);
    })
    .catch((error) => console.error(error))
    .finally(() => renderLoading(false, modalNode));
}

// submit loading UX
function renderLoading(isLoading, modalElement) {
  const popupSubmitButton = modalElement.querySelector('.popup__button');
  if (isLoading) {
    popupSubmitButton.textContent = 'Сохранение...';
  } else {
    popupSubmitButton.textContent = 'Сохранить';
  }
}

// ESC keydown handler
function onKeyDown(evt) {
  if (evt.key === 'Escape') {
    const openedModalWindow = document.querySelector('.popup_is-opened');
    if (openedModalWindow) {
      closeModal(activeModalStyle, openedModalWindow, onKeyDown);
    }
  }
}

// close popup handler
function handleCloseModal(evt, modalNode, closeBtnNode) {
  if (evt.target === evt.currentTarget || evt.target === closeBtnNode) {
    closeModal(activeModalStyle, modalNode, onKeyDown);
  }
}

// open modal EventListeners
// open pfp modal
profilePicture.addEventListener('click', () => {
  openModal(activeModalStyle, popupTypeProfile, onKeyDown);
});

//  open edit modal
profileEditBtn.addEventListener('click', () => {
  openModal(activeModalStyle, popupTypeEdit, onKeyDown);
  clearValidation(popupProfileInfoForm, VALIDATION_CONFIG);
  setCredentials();
  openModal(activeModalStyle, popupTypeEdit, onKeyDown);
});

//  open add modal
profileAddBtn.addEventListener('click', () => {
  openModal(activeModalStyle, popupTypeNewCard, onKeyDown);
});

// close modal EventListeners
// profile pfp close modal
popupTypeProfile.addEventListener('click', (evt) => {
  handleCloseModal(evt, popupTypeProfile, popupProfileCloseBtn);
});

// profile description close modal
popupTypeEdit.addEventListener('click', (evt) => {
  handleCloseModal(evt, popupTypeEdit, popupEditCloseBtn);
});

// add card close modal
popupTypeNewCard.addEventListener('click', (evt) => {
  handleCloseModal(evt, popupTypeNewCard, popupAddCloseBtn);
});

// image card close modal
popupTypeImage.addEventListener('click', (evt) => {
  handleCloseModal(evt, popupTypeImage, popupImageCloseBtn);
});

// validation
enableValidation(VALIDATION_CONFIG);

// set account pfp
function setProfilePicture(config, modalNode) {
  const link = popupAddPictureLink.value.trim();
  return pushProfilePicture(config, link)
    .then((data) => {
      profilePicture.style.backgroundImage = `url(${data.avatar}`;
      clearInputFields(popupAddPictureLink);
      closeModal(activeModalStyle, modalNode, onKeyDown);
    })
    .catch((error) => console.log(error));
}

// sync account data, get id, get cards, render cards
Promise.all([getAccountCredentials(REQUEST_CONFIG), getInitialCards(REQUEST_CONFIG)])
  .then(([accountData, cardsData]) => {
    localStorage.setItem('ACC_ID_MESTO', accountData['_id']);
    profileTitle.textContent = accountData.name;
    profileDescription.textContent = accountData.about;
    profilePicture.style.backgroundImage = `url(${accountData.avatar})`;
    cardsData.forEach((card) => {
      placesList.append(
        createCard(card, removeCard, likeCard, showCardImage, accountData['_id']),
      );
    });
  })
  .catch((error) => error);
