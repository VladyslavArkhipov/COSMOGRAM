//************ ОТОБРАЖЕНИЕ ЭКРАНА ДЛЯ ЗАГРУЗКИ НОВОГО ФОТО ************/
import { formValidation } from "./formValidation.js";
import { imageEffects } from "./imageEffects.js";
const image = document.querySelector(".img-upload__preview"); //нахожу картинку
function openUploadPictureWindow() {
  const formSubmitBtn = document.querySelector(".img-upload__submit"); //Нахожу кнопку для отправки формы с новым фото
  const uploadPictureBlock = document.querySelector(".img-upload__overlay");
  const body = document.querySelector("body"); //Нахожу тег body

  body.classList.add("modal-open");
  uploadPictureBlock.classList.remove("hidden");
  image.style.transform = `scale(1)`;
  image.style.filter = ``;
  imageEffects();
  formSubmitBtn.addEventListener("click", formValidation); //При нажатии на кнопку для отправки формы происходит валидация формы
} //При добавлении фото меняются классы элементов бади и блока с формой для загрузки фото

export { openUploadPictureWindow };
