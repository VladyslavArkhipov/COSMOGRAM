import { showMiniPictures } from "./showMiniPictures.js";
import { openBigPictureWindow } from "./showBigPicture.js";
import { openUploadPictureWindow } from "./uploadPicture.js";
import { closeWindow } from "./closeWindow.js";

const picturesBlock = document.querySelector(".pictures"); //Нахожу блок со всеми миниатюрами фото
const bigPictureSection = document.querySelector(".big-picture"); //Нахожу секцию для показа большого фото
const uploadBtn = document.querySelector("#upload-file"); //Нахожу кнопку для закгрузки изображения
const uploadPictureBlock = document.querySelector(".img-upload__overlay"); //Нахожу блок который отрисовывает окно с формой для загрузки фото

const commentsMessage = [
  `Все відмінно!`,
  `Загалом все непогано. Але не всі.`,
  `Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.`,
  `Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.`,
  `Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.`,
  `Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?`,
]; //массив с текстом комментария

const commentsUserName = [
  "Артем",
  "Владислав",
  "Григорiй",
  "Дмитрo",
  "Вoлoдимир",
  "Андрiй",
  "Максим",
  "Oлексiй",
  "Юлiя",
  "Марiя",
  "Свiтлана",
  "Анастасiя",
  "Oлена",
  "Катерина",
]; //массив имен комментаторов

const userPhotosDescriptions = [
  `Майстерно запечатлений момент, що розкриває весь спектр кольорів і емоцій.`,
  `Живописний кадр, де кожна деталь виблискує красою і пристрастю.`,
  `Витончений знімок, який вражає глибиною та насиченістю кольорів.`,
  `Фотографія, що переносить глядача в чарівний світ, де кожен тон видає майстерність автора.`,
  `Вишукана композиція, яка розкриває всю красу і неповторність моменту з витонченою грацією.`,
  `Вразлива фотографія, що здатна перетворити звичайний кадр на справжню шедевральну мозаїку кольорів.`,
  `Магічний знімок, де віртуозне використання кольорів створює неповторну атмосферу та розповідає цілу історію.`,
  `Вражаюча фотографія, яка здатна привернути увагу до найдрібніших деталей та перенести у світ незабутніх вражень.`,
  `Художнє полотно, на якому кожен краплинка кольору витає у повітрі і майстерно грає свою роль.`,
  `Очаровуючий знімок, де кольори стають головними героями і створюють неповторну симфонію естетики.`,
]; //массив текстовых описаний к фото

const maxCommentsCount = 20; //максимальное количество комментариев

const likes = {
  minLikesCount: 15,
  maxLikesCount: 200,
}; //ограничение для количества лайков

const avatarId = {
  minAvatarId: 1,
  maxAvatarId: 7,
}; //ограничение для выбора айди аватаров

const commentMessageId = {
  minCommentMessageId: 0,
  maxCommentMessageId: commentsMessage.length,
}; //ограничение для выбора айди комментариев

const commentUsersNameId = {
  minCommentUserNameId: 0,
  maxCommentUserNameId: commentsUserName.length,
}; //ограничение для выбора айди имени комментатора

const usersPhotoDescriptionId = {
  minUsersPhotoDescriptionId: 0,
  maxUsersPhotoDescriptionId: userPhotosDescriptions.length,
}; //ограничение для выбора айди описания фото

const userPhotosCount = 25; //длина массива с фото

const userPhotos = new Array(userPhotosCount)
  .fill(null)
  .map((_, i) => getUserPhotoObject(i)); //массив объектов с фото пользователей

function getUserPhotoObject(i) {
  return {
    id: i + 1,
    url: `photos/${i + 1}.jpg`,
    description: getRandomUserPhotosDescription(),
    likes: getRandomLikesCount(),
    comments: getUsersComments(),
  };
} //объект для пользовательских фото

function getUsersComments() {
  const usersComments = [];
  for (let i = 0; i < maxCommentsCount; i++) {
    usersComments.push({
      id: i,
      avatar: getRandomAvatar(),
      message: getRandomCommentMessage(),
      name: getRandomCommentUserName(),
    });
  }
  return usersComments; //массив комментариев к фото
}

function getRandomLikesCount() {
  return getRandomNumber(likes.minLikesCount, likes.maxLikesCount);
} //случайное количество лайков

function getRandomAvatar() {
  const randomAvatarId = getRandomNumber(
    avatarId.minAvatarId,
    avatarId.maxAvatarId
  );
  return `img/avatar-${randomAvatarId}.svg`;
} //случайный путь к файлу с аватаром пользователя

function getRandomCommentMessage() {
  const randomCommentMessageId = getRandomNumber(
    commentMessageId.minCommentMessageId,
    commentMessageId.maxCommentMessageId
  );
  return commentsMessage[randomCommentMessageId];
} //случайный комментарий из массива комментариев

function getRandomCommentUserName() {
  const randomCommentUserNameId = getRandomNumber(
    commentUsersNameId.minCommentUserNameId,
    commentUsersNameId.maxCommentUserNameId
  );
  return commentsUserName[randomCommentUserNameId];
} //случайное имя пользователя из массива имен

function getRandomUserPhotosDescription() {
  const randomUserPhotosDescriptionId = getRandomNumber(
    usersPhotoDescriptionId.minUsersPhotoDescriptionId,
    usersPhotoDescriptionId.maxUsersPhotoDescriptionId
  );
  return userPhotosDescriptions[randomUserPhotosDescriptionId];
} //случайное описание к фото из массива описаний

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

showMiniPictures(userPhotos); //функция для отрисовки фото из массива с фото

picturesBlock.addEventListener("click", openBigPictureWindow); //При клике на миниатюру фото открываю окно с фото в большом размере

bigPictureSection.addEventListener("click", closeWindow); //При клике внутри секции с большим фото пока что отработан сценарий закрытия окна

document.addEventListener("keydown", closeWindow); //При нажатии кнопке escape закрывается большое окно с фото

uploadBtn.addEventListener("change", openUploadPictureWindow); //при добавлении фото открывается окно с формой для загрузки фото

uploadPictureBlock.addEventListener("click", closeWindow); //при клике внутри блока загрузки в данном случае будет закрытие окна

export { userPhotos };
