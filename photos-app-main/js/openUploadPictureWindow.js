//************ ОТОБРАЖЕНИЕ ЭКРАНА ДЛЯ ЗАГРУЗКИ НОВОГО ФОТО ************/
import { formValidation } from "./formValidation.js";
import { imageEffects } from "./imageEffects.js";
import { createSlider } from "./imageEffects.js";

const formSubmitBtn = document.querySelector(".img-upload__submit"); //Нахожу кнопку для отправки формы с новым фото
const uploadPictureBlock = document.querySelector(".img-upload__overlay");
const body = document.querySelector("body"); //Нахожу тег body
const imageUpload = document.querySelector(".img-upload__input"); //нахожу инпут для добавления фото
const imageContainer = document.querySelector(".img-upload__preview");
const uploadedImage = imageContainer.querySelector("img"); //нахожу тег для добавления фото
let uploadedPhoto; //объявляю переменную которая будет в себе хранить выбранное фото

imageUpload.addEventListener("change", uploadImage);

function openUploadPictureWindow() {
  body.classList.add("modal-open");
  uploadPictureBlock.classList.remove("hidden");

  createSlider("remove");
  uploadedImage.className = "";
  uploadedImage.style.filter = ``;
  imageEffects();
  formSubmitBtn.addEventListener("click", formValidation); //При нажатии на кнопку для отправки формы происходит валидация формы
} //При добавлении фото меняются классы элементов бади и блока с формой для загрузки фото

function uploadImage(e) {
  const file = e.target.files[0]; //определяю выбранный файл
  uploadedPhoto = file; //присваиваю его переменной которая ему соответствует

  const reader = new FileReader(); //создаю объект который позволяет читать содержимое файлов
  reader.readAsDataURL(file); //запускает процесс чтения файла в формате ЮРЛ

  reader.onload = function (e) {
    uploadedImage.src = e.target.result;
  }; //когда процесс чтения файла завершен то вызывается функция которая указывает путь к картинке
}
export { uploadedPhoto };
export { openUploadPictureWindow };
