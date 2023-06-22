//************ ВАЛИДАЦИЯ ФОРМЫ ДЛЯ ЗАГРУЗКИ ФОТО ************/

function formValidation() {
  const hashtagsInput = document.querySelector(".text__hashtags"); //Нахожу инпут для ввода хештега
  const hashtagInputValue = hashtagsInput.value.toLowerCase(); //Определяю значение инпута и привожу в нижний регистр
  const spacedArray = hashtagInputValue.split(" "); //разделяю элементы строки на отдельные элементы по пробелу
  if (spacedArray.length > 5) {
    hashtagsInput.setCustomValidity("Количество хештегов должно быть 5");
    hashtagsInput.reportValidity();
  } else {
    const hasDuplicates = spacedArray.some(
      (value, index) => spacedArray.indexOf(value) !== index
    ); //Определяю есть ли одинаковые хештеги
    if (hasDuplicates) {
      hashtagsInput.setCustomValidity("Хештеги должны быть разными");
      hashtagsInput.reportValidity();
    } else {
      spacedArray.forEach((e, index) => {
        const isValid = /^[A-Za-z0-9#]+$/.test(e); //Определяю есть ли невалидные элементы в массиве
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
          }
        }
      });
    }
  }
}

export { formValidation };
