import { closeWindow } from "./closeWindow.js";
export function showSuccess() {
  const documentFragment = document.createDocumentFragment(); //создаю фрагмент документа, в который буду добавлять элементы фото
  const successMessageTemplate = document.querySelector("#success"); //нахожу шаблон с кодом для вставки фото
  const body = document.querySelector(".body");
  const uploadPictureBlock = document.querySelector(".img-upload__overlay");

  uploadPictureBlock.classList.add("hidden");
  body.classList.remove("modal-open");

  const successMessage = successMessageTemplate.content.cloneNode(true);
  documentFragment.appendChild(successMessage);
  body.appendChild(documentFragment);
  const successSection = document.querySelector(".success");
  successSection.addEventListener("click", closeWindow);
}
