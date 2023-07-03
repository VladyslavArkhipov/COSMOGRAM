import noUiSlider from "../node_modules/nouislider/dist/nouislider.mjs";

const scaleBlock = document.querySelector(".scale"); //Нахожу блок с кнопками для масштаба
const effectsList = document.querySelector(".effects__list"); //нахожу блок с выбором эффектов
const scaleValue = document.querySelector(".scale__control--value"); //Нахожу блок со значением масштаба фото
const image = document.querySelector(".img-upload__preview"); //нахожу картинку
const maxScale = 100; //максимальное значение масштаба
const minScale = 25; //минимальное значение масштаба
const slider = document.querySelector("#slider"); //нахожу элемент который будет отвечать за слайдер
const chrome = {
  minValue: 0,
  maxValue: 1,
  step: 0.1,
}; //параметры для эффекта хром
const sepia = {
  minValue: 0,
  maxValue: 1,
  step: 0.1,
}; //параметры для эффекта сепия
const marvin = {
  minValue: 0,
  maxValue: 100,
  step: 1,
}; //параметры для эффекта марвин
const phobos = {
  minValue: 0,
  maxValue: 3,
  step: 0.1,
}; //параметры для эффекта фобос
const heat = {
  minValue: 1,
  maxValue: 3,
  step: 0.1,
}; //параметры для эффекта яркости

export function imageEffects() {
  scaleBlock.addEventListener("click", scale);
  effectsList.addEventListener("click", getFilter);
} //экспортирую функцию с обработчиками событий для масштаба и для фильтра

function scale(e) {
  let value = +scaleValue.value.substring(0, scaleValue.value.length - 1); //переменная для получения значения масштаба - привожу к числу и удаляю последний элемент так как там процент
  if (value >= minScale && value <= maxScale) {
    if (e.target.id === "smaller" && value > minScale) {
      value -= 25;
      scaleValue.value = value + "%";
      image.style.transform = `scale(0.${value})`; //если кликаем на минус и значение больше 25 то значение на 25 уменьшается, исправляется значение в блоке масштаба и картинка уменьшается
    } else if (e.target.id === "bigger" && value < maxScale) {
      value += 25;
      scaleValue.value = value + "%";
      if (value === maxScale) {
        image.style.transform = `scale(1)`; //при значение 100 указываю значение 1 равное 100% масштаба
      } else {
        image.style.transform = `scale(0.${value})`; //если кликаем на плюс и значение меньше 100 то значение на 25 увеличивается, исправляется значение в блоке масштаба и картинка уменьшается
      }
    }
  }
}

function getFilter(e) {
  switch (true) {
    case e.target.id === "effect-none":
      image.className = "img-upload__preview";
      createSlider(`remove`);
      break;
    case e.target.id === "effect-chrome":
      image.className = "img-upload__preview";
      image.classList.add("effects__preview--chrome");
      createSlider("add", chrome.minValue, chrome.maxValue, chrome.step);
      break;
    case e.target.id === "effect-sepia":
      image.className = "img-upload__preview";
      image.classList.add("effects__preview--sepia");
      createSlider("add", sepia.minValue, sepia.maxValue, sepia.step);
      break;
    case e.target.id === "effect-marvin":
      image.className = "img-upload__preview";
      image.classList.add("effects__preview--marvin");
      createSlider("add", marvin.minValue, marvin.maxValue, marvin.step);
      break;
    case e.target.id === "effect-phobos":
      image.className = "img-upload__preview";
      image.classList.add("effects__preview--phobos");
      createSlider("add", phobos.minValue, phobos.maxValue, phobos.step);
      break;
    case e.target.id === "effect-heat":
      image.className = "img-upload__preview";
      image.classList.add("effects__preview--heat");
      createSlider("add", heat.minValue, heat.maxValue, heat.step);
      break;
  }
} //при нажатии на фильтр с одним айди то класс соответствующий названию фильтра добавляется  к классу картинки и появляется слайдер для редактирования изображения

function createSlider(action, minValue, maxValue, step) {
  if (action === "remove") {
    if (slider.noUiSlider) {
      slider.noUiSlider.destroy();
    }
  } else if (action === "add") {
    if (!slider.noUiSlider) {
      noUiSlider.create(slider, {
        start: 100,
        range: {
          min: minValue,
          max: maxValue,
        },
        step: step,
        connect: "lower",
        tooltips: true,
      });
    } else {
      slider.noUiSlider.updateOptions({
        start: 100,
        range: {
          min: minValue,
          max: maxValue,
        },
        step: step,
      });
    }
    slider.noUiSlider.on("update", function (values, handle) {
      const value = values[handle];
      refreshImage(value);
    });
  }
} //если выбрано действие для удаления слайдера то мы его удаляем с помощью метода ДЕСТРОЙ, если выбрано действие добавления слайдера то мы его добавляем с переданными в функцию параметрами для слайдера

function refreshImage(value) {
  switch (true) {
    case image.classList.contains("effects__preview--chrome"):
      image.style.filter = `grayscale(${value})`;
      break;
    case image.classList.contains("effects__preview--sepia"):
      image.style.filter = `sepia(${value})`;
      break;
    case image.classList.contains("effects__preview--marvin"):
      image.style.filter = `invert(${value}%)`;
      break;
    case image.classList.contains("effects__preview--phobos"):
      image.style.filter = `blur(${value}px)`;
      break;
    case image.classList.contains("effects__preview--heat"):
      image.style.filter = `brightness(${value})`;
      break;
  }
} //когда меняется значение внутри слайдера то по второму классу у изображения определяем какой стиль нужно менять у него
