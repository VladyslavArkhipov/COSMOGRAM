import { showMiniPictures } from "./showMiniPictures.js";
import { openBigPictureWindow } from "./openBigPictureWindow.js";
import { openUploadPictureWindow } from "./openUploadPictureWindow.js";
import { closeWindow } from "./closeWindow.js";
import { showFilteredPictures } from "./showMiniPictures.js";

const userPhotos = await fetch("http://127.0.0.1:4001/photos")
  .then((response) => response.json())
  .then((json) => {
    return json;
  })
  .catch(() => alert("ERROR")); //создаю переменную для фото. При помощи ключевого слова await указываю что код далее будет начинаться только после окончания загрузки данных с сервера

const picturesBlock = document.querySelector(".pictures"); //Нахожу блок со всеми миниатюрами фото
const bigPictureSection = document.querySelector(".big-picture"); //Нахожу секцию для показа большого фото
const uploadBtn = document.querySelector("#upload-file"); //Нахожу кнопку для закгрузки изображения
const uploadPictureBlock = document.querySelector(".img-upload__overlay"); //Нахожу блок который отрисовывает окно с формой для загрузки фото
const photoFilters = document.querySelector(".img-filters__form"); //нахожу форму для выбора фильтра фото на сайте

showMiniPictures(userPhotos); //функция для отрисовки фото из массива с фото

picturesBlock.addEventListener("click", openBigPictureWindow); //При клике на миниатюру фото открываю окно с фото в большом размере

bigPictureSection.addEventListener("click", closeWindow); //При клике внутри секции с большим фото пока что отработан сценарий закрытия окна

document.addEventListener("keydown", closeWindow); //При нажатии кнопке escape закрывается большое окно с фото

uploadBtn.addEventListener("change", openUploadPictureWindow); //при добавлении фото открывается окно с формой для загрузки фото

uploadPictureBlock.addEventListener("click", closeWindow); //при клике внутри блока загрузки в данном случае будет закрытие окна

photoFilters.addEventListener("click", showFilteredPictures); //при клике на фильтр будет задаваться правило для отображения фото на экране

export { userPhotos };
