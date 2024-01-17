import './index.css';
import { createCard, removeCard, likeCard } from '../components/card';
// import { initialCards } from '../components/cards';
import { openModal, closeModal } from '../components/modal';
import { enableValidation, clearValidation } from '../components/validation';
import {
  getAccountCredentials,
  getInitialCards,
  pushAccountCredentials,
  pushNewPlace,
  pushProfilePicture,
} from '../components/api';

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// profile Nodes
const profilePicture = document.querySelector('.profile__image');
const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAddBtn = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// modal Nodes
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupEditCloseBtn = popupTypeEdit.querySelector('.popup__close');
const popupAddCloseBtn = popupTypeNewCard.querySelector('.popup__close');

// card Image Nodes
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImageFrame = popupTypeImage.querySelector('.popup__image');
const popupImageCaption = popupTypeImage.querySelector('.popup__caption');
const popupImageCloseBtn = popupTypeImage.querySelector('.popup__close');

// popup Edit Form Nodes
const popupProfileForm = document.forms['edit-profile'];
const popupProfileName = popupProfileForm.name;
const popupProfileDescription = popupProfileForm.description;

// popup Add Form Nodes
const popupAddForm = document.forms['new-place'];
const popupAddName = popupAddForm['place-name'];
const popupAddLink = popupAddForm.link;

// modal style modifiers
const activeModalStyle = 'popup_is-opened';
const animateModalStyle = 'popup_is-animated';

// url 404 placeholder image
const image404 =
  'https://previews.123rf.com/images/krisckam/krisckam1307/krisckam130700312/20984907-404-error-file-not-found-illustration-vector.jpg';

// list of elements to animate
const listOfElementsToAnimate = [
  popupTypeEdit,
  popupTypeNewCard,
  popupTypeImage,
];

popupProfileForm.addEventListener('submit', (evt) =>
  handleEditFormSubmit(evt, popupTypeEdit),
);
popupAddForm.addEventListener('submit', (evt) => {
  handleAddFormSubmit(evt, popupTypeNewCard);
  clearValidation(popupAddForm, validationConfig);
});

// add styles to the list of elements
function addStyleToElements(listOfElements, styleClass) {
  listOfElements.forEach((element) => element.classList.add(styleClass));
}
addStyleToElements(listOfElementsToAnimate, animateModalStyle);

export const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
  headers: {
    authorization: '14f77105-3b2d-422f-94c2-318e8127f8a3',
    'Content-Type': 'application/json',
  },
};

// getInitialCards(config).forEach((card) => {
//   placesList.append(createCard(card, removeCard, likeCard, showCardImage));
// });

// console.log(getInitialCards(config));
getInitialCards(config).then((data) => {
  console.log(data);
  data.forEach((card) => {
    placesList.append(createCard(card, removeCard, likeCard, showCardImage));
  });
});

// @todo: Вывести карточки на страницу
// initialCards.forEach((card) => {
//   placesList.append(createCard(card, removeCard, likeCard, showCardImage));
// });

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
async function addPlace(name, link) {
  console.log(name.value, link.value);
  const initCardObj = {};
  initCardObj.name = name.value;
  initCardObj.link = await loadURL(link.value, image404)
    .then((resolve) => {
      if (!resolve.ok) return image404;
      return resolve.url;
    })
    .catch(() => image404);

  placesList.prepend(
    createCard(initCardObj, removeCard, likeCard, showCardImage),
  );
  // console.log(name, link.value);
  pushNewPlace(config, initCardObj.name, initCardObj.link);
}

// URL fetch
function loadURL(url, urlError) {
  return new Promise((resolve, reject) => {
    const res = fetch(url);
    resolve(res);
    reject(urlError);
  });
}

// clearing inputs
function clearInputFields(name, link) {
  name.value = '';
  link.value = '';
}

// submit handler add card
function handleAddFormSubmit(evt, modalNode) {
  evt.preventDefault();
  addPlace(popupAddName, popupAddLink);
  clearInputFields(popupAddName, popupAddLink);
  closeModal(activeModalStyle, modalNode, onKeyDown);
}

// submit handler edit profile
function handleEditFormSubmit(evt, modalNode) {
  evt.preventDefault();
  profileTitle.textContent = popupProfileName.value;
  profileDescription.textContent = popupProfileDescription.value;
  pushAccountCredentials(
    config,
    popupProfileName.value,
    popupProfileDescription.value,
  );
  closeModal(activeModalStyle, modalNode, onKeyDown);
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
  clearValidation(popupProfileForm, validationConfig);
  setCredentials();
  openModal(activeModalStyle, popupTypeEdit, onKeyDown);
});

//  open edit modal
profileEditBtn.addEventListener('click', () => {
  clearValidation(popupProfileForm, validationConfig);
  setCredentials();
  openModal(activeModalStyle, popupTypeEdit, onKeyDown);
});

//  open add modal
profileAddBtn.addEventListener('click', () => {
  openModal(activeModalStyle, popupTypeNewCard, onKeyDown);
});

// close modal EventListeners
// profile close modal
popupTypeEdit.addEventListener('click', (evt) =>
  handleCloseModal(evt, popupTypeEdit, popupEditCloseBtn),
);

// add card close modal
popupTypeNewCard.addEventListener('click', (evt) =>
  handleCloseModal(evt, popupTypeNewCard, popupAddCloseBtn),
);

// image card close modal
popupTypeImage.addEventListener('click', (evt) =>
  handleCloseModal(evt, popupTypeImage, popupImageCloseBtn),
);

// validation variables
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_is-inactive',
  inputErrorClass: 'popup__input-error',
  errorElementClass: 'popup__input-error_active',
};

// validation
enableValidation(validationConfig);

// sync account credentials
function updateAccountCredentials(config) {
  getAccountCredentials(config).then((data) => {
    console.log(data.name);
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    profilePicture.style.backgroundImage = `url(${data.avatar})`;
  });
}
updateAccountCredentials(config);

// sync account pfp
function setProfilePicture(config) {
  pushProfilePicture(
    config,
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Dasha_Nekrasova.jpg/800px-Dasha_Nekrasova.jpg',
  );
}
// setProfilePicture(config);
