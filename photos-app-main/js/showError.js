import { closeWindow } from "./closeWindow.js";
export function showError() {
  const documentFragment = document.createDocumentFragment(); //создаю фрагмент документа, в который буду добавлять элементы фото
  const errorMessageTemplate = document.querySelector("#error"); //нахожу шаблон с кодом для вставки фото
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
