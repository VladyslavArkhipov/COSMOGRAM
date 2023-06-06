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

const usersPhotos = new Array(25)
  .fill(null)
  .map((el, i) => getUsersPhotosObject(i)); //массив объектов с фото пользователей

function getUsersPhotosObject(i) {
  return {
    id: `${i + 1}`,
    url: `photos/${i + 1}`,
    description: createRandomUserPhotosDescription(),
    likes: createRandomLikesCount(),
    comments: getUsersComments(),
  };
} //объект для пользовательских фото

function getUsersComments() {
  const usersComments = [];
  const maxCommentsCount = 20;
  const usedIds = new Set();
  while (usersComments.length < maxCommentsCount) {
    const id = createRandomCommentId();
    if (!usedIds.has(id)) {
      usedIds.add(id);
      usersComments.push({
        id,
        avatar: createRandomAvatar(),
        message: createRandomCommentMessage(),
        name: createRandomCommentUserName(),
      });
    }
  }
  return usersComments; //массив комментариев к фото
}

function createRandomLikesCount() {
  const minLikesCount = 15;
  const maxLikesCount = 200;
  return Math.floor(
    Math.random() * (maxLikesCount - minLikesCount) + minLikesCount
  );
} //случайное количество лайков

function createRandomAvatar() {
  const minAvatarId = 1;
  const maxAvatarId = 7;
  const randomAvatarId = Math.floor(
    Math.random() * (maxAvatarId - minAvatarId) + minAvatarId
  );
  return `img/avatar-${randomAvatarId}.svg`;
} //случайный путь к файлу с аватаром пользователя

function createRandomCommentMessage() {
  const minCommentMessageId = 0;
  const maxCommentMessageId = commentsMessage.length;
  const randomCommentMessageId = Math.floor(
    Math.random() * (maxCommentMessageId - minCommentMessageId) +
      minCommentMessageId
  );
  return commentsMessage[randomCommentMessageId];
} //случайный комментарий из массива комментариев

function createRandomCommentUserName() {
  const minCommentUserNameId = 0;
  const maxCommentUserNameId = commentsUserName.length;
  const randomCommentUserNameId = Math.floor(
    Math.random() * (maxCommentUserNameId - minCommentUserNameId) +
      minCommentUserNameId
  );
  return commentsUserName[randomCommentUserNameId];
} //случайное имя пользователя из массива имен

function createRandomUserPhotosDescription() {
  const minUsersPhotoDescriptionId = 0;
  const maxUsersPhotoDescriptionId = userPhotosDescriptions.length;
  const randomUserPhotosDescriptionId = Math.floor(
    Math.random() * (maxUsersPhotoDescriptionId - minUsersPhotoDescriptionId) +
      minUsersPhotoDescriptionId
  );
  return userPhotosDescriptions[randomUserPhotosDescriptionId];
} //случайное описание к фото из массива описаний

function createRandomCommentId() {
  const minId = 1;
  const maxId = 999;
  return Math.floor(Math.random() * (maxId - minId) + minId);
} //случайный номер айди пользователя

console.log(usersPhotos);
