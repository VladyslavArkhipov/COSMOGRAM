//************ ОТОБРАЖЕНИЕ ЭКРАНА ДЛЯ ЗАГРУЗКИ НОВОГО ФОТО ************/
function openUploadPictureWindow() {
  const uploadPictureBlock = document.querySelector(".img-upload__overlay");
  const body = document.querySelector("body"); //Нахожу тег body

  body.classList.add("modal-open");
  uploadPictureBlock.classList.remove("hidden");
} //При добавлении фото меняются классы элементов бади и блока с формой для загрузки фото

export { openUploadPictureWindow };
