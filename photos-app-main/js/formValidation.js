//************ ВАЛИДАЦИЯ ФОРМЫ ДЛЯ ЗАГРУЗКИ ФОТО ************/
import { uploadedPhoto } from "./openUploadPictureWindow.js";
import { showSuccess } from "./showSuccess.js";
import { showError } from "./showError.js";
function formValidation(e) {
  e.preventDefault();
  const hashtagsInput = document.querySelector(".text__hashtags"); //Нахожу инпут для ввода хештега
  const hashtagInputValue = hashtagsInput.value.toLowerCase(); //Определяю значение инпута и привожу в нижний регистр
  const spacedArray = hashtagInputValue.split(" "); //разделяю элементы строки на отдельные элементы по пробелу

  if (hashtagsInput.value != "") {
    if (spacedArray.length > 5) {
      hashtagsInput.setCustomValidity("Количество хештегов должно быть 5");
      hashtagsInput.reportValidity();
    } else {
      const hasDuplicates = spacedArray.some(
        (value, index) => spacedArray.indexOf(value) !== index
      ); //Определяю есть ли одинаковые хештеги --ПЕРЕИМЕНОВАТЬ В БОЛЕЕ ПОНЯТНУЮ ПЕРЕМЕННУЮ
      if (hasDuplicates) {
        hashtagsInput.setCustomValidity("Хештеги должны быть разными");
        hashtagsInput.reportValidity();
      } else {
        spacedArray.forEach((e, index) => {
          const isValid = /^[A-Za-z0-9#а-яА-ЯёЁ]+$/u.test(e); //Определяю есть ли невалидные элементы в массиве --ОСТАВИТЬ ТОЛЬКО 1 РЕШЕТКУ
          if (spacedArray[index].length > 20) {
            hashtagsInput.setCustomValidity(
              "Длина одного хештага должна быть меньше 20 символов"
            );
            hashtagsInput.reportValidity();
          } else if (!isValid) {
            hashtagsInput.setCustomValidity("Введите только цифры или буквы");
            hashtagsInput.reportValidity();
          } else {
            const hashtagSymbol = e.split(""); //Разделяю каждый элемент массива на символы
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
  console.log("Uploading file..."); //сообщение о начале загрузки файла
  const API_ENDPOINT = "http://localhost:4001/upload"; //адрес сервера
  const request = new XMLHttpRequest(); //объект, который позволяет делать запросы на сервер
  const formData = new FormData(); //объект для считывания данных с формы

  request.open("POST", API_ENDPOINT, true); //метод для настройки запроса. Третий аргумант указывает на выполнение асинхронного запроса
  request.onreadystatechange = () => {
    if (request.readyState === 4) {
      if (request.status === 200) {
        showSuccess();
        console.log(request.responseText);
      } else {
        showError();
        console.log("Request failed with status:", request.status);
      }
    }
  }; //обработчик события срабатывает каждый раз когда меняется состояние запроса. Если 4, то запрос завершен и если статус 200 то вывожу окно "успех", а если другой код то "нудача"
  formData.append("file", file); //добавляю файл в объект данных с формы
  request.send(formData); //отправляю объект с данными формы на сервер
}; //попробовать через ФЕТЧ!!!

export { formValidation };

//сообщения для валидации в отдельный объект
//указать постоянные константы типа
