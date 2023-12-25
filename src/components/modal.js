// open modal
export function openModal(styleClass, modalNode, onKeyDownHandler) {
  modalNode.classList.add(styleClass);
  document.addEventListener('keydown', onKeyDownHandler);
}

// close modal
export function closeModal(
  styleClass,
  modalNode,
  onKeyDownHandler,
  closeBtnNode,
  evt,
) {
  if (evt.target === evt.currentTarget || evt.target === closeBtnNode) {
    modalNode.classList.remove(styleClass);
    document.removeEventListener('keydown', onKeyDownHandler);
  }
}
