//************ ВАЛИДАЦИЯ ФОРМЫ ДЛЯ ЗАГРУЗКИ ФОТО ************/
const form = document.querySelector(".img-upload__form");
const commentInput = form.querySelector(".text__description");

form.addEventListener("submit", (e) => {
  e.preventDefault();
});
