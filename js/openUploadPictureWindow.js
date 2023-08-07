import { formValidation } from "./formValidation.js";
import { imageEffects } from "./imageEffects.js";
import { createSlider } from "./imageEffects.js";

const formSubmitBtn = document.querySelector(".img-upload__submit");
const uploadPictureBlock = document.querySelector(".img-upload__overlay");
const body = document.querySelector("body");
const imageUpload = document.querySelector(".img-upload__input");
const imageContainer = document.querySelector(".img-upload__preview");
const uploadedImage = imageContainer.querySelector("img");
let uploadedPhoto;

imageUpload.addEventListener("change", uploadImage);

function openUploadPictureWindow() {
  body.classList.add("modal-open");
  uploadPictureBlock.classList.remove("hidden");

  createSlider("remove");
  uploadedImage.className = "";
  uploadedImage.style.filter = ``;
  uploadedImage.style.transform = `scale(1)`;
  imageEffects();
  formSubmitBtn.addEventListener("click", formValidation);
}

function uploadImage(e) {
  const file = e.target.files[0];
  uploadedPhoto = file;

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = function (e) {
    uploadedImage.src = e.target.result;
  };
}
export { uploadedPhoto };
export { openUploadPictureWindow };
