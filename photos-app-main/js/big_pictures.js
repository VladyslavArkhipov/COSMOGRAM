//************ ОТОБРАЖЕНИЕ БОЛЬШИХ ФОТО НА СТРАНИЦЕ ************/
import { userPhotos } from "./main.js"; //импортирую массив объектов с фото

const bigPictureSection = document.querySelector(".big-picture"); //Нахожу секцию для показа большого фото
const picturesBlock = document.querySelector(".pictures"); //Нахожу блок со всеми миниатюрами фото
const body = document.querySelector("body"); //Нахожу тег body

picturesBlock.addEventListener("click", openWindow); //При клике на миниатюру фото открываю окно с фото в большом размере

bigPictureSection.addEventListener("click", (e) => {
  closeWindow(e);
  show(e);
}); //При клике внутри секции с большим фото пока что отработан сценарий закрытия окна

function show(e) {
  console.log(e.target);
}

document.addEventListener("keydown", closeWindow); //При нажатии кнопке escape закрывается большое окно с фото

function closeWindow(e) {
  if (
    e.key === `Escape` ||
    e.target.type === "reset" ||
    e.target.className === "big-picture overlay"
  ) {
    bigPictureSection.classList.add("hidden");
    body.classList.remove("modal-open");
  }
} //Функция для закрытия окна. При нажатии кнопки Escape или при клике на кнопку с типом Reset или на пустом месте - будет добавляться класс к секции с большим фото и убираться класс у тега body

function openWindow(e) {
  const id = +e.target.dataset.id; //Указываю что айди фото это айди у картинки на которую мы кликаем
  const photoInfo = userPhotos.find((e) => e.id === id); //Нахожу объект который соответствует айди фото
  const image = bigPictureSection.querySelector("img"); //Нахожу тег img внутри секции с большим фото
  const description = bigPictureSection.querySelector(".social__caption"); //Нахожу тег с классом social__caption внутри секции с большим фото
  const likesCount = bigPictureSection.querySelector(".likes-count"); //Нахожу тег с классом likes-count внутри секции с большим фото
  const commentsCount = bigPictureSection.querySelector(".comments-count"); //Нахожу тег с классом comments-count внутри секции с большим фото
  const commentsCountBlock = bigPictureSection.querySelector(
    ".social__comment-count"
  ); //Нахожу тег с классом social__comment-count внутри секции с большим фото

  bigPictureSection.classList.remove("hidden"); //При открытии убираю класс для скрытия тега и добавляю класс к body, а также скрываю счетчик комментариев как сказано в задании
  body.classList.add("modal-open");
  commentsCountBlock.classList.add("hidden");

  image.src = photoInfo.url;
  image.alt = photoInfo.description;
  description.textContent = photoInfo.description;
  likesCount.textContent = photoInfo.likes;
  commentsCount.textContent = photoInfo.comments.length;
  getComments(photoInfo); //Указываю необходимые данные из объекта для правильного отображения и с помощью функции отображаю комментарии
}

function getComments(photoInfo) {
  const commentsList = bigPictureSection.querySelector(".social__comments"); //Нахожу тег для вписывания элементов списка
  const documentFragment = document.createDocumentFragment(); //Создаю элемент для фрагмента кода
  const comments = photoInfo.comments; //Передаю из параметров функции массив комментариев внутри объекта фото
  commentsList.innerHTML = ``; //Очищаю список от предыдущих комментариев если те были
  comments.forEach((el) => {
    const comment = document.createElement("li");
    comment.className = "social__comment";
    comment.innerHTML = `
    <img
     class="social__picture"
     src=${el.avatar}
     alt=${el.name}
     width="35" height="35">
   <p class="social__text">${el.message}</p>
    `;
    documentFragment.appendChild(comment);
  }); //Прохожу по каждому элементу массива и создаю элемент списка с необходимыми данными
  console.log(commentsList);
  commentsList.appendChild(documentFragment); //Добавляю сгенерированный фрагмент кода в так для списка
}
