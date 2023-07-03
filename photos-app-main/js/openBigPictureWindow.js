//************ ОТОБРАЖЕНИЕ БОЛЬШИХ ФОТО НА СТРАНИЦЕ ************/
import { userPhotos } from "./main.js"; //импортирую массив объектов с фото

const bigPictureSection = document.querySelector(".big-picture"); //Нахожу секцию для показа большого фото
const body = document.querySelector("body"); //Нахожу тег body
const image = bigPictureSection.querySelector("img"); //Нахожу тег img внутри секции с большим фото
const description = bigPictureSection.querySelector(".social__caption"); //Нахожу тег с классом social__caption внутри секции с большим фото
const likesCount = bigPictureSection.querySelector(".likes-count"); //Нахожу тег с классом likes-count внутри секции с большим фото
const commentsList = bigPictureSection.querySelector(".social__comments"); //Нахожу тег для вписывания элементов списка
const commentsMaxCount = bigPictureSection.querySelector(".comments-count"); //Нахожу тег с классом comments-count внутри секции с большим фото
const commentsShown = document.querySelector(".comments-shown"); //нахожу блок для показа загруженных комментов
const commentsCountBlock = document.querySelector(".social__comment-count"); //нахожу блок для показа количества комментов
let commentsShownCount = 5; //колличество загруженных комментов
const commentsLoader = document.querySelector(".social__comments-loader"); //кнопка загрузки комментов
const userComments = await fetch("http://127.0.0.1:4001/comments")
  .then((response) => response.json())
  .then((json) => {
    return json;
  })
  .catch(() => alert("ERROR")); //массив комментариев

commentsLoader.addEventListener("click", loadComments); //событие загрузки комментов при нажатии на кнопку

function loadComments() {
  commentsShownCount += 5; //увеличиваю количество показаных комментов на 5
  if (commentsShownCount < +commentsMaxCount.textContent) {
    createComments(commentsShownCount); //создаю массив исходя из нового количество показанных комментов
    commentsShown.textContent = commentsShownCount; //указываю количество показанных комментов
  } else {
    commentsShown.textContent = +commentsMaxCount.textContent; //Указываю количество показанных комментов с помощью максимального количества комментов
    commentsLoader.classList.add("hidden"); //скрываю кнопку для показа комментов
    createComments(+commentsMaxCount.textContent); //создаю комменты с помощью максимального количества комментов
  }
}

function openBigPictureWindow(e) {
  if (e.target.classList.contains("picture__img")) {
    const id = +e.target.dataset.id; //Указываю что айди фото это айди у картинки на которую мы кликаем
    const commentsCount = +e.target.dataset.commentsCount; //передаю количество комментариев через дата-атрибут
    const photoInfo = userPhotos.find((e) => e.id === id); //Нахожу объект который соответствует айди фото

    bigPictureSection.classList.remove("hidden"); //При открытии убираю класс для скрытия тега и добавляю класс к body, а также скрываю счетчик комментариев как сказано в задании
    body.classList.add("modal-open");
    commentsShownCount = 5; //при открытии окна количество показанных комментариев будет по дефолту 5 для того чтобы при новом открытии окна сбрасывать счетчик

    image.src = photoInfo.url;
    image.alt = photoInfo.description;
    description.textContent = photoInfo.description;
    likesCount.textContent = photoInfo.likes;

    getComments(commentsCount); //Указываю необходимые данные из объекта для правильного отображения и с помощью функции отображаю комментарии
  }
}

function getComments(commentsCount) {
  if (commentsCount > commentsShownCount && commentsCount !== 0) {
    commentsShown.textContent = commentsShownCount;
    commentsMaxCount.textContent = commentsCount;
    commentsLoader.classList.remove("hidden");
    createComments(commentsShownCount); //если количество коментов больше количества показанных комментов и не равно нулю то отрисовываю первые 5 комментов и показываю кнопку для загрузки комментов
  } else if (commentsCount <= commentsShownCount && commentsCount !== 0) {
    commentsShown.textContent = commentsCount;
    commentsMaxCount.textContent = commentsCount;
    commentsLoader.classList.add("hidden");
    createComments(commentsCount); //если количество комментов меньше количества показанных комментов и не равно нулю то отрисовываю то количество коментов которое передано
  } else if (commentsCount === 0) {
    commentsList.innerHTML = ``;
    commentsCountBlock.classList.add("hidden");
    commentsLoader.classList.add("hidden");
  } //при нуле коментов я обнуляю списко комментов и скрываю блоки с количеством и загрузкой коментов
}

function createComments(count) {
  commentsList.innerHTML = ``;
  const documentFragment = document.createDocumentFragment(); //Создаю элемент для фрагмента кода

  for (let i = 0; i < count; i++) {
    const comment = document.createElement("li");
    comment.className = "social__comment";
    comment.innerHTML = `
    <img
     class="social__picture"
     src=${userComments[i].avatar}
     alt=${userComments[i].name}
     width="35" height="35">
   <p class="social__text">${userComments[i].message}</p>
    `;
    documentFragment.appendChild(comment);
  }
  commentsList.appendChild(documentFragment); //Добавляю сгенерированный фрагмент кода в тег для списка
}

export { openBigPictureWindow };
