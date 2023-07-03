import noUiSlider from "../node_modules/nouislider/dist/nouislider.mjs";

export function slider() {
  const slider = document.querySelector("#slider");

  noUiSlider.create(slider, {
    start: 0,
    connect: "lower",
    tooltips: true,
    range: {
      min: 0,
      max: 100,
    },
  });
}
