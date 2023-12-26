// open modal
export function openModal(styleClass, modalNode, onKeyDownHandler) {
  modalNode.classList.add(styleClass);
  document.addEventListener('keydown', onKeyDownHandler);
}

// close modal
export function closeModal(styleClass, modalNode, onKeyDownHandler) {
  modalNode.classList.remove(styleClass);
  document.removeEventListener('keydown', onKeyDownHandler);
}
