//************ ОТОБРАЖЕНИЕ БОЛЬШИХ ФОТО НА СТРАНИЦЕ ************/
import { userPhotos } from "./main.js"; //импортирую массив объектов с фото

const bigPictureSection = document.querySelector(".big-picture"); //Нахожу секцию для показа большого фото
const body = document.querySelector("body"); //Нахожу тег body
const image = bigPictureSection.querySelector("img"); //Нахожу тег img внутри секции с большим фото
const description = bigPictureSection.querySelector(".social__caption"); //Нахожу тег с классом social__caption внутри секции с большим фото
const likesCount = bigPictureSection.querySelector(".likes-count"); //Нахожу тег с классом likes-count внутри секции с большим фото

const commentsList = bigPictureSection.querySelector(".social__comments"); //Нахожу тег для вписывания элементов списка
const commentsMaxCount = bigPictureSection.querySelector(".comments-count"); //Нахожу тег с классом comments-count внутри секции с большим фото
const commentsShown = document.querySelector(".comments-shown");
const commentsCountBlock = document.querySelector(".social__comment-count");
const commentsShownCount = 5;
const commentsLoader = document.querySelector(".social__comments-loader");
const userComments = await fetch("http://127.0.0.1:4001/comments")
  .then((response) => response.json())
  .then((json) => {
    return json;
  })
  .catch(() => alert("ERROR"));
const commentsArray = userComments.slice();

async function openBigPictureWindow(e) {
  if (e.target.classList.contains("picture__img")) {
    const id = +e.target.dataset.id; //Указываю что айди фото это айди у картинки на которую мы кликаем
    const commentsCount = +e.target.dataset.commentsCount;
    const photoInfo = userPhotos.find((e) => e.id === id); //Нахожу объект который соответствует айди фото

    bigPictureSection.classList.remove("hidden"); //При открытии убираю класс для скрытия тега и добавляю класс к body, а также скрываю счетчик комментариев как сказано в задании
    body.classList.add("modal-open");

    image.src = photoInfo.url;
    image.alt = photoInfo.description;
    description.textContent = photoInfo.description;
    likesCount.textContent = photoInfo.likes;

    getComments(commentsCount); //Указываю необходимые данные из объекта для правильного отображения и с помощью функции отображаю комментарии
  }
}

function getComments(commentsCount) {
  if (commentsCount > 0) {
    if (commentsCount <= 5) {
      const comments = commentsArray.slice(0, commentsCount);

      commentsList.innerHTML = ``; //Очищаю список от предыдущих комментариев если те были
      commentsLoader.classList.add("hidden");
      commentsShown.textContent = commentsCount;
      commentsMaxCount.textContent = commentsCount;
      createComments(comments);
    } else {
      const preloadedComments = commentsArray.slice(0, 5);
      const restComments = commentsArray.slice(5, commentsCount);

      commentsList.innerHTML = ``; //Очищаю список от предыдущих комментариев если те были
      commentsLoader.classList.remove("hidden");
      commentsCountBlock.classList.remove("hidden");
      commentsMaxCount.textContent = commentsCount;
      commentsShown.textContent = commentsShownCount;

      createComments(preloadedComments);
      commentsLoader.addEventListener("click", function () {
        loadComments(restComments, commentsCount);
      });
    }
  } else {
    commentsList.innerHTML = ``; //Очищаю список от предыдущих комментариев если те были
    commentsCountBlock.classList.add("hidden");
    commentsLoader.classList.add("hidden");
  }
}

function loadComments(arr, commentsCount) {
  const newArr = arr.splice(0, 5);
  console.log(newArr);

  if (commentsCount - commentsList.children.length <= 5) {
    commentsLoader.classList.add("hidden");
    createComments(newArr);

    commentsShown.textContent = commentsList.children.length;
  } else {
    commentsLoader.classList.remove("hidden");
    createComments(newArr);

    commentsShown.textContent = commentsList.children.length;
  }
}

function createComments(arr) {
  const documentFragment = document.createDocumentFragment(); //Создаю элемент для фрагмента кода

  for (let i = 0; i < arr.length; i++) {
    const comment = document.createElement("li");
    comment.className = "social__comment";
    comment.innerHTML = `
    <img
     class="social__picture"
     src=${arr[i].avatar}
     alt=${arr[i].name}
     width="35" height="35">
   <p class="social__text">${arr[i].message}</p>
    `;
    documentFragment.appendChild(comment);
  }
  commentsList.appendChild(documentFragment); //Добавляю сгенерированный фрагмент кода в тег для списка
}

export { openBigPictureWindow };
