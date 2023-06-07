//************ ОТОБРАЖЕНИЕ ФОТО НА СТРАНИЦЕ ************/
import { userPhotos } from "./main.js";
const picturesBlock = document.querySelector(".pictures");
const pictureTemplate = document.querySelector("#picture");

for (let el of userPhotos) {
  const picture = pictureTemplate.content.cloneNode(true);
  const image = picture.querySelector(".picture__img");
  const comments = picture.querySelector(".picture__comments");
  const likes = picture.querySelector(".picture__likes");
  image.src = `${el.url}`;
  comments.textContent = `${el.comments.length}`;
  likes.textContent = `${el.likes}`;
  picturesBlock.append(picture);
}
