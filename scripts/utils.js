export function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", closePopupByEsc);
}
export function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

export function closePopupByOverlayClick(evt) {
  if (evt.target.matches(".modal")) {
    closePopup(evt.target);
  }
}

export function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closePopup(modalOpened);
  }
}
