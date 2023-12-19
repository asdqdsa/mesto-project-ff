const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');

export function toggleModal(evt) {
  const isImageSelected = evt.target.closest('.profile__image');
  const isEditBtnSelected = evt.target.closest('.profile__edit-button');
  const isAddBtnSelected = evt.target.closest('.profile__add-button');

  if (isImageSelected || isEditBtnSelected) {
    toggleElement(popupTypeEdit, 'popup_is-opened');
    document.removeEventListener('keydown', onKeyDown);
  } else if (isAddBtnSelected) {
    toggleElement(popupTypeNewCard, 'popup_is-opened');
    document.removeEventListener('keydown', onKeyDown);
  }
}

function toggleElement(element, styleClass) {
  element.classList.add(styleClass);
  element.addEventListener('click', (evt) => {
    if (evt !== element) {
      element.classList.remove(styleClass);
    }
  });
  document.addEventListener('keydown', (evt) =>
    onKeyDown(evt, element, styleClass),
  );
}

function onKeyDown(evt, element, styleClass) {
  if (evt.key === 'Escape') {
    element.classList.remove(styleClass);
  }
}
