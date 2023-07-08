//************ ОТОБРАЖЕНИЕ МИНИАТЮР ФОТО НА СТРАНИЦЕ ************/
import { userPhotos } from "./main.js";
const commentsArray = []; //создаю пустой массив в котором буду хранить количество комментариев
const picturesBlock = document.querySelector(".pictures"); //нахожу блок в который вставлять фото
const pictureTemplate = document.querySelector("#picture"); //нахожу шаблон с кодом для вставки фото
const documentFragment = document.createDocumentFragment(); //создаю фрагмент документа, в который буду добавлять элементы фото
const discussedPicturesBtn = document.querySelector("#filter-discussed"); //кнопка для популярных картинок
const allPicturesBtn = document.querySelector("#filter-default"); //кнопка для всех картинок
const randomPicturesBtn = document.querySelector("#filter-random"); //кнопка для случайных картинок
const commentsCountRules = {
  minCount: 0,
  maxCount: 40,
}; //правила количества комментариев
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
    ); //генерирую случайное количество комментариев для фото
    commentsArray.push(commentsCount); //Отправляю значение количества комментариев в массив
    const picture = pictureTemplate.content.cloneNode(true);

    getPictureDetails(picture).image.src = `${photo.url}`;
    getPictureDetails(picture).comments.textContent = commentsCount;
    getPictureDetails(picture).likes.textContent = `${photo.likes}`;
    getPictureDetails(picture).image.dataset.id = photo.id;
    getPictureDetails(picture).image.dataset.commentsCount = commentsCount;
    documentFragment.appendChild(picture); //все новые элементы добавляю в фрагмент документа который затем буду вставлять в блок для фото
  }); //перебираю элементы массива для того, чтобы после клонирования содержимого шаблона, можно было указать необходимые данные внутри контента

  picturesBlock.appendChild(documentFragment); //добавляю фрагмент документа в блок для фото для вывода всех фото
}

export function showFilteredPictures(e) {
  if (e.target.id === "filter-default") {
    showAllPictures();
  } else if (e.target.id === "filter-random") {
    showRandomPictures();
  } else if (e.target.id === "filter-discussed") {
    showPopularPictures();
  }
} //функция для обработчика событий внутри формы с фильтрами фото

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
} //функция для устранения эффекта "дрожания" при переключении фльтра

function activateBtn(activeBtn, firstPassiveBtn, secondPassiveBtn) {
  const activeClass = `img-filters__button--active`;
  firstPassiveBtn.classList.remove(activeClass);
  secondPassiveBtn.classList.remove(activeClass);
  activeBtn.classList.add(activeClass);
} //функция для визуальной активации кнопки фильтра

const showAllPictures = debounce(function () {
  activateBtn(allPicturesBtn, discussedPicturesBtn, randomPicturesBtn); //делаю активной текущую выбранную кнопку
  clearPictures(); //очищаю страницу от картинок
  userPhotos.forEach((photo, index) => {
    const picture = pictureTemplate.content.cloneNode(true);

    getPictureDetails(picture).image.src = `${photo.url}`;
    getPictureDetails(picture).comments.textContent = commentsArray[index];
    getPictureDetails(picture).likes.textContent = `${photo.likes}`;
    getPictureDetails(picture).image.dataset.id = photo.id;
    getPictureDetails(picture).image.dataset.commentsCount =
      commentsArray[index].value;
    documentFragment.appendChild(picture); //все новые элементы добавляю в фрагмент документа который затем буду вставлять в блок для фото
  }); //перебираю элементы массива для того, чтобы после клонирования содержимого шаблона, можно было указать необходимые данные внутри контента
  picturesBlock.appendChild(documentFragment); //добавляю фрагмент документа в блок для фото для вывода всех фото
}, 500); //вызываю эту функцию с функцией для устранения "дрожания"

const showRandomPictures = debounce(function () {
  activateBtn(randomPicturesBtn, discussedPicturesBtn, allPicturesBtn);
  clearPictures();
  getTenRandomId().forEach((el) => {
    const picture = pictureTemplate.content.cloneNode(true);

    getPictureDetails(picture).image.src = `${userPhotos[el].url}`;
    getPictureDetails(picture).comments.textContent = commentsArray[el];
    getPictureDetails(picture).likes.textContent = `${userPhotos[el].likes}`;
    getPictureDetails(picture).image.dataset.id = userPhotos[el].id;
    getPictureDetails(picture).image.dataset.commentsCount = commentsArray[el];
    documentFragment.appendChild(picture); //все новые элементы добавляю в фрагмент документа который затем буду вставлять в блок для фото
  }); //перебираю элементы массива для того, чтобы после клонирования содержимого шаблона, можно было указать необходимые данные внутри контента
  picturesBlock.appendChild(documentFragment); //добавляю фрагмент документа в блок для фото для вывода всех фото
}, 500); //принцип как и у предыдущей кнопки, но тут я отрисовываю картинки исходя из данных массива случайных айди картинок

const showPopularPictures = debounce(function () {
  activateBtn(discussedPicturesBtn, allPicturesBtn, randomPicturesBtn);
  clearPictures();
  getSortedArray(commentsArray).forEach((el) => {
    const picture = pictureTemplate.content.cloneNode(true);

    getPictureDetails(picture).image.src = `${userPhotos[el.id].url}`;
    getPictureDetails(picture).comments.textContent = el.value;
    getPictureDetails(picture).likes.textContent = `${userPhotos[el.id].likes}`;
    getPictureDetails(picture).image.dataset.id = userPhotos[el.id].id;
    getPictureDetails(picture).image.dataset.commentsCount = el.value;
    documentFragment.appendChild(picture); //все новые элементы добавляю в фрагмент документа который затем буду вставлять в блок для фото
  });
  picturesBlock.appendChild(documentFragment); //добавляю фрагмент документа в блок для фото для вывода всех фото
}, 500); //принцип как и у предыдущей кнопки, но тут я отрисовываю картинки исходя из данных массива отсортированных значений количеств комментариев

function getPictureDetails(picture) {
  const image = picture.querySelector(".picture__img");
  const comments = picture.querySelector(".picture__comments");
  const likes = picture.querySelector(".picture__likes");
  return {
    image: image,
    comments: comments,
    likes: likes,
  };
} //функция возвращает массив с данными для редактирования тегов для картинок

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
} //функция для случайного значения

function clearPictures() {
  const elements = picturesBlock.querySelectorAll("a");
  const elementsArray = Array.from(elements);
  elementsArray.forEach(function (element) {
    element.parentNode.removeChild(element);
  });
} //функция находит все ссылочные теги внутри блока для картинок и помещает в массив, после чего удаляет каждый элемент из родительского

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
} //создаю массив для сортировки колличества комментариев и каждый элемент это объект со значением комментария и тем айди который был у комментария изначально

function getTenRandomId() {
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
} //создаю пустой массив который затем наполняю случайными значениями айди которые не повторяются
