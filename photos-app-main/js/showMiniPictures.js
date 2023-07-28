import { userPhotos } from "./main.js";
const commentsArray = [];
const picturesBlock = document.querySelector(".pictures");
const pictureTemplate = document.querySelector("#picture");
const documentFragment = document.createDocumentFragment();
const discussedPicturesBtn = document.querySelector("#filter-discussed");
const allPicturesBtn = document.querySelector("#filter-default");
const randomPicturesBtn = document.querySelector("#filter-random");
const commentsCountRules = {
  minCount: 0,
  maxCount: 40,
};
const randomPictures = {
  min: 0,
  max: 24,
  count: 10,
};

export function showMiniPictures(arr) {
  arr.forEach((photo) => {
    const commentsCount = getRandomNumber(
      commentsCountRules.minCount,
      commentsCountRules.maxCount
    );
    commentsArray.push(commentsCount);
    const picture = pictureTemplate.content.cloneNode(true);

    getPictureDetails(picture).image.src = `${photo.url}`;
    getPictureDetails(picture).comments.textContent = commentsCount;
    getPictureDetails(picture).likes.textContent = `${photo.likes}`;
    getPictureDetails(picture).image.dataset.id = photo.id;
    getPictureDetails(picture).image.dataset.commentsCount = commentsCount;
    documentFragment.appendChild(picture);
  });

  picturesBlock.appendChild(documentFragment);
}

export function showFilteredPictures(e) {
  if (e.target.id === "filter-default") {
    showAllPictures();
  } else if (e.target.id === "filter-random") {
    showRandomPictures();
  } else if (e.target.id === "filter-discussed") {
    showPopularPictures();
  }
}

function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;

    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

function setBtnActive(activeBtn, firstPassiveBtn, secondPassiveBtn) {
  const activeClass = `img-filters__button--active`;
  firstPassiveBtn.classList.remove(activeClass);
  secondPassiveBtn.classList.remove(activeClass);
  activeBtn.classList.add(activeClass);
}

const showAllPictures = debounce(function () {
  setBtnActive(allPicturesBtn, discussedPicturesBtn, randomPicturesBtn);
  clearPictures();
  userPhotos.forEach((photo, index) => {
    const picture = pictureTemplate.content.cloneNode(true);

    getPictureDetails(picture).image.src = `${photo.url}`;
    getPictureDetails(picture).comments.textContent = commentsArray[index];
    getPictureDetails(picture).likes.textContent = `${photo.likes}`;
    getPictureDetails(picture).image.dataset.id = photo.id;
    getPictureDetails(picture).image.dataset.commentsCount =
      commentsArray[index].value;
    documentFragment.appendChild(picture);
  });
  picturesBlock.appendChild(documentFragment);
}, 500);

const showRandomPictures = debounce(function () {
  setBtnActive(randomPicturesBtn, discussedPicturesBtn, allPicturesBtn);
  clearPictures();
  getRandomPhotos().forEach((el) => {
    const picture = pictureTemplate.content.cloneNode(true);

    getPictureDetails(picture).image.src = `${userPhotos[el].url}`;
    getPictureDetails(picture).comments.textContent = commentsArray[el];
    getPictureDetails(picture).likes.textContent = `${userPhotos[el].likes}`;
    getPictureDetails(picture).image.dataset.id = userPhotos[el].id;
    getPictureDetails(picture).image.dataset.commentsCount = commentsArray[el];
    documentFragment.appendChild(picture);
  });
  picturesBlock.appendChild(documentFragment);
}, 500);

const showPopularPictures = debounce(function () {
  setBtnActive(discussedPicturesBtn, allPicturesBtn, randomPicturesBtn);
  clearPictures();
  getSortedArray(commentsArray).forEach((el) => {
    const picture = pictureTemplate.content.cloneNode(true);

    getPictureDetails(picture).image.src = `${userPhotos[el.id].url}`;
    getPictureDetails(picture).comments.textContent = el.value;
    getPictureDetails(picture).likes.textContent = `${userPhotos[el.id].likes}`;
    getPictureDetails(picture).image.dataset.id = userPhotos[el.id].id;
    getPictureDetails(picture).image.dataset.commentsCount = el.value;
    documentFragment.appendChild(picture);
  });
  picturesBlock.appendChild(documentFragment);
}, 500);

function getPictureDetails(picture) {
  const image = picture.querySelector(".picture__img");
  const comments = picture.querySelector(".picture__comments");
  const likes = picture.querySelector(".picture__likes");
  return {
    image: image,
    comments: comments,
    likes: likes,
  };
}
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function clearPictures() {
  const elements = picturesBlock.querySelectorAll("a");
  const elementsArray = Array.from(elements);
  elementsArray.forEach(function (element) {
    element.parentNode.removeChild(element);
  });
}

function getSortedArray(arr) {
  const sortedArray = [];
  for (let i = 0; i < arr.length; i++) {
    sortedArray.push({
      value: arr[i],
      id: i,
    });
  }
  sortedArray.sort(function (a, b) {
    return b.value - a.value;
  });
  return sortedArray;
}

function getRandomPhotos() {
  const newArr = [];
  while (newArr.length < randomPictures.count) {
    const randomNumber = getRandomNumber(
      randomPictures.min,
      randomPictures.max
    );
    if (newArr.indexOf(randomNumber) === -1) {
      newArr.push(randomNumber);
    }
  }
  return newArr;
}
