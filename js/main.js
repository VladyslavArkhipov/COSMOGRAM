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
  .catch(() => alert("ERROR"));
const picturesBlock = document.querySelector(".pictures");
const bigPictureSection = document.querySelector(".big-picture");
const uploadBtn = document.querySelector("#upload-file");
const uploadPictureBlock = document.querySelector(".img-upload__overlay");
const photoFilters = document.querySelector(".img-filters__form");

showMiniPictures(userPhotos);

picturesBlock.addEventListener("click", openBigPictureWindow);

bigPictureSection.addEventListener("click", closeWindow);

document.addEventListener("keydown", closeWindow);

uploadBtn.addEventListener("change", openUploadPictureWindow);

uploadPictureBlock.addEventListener("click", closeWindow);

photoFilters.addEventListener("click", showFilteredPictures);

export { userPhotos };
