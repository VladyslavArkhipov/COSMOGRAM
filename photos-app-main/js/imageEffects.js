import noUiSlider from "../node_modules/nouislider/dist/nouislider.mjs";

const scaleBlock = document.querySelector(".scale");
const effectsList = document.querySelector(".effects__list");
const scaleValue = document.querySelector(".scale__control--value");
const imageBlock = document.querySelector(".img-upload__preview");
const image = imageBlock.querySelector("img");
const scaleRange = {
  max: 100,
  min: 25,
  step: 25,
};
const slider = document.querySelector("#slider");
const chrome = {
  minValue: 0,
  maxValue: 1,
  step: 0.1,
};
const sepia = {
  minValue: 0,
  maxValue: 1,
  step: 0.1,
};
const marvin = {
  minValue: 0,
  maxValue: 100,
  step: 1,
};
const phobos = {
  minValue: 0,
  maxValue: 3,
  step: 0.1,
};
const heat = {
  minValue: 1,
  maxValue: 3,
  step: 0.1,
};

export function imageEffects() {
  scaleBlock.addEventListener("click", scale);
  effectsList.addEventListener("click", getFilter);
}

function scale(e) {
  let value = +scaleValue.value.substring(0, scaleValue.value.length - 1);
  if (e.target.id === "smaller") {
    value = value - scaleRange.step;
    if (value < scaleRange.min || value > scaleRange.max) return;
    scaleValue.value = value + "%";
    console.log(scaleValue.value);
    image.style.transform = `scale(0.${value})`;
  } else if (e.target.id === "bigger") {
    value = value + scaleRange.step;
    if (value < scaleRange.min || value > scaleRange.max) return;
    scaleValue.value = value + "%";
    console.log(scaleValue.value);
    if (value === scaleRange.max) {
      image.style.transform = `scale(1)`;
    } else {
      image.style.transform = `scale(0.${value})`;
    }
  }
}

function getFilter(e) {
  switch (true) {
    case e.target.id === "effect-none":
      image.className = "";
      image.style.filter = ``;
      createSlider(`remove`);
      break;
    case e.target.id === "effect-chrome":
      image.className = "effects__preview--chrome";
      createSlider("add", chrome.minValue, chrome.maxValue, chrome.step);
      break;
    case e.target.id === "effect-sepia":
      image.className = "effects__preview--sepia";
      createSlider("add", sepia.minValue, sepia.maxValue, sepia.step);
      break;
    case e.target.id === "effect-marvin":
      image.className = "effects__preview--marvin";
      createSlider("add", marvin.minValue, marvin.maxValue, marvin.step);
      break;
    case e.target.id === "effect-phobos":
      image.className = "effects__preview--phobos";
      createSlider("add", phobos.minValue, phobos.maxValue, phobos.step);
      break;
    case e.target.id === "effect-heat":
      image.className = "effects__preview--heat";
      createSlider("add", heat.minValue, heat.maxValue, heat.step);
      break;
  }
}

export function createSlider(action, minValue, maxValue, step) {
  if (action === "remove") {
    if (slider.noUiSlider) {
      slider.noUiSlider.destroy();
    }
  } else if (action === "add") {
    if (!slider.noUiSlider) {
      noUiSlider.create(slider, {
        start: maxValue,
        range: {
          min: minValue,
          max: maxValue,
        },
        step: step,
        connect: "lower",
      });
    } else {
      slider.noUiSlider.updateOptions({
        start: maxValue,
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
}

export function refreshImage(value) {
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
}
export { slider };
