function closeWindow(e) {
  const uploadPictureBlock = document.querySelector(".img-upload__overlay");
  const bigPictureSection = document.querySelector(".big-picture");
  const body = document.querySelector("body");
  const form = document.querySelector(".img-upload__form");
  const commentInput = form.querySelector(".text__description");
  const hashtagInput = form.querySelector(".text__hashtags");
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
}

export { closeWindow };
