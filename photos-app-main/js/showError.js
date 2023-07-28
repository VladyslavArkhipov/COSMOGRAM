import { closeWindow } from "./closeWindow.js";
export function showError() {
  const documentFragment = document.createDocumentFragment();
  const errorMessageTemplate = document.querySelector("#error");
  const body = document.querySelector(".body");
  const uploadPictureBlock = document.querySelector(".img-upload__overlay");

  uploadPictureBlock.classList.add("hidden");
  body.classList.remove("modal-open");

  const errorMessage = errorMessageTemplate.content.cloneNode(true);
  documentFragment.appendChild(errorMessage);
  body.appendChild(documentFragment);
  const errorSection = document.querySelector(".error");
  errorSection.addEventListener("click", closeWindow);
}
