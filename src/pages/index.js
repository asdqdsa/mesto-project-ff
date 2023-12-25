import '../pages/index.css';
import { createCard, removeCard, likeCard } from '../components/card';
import { initialCards } from '../components/cards';
import { openModal, closeModal } from '../components/modal';

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
const popupEditSubmitBtn = popupTypeEdit.querySelector('.popup__button');
const popupAddSubmitBtn = popupTypeNewCard.querySelector('.popup__button');

// card Image Nodes
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImageFrame = popupTypeImage.querySelector('.popup__image');
const popupImageCaption = popupTypeImage.querySelector('.popup__caption');
const popupImageCloseBtn = popupTypeImage.querySelector('.popup__close');

// popup Edit Form Nodes
const popupEditForm = document.forms['edit-profile'];
const popupName = popupEditForm.name;
const popupDescription = popupEditForm.description;

// popup Add Form Nodes
const popupAddForm = document.forms['new-place'];
const popupAddName = popupAddForm['place-name'];
const popupAddLink = popupAddForm.link;

// modal style modifiers
const activeModalStyle = 'popup_is-opened';
const animateModalStyle = 'popup_is-animated';

// url 404 placeholder image
const image404 = '../images/image_404.jpg';

// list of elements to animate
const listOfElementsToAnimate = [
  popupTypeEdit,
  popupTypeNewCard,
  popupTypeImage,
];

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

// handle show cards photo
function showCardImage(name, link) {
  openModal(activeModalStyle, popupTypeImage, onKeyDown);
  popupImageFrame.src = link;
  popupImageFrame.alt = `Фотография местности ${name}`;
  popupImageCaption.textContent = name;
  popupTypeImage.addEventListener('click', (evt) => {
    closeModal(
      activeModalStyle,
      popupTypeImage,
      onKeyDown,
      popupImageCloseBtn,
      evt,
    );
  });
}

// filling in profile credentials
function setCredentials() {
  popupName.value = profileTitle.textContent;
  popupDescription.value = profileDescription.textContent;
}

// add place with name and a link for image
async function addPlace(name, link) {
  const initCardObj = {};
  initCardObj.name = name.value;
  initCardObj.link = await loadURL(link.value, image404)
    .then((resolve) => resolve.url)
    .catch((reject) => reject);

  placesList.prepend(
    createCard(initCardObj, removeCard, likeCard, showCardImage),
  );
}

// URL fetch
function loadURL(url, urlError) {
  return new Promise(async function (resolve, reject) {
    const res = await fetch(url);
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
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  addPlace(popupAddName, popupAddLink);
  clearInputFields(popupAddName, popupAddLink);
}

// submit handler edit profile
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = popupName.value;
  profileDescription.textContent = popupDescription.value;
}

// ESC keydown handler
function onKeyDown(evt) {
  const openedModulWindow = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape') {
    if (openedModulWindow) {
      openedModulWindow.classList.remove('popup_is-opened');
    }
    document.removeEventListener('keydown', onKeyDown);
  }
}

// open modal EventListeners
// open pfp modal
profilePicture.addEventListener('click', () => {
  setCredentials();
  openModal(activeModalStyle, popupTypeEdit, onKeyDown);
});

//  open edit modal
profileEditBtn.addEventListener('click', () => {
  setCredentials();
  openModal(activeModalStyle, popupTypeEdit, onKeyDown);
});

//  open add modal
profileAddBtn.addEventListener('click', () => {
  openModal(activeModalStyle, popupTypeNewCard, onKeyDown);
});

// close modal EventListeners
// profile close modal
popupTypeEdit.addEventListener('click', (evt) => {
  closeModal(
    activeModalStyle,
    popupTypeEdit,
    onKeyDown,
    popupEditCloseBtn,
    evt,
  );
});

// profile submit modal
popupTypeEdit.addEventListener('click', (evt) => {
  closeModal(
    activeModalStyle,
    popupTypeEdit,
    onKeyDown,
    popupEditSubmitBtn,
    evt,
  );
});

// add card close modal
popupTypeNewCard.addEventListener('click', (evt) => {
  closeModal(
    activeModalStyle,
    popupTypeNewCard,
    onKeyDown,
    popupAddCloseBtn,
    evt,
  );
});

// add card submit modal
popupTypeNewCard.addEventListener('click', (evt) => {
  closeModal(
    activeModalStyle,
    popupTypeNewCard,
    onKeyDown,
    popupAddSubmitBtn,
    evt,
  );
});
