//************ ОТОБРАЖЕНИЕ ФОТО НА СТРАНИЦЕ ************/
import { userPhotos } from "./main.js"; //импортирую массив объектов с фото
const picturesBlock = document.querySelector(".pictures"); //нахожу блок в который вставлять фото
const pictureTemplate = document.querySelector("#picture"); //нахожу шаблон с кодом для вставки фото

userPhotos.forEach((photo) => {
  const picture = pictureTemplate.content.cloneNode(true);
  const image = picture.querySelector(".picture__img");
  const comments = picture.querySelector(".picture__comments");
  const likes = picture.querySelector(".picture__likes");
  image.src = `${photo.url}`;
  comments.textContent = `${photo.comments.length}`;
  likes.textContent = `${photo.likes}`;
  picturesBlock.append(picture);
}); //перебираю элементы массива для того, чтобы после клонирования содержимого шаблона, можно было указать необходимые данные внутри контента
