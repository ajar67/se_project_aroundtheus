function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", closePopupByEsc);
}
function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

function closePopupByOverlayClick(evt) {
  if (evt.target.matches(".modal")) {
    closePopup(evt.target);
  }
}

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const modalOpened = document.querySelector(".modal_opened");
    closePopup(modalOpened);
  }
}
