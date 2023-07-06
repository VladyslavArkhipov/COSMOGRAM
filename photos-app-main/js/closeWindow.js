//************ ЗАКРЫТИЕ ОКОН НА САЙТЕ ************/
function closeWindow(e) {
  const uploadPictureBlock = document.querySelector(".img-upload__overlay"); //Нахожу блок с формой для загрузки фото
  const bigPictureSection = document.querySelector(".big-picture"); //Нахожу секцию для показа большого фото
  const body = document.querySelector("body"); //Нахожу тег body
  const form = document.querySelector(".img-upload__form"); //Нахожу форму для загрузки фото
  const commentInput = form.querySelector(".text__description"); //Нахожу инпут для комментария
  const hashtagInput = form.querySelector(".text__hashtags"); //Нахожу инпут для хештегов
  const successBlock = document.querySelector(".success");
  const errorBlock = document.querySelector(".error");

  if (
    (e.key === `Escape` && document.activeElement === commentInput) ||
    (e.key === `Escape` && document.activeElement === hashtagInput)
  ) {
    e.preventDefault();
  } else if (
    (e.key === `Escape` && !bigPictureSection.classList.contains("hidden")) ||
    e.target.className === "big-picture overlay" ||
    e.target.id === "picture-cancel"
  ) {
    bigPictureSection.classList.add("hidden");
    body.classList.remove("modal-open");
  } else if (
    (e.key === `Escape` && !uploadPictureBlock.classList.contains("hidden")) ||
    e.target.id === "upload-cancel"
  ) {
    form.reset();
    uploadPictureBlock.classList.add("hidden");
    body.classList.remove("modal-open");
  } else if (
    (e.key === `Escape` && !errorBlock) ||
    e.target.className === "success" ||
    e.target.className === "success__button"
  ) {
    successBlock.remove();
    form.reset();
  } else if (
    (e.key === `Escape` && !successBlock) ||
    e.target.className === "error" ||
    e.target.className === "error__button"
  ) {
    errorBlock.remove();
    form.reset();
  }
} //Функция для закрытия окна. При нажатии кнопки Escape или при клике на кнопку с типом Reset или на пустом месте - будет добавляться класс к секции с большим фото и убираться класс у тега body

export { closeWindow };
