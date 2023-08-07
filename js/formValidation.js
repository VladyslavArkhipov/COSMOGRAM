import { uploadedPhoto } from "./openUploadPictureWindow.js";
import { showSuccess } from "./showSuccess.js";
import { showError } from "./showError.js";
function formValidation(e) {
  e.preventDefault();
  const hashtagsInput = document.querySelector(".text__hashtags");
  const hashtagInputValue = hashtagsInput.value.toLowerCase();
  const spacedArray = hashtagInputValue.split(" ");

  if (hashtagsInput.value != "") {
    if (spacedArray.length > 5) {
      hashtagsInput.setCustomValidity("Количество хештегов должно быть 5");
      hashtagsInput.reportValidity();
    } else {
      const hasDuplicates = spacedArray.some(
        (value, index) => spacedArray.indexOf(value) !== index
      );
      if (hasDuplicates) {
        hashtagsInput.setCustomValidity("Хештеги должны быть разными");
        hashtagsInput.reportValidity();
      } else {
        spacedArray.forEach((e, index) => {
          const isValid = /^[A-Za-z0-9#а-яА-ЯёЁ]+$/u.test(e);
          if (spacedArray[index].length > 20) {
            hashtagsInput.setCustomValidity(
              "Длина одного хештага должна быть меньше 20 символов"
            );
            hashtagsInput.reportValidity();
          } else if (!isValid) {
            hashtagsInput.setCustomValidity("Введите только цифры или буквы");
            hashtagsInput.reportValidity();
          } else {
            const hashtagSymbol = e.split("");
            if (hashtagSymbol[0] !== "#") {
              hashtagsInput.setCustomValidity(
                "Первым символом Хештега должен быть '#'"
              );
              hashtagsInput.reportValidity();
            } else {
              hashtagsInput.setCustomValidity("");
              hashtagsInput.reportValidity();

              uploadFile(uploadedPhoto);
            }
          }
        });
      }
    }
  } else {
    uploadFile(uploadedPhoto);
  }
}

const uploadFile = (file) => {
  console.log("Uploading file...");
  const API_ENDPOINT = "http://localhost:4001/upload";
  const formData = new FormData();

  formData.append("file", file);

  fetch(API_ENDPOINT, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        showSuccess();
        return response.text();
      } else {
        showError();
        throw new Error("Request failed with status: " + response.status);
      }
    })
    .then((responseText) => {
      console.log(responseText);
    })
    .catch((error) => {
      console.error(error);
    });
};

export { formValidation };
