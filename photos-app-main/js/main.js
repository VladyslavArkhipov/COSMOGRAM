const commentsMessage = [
  `Все відмінно!`,
  `Загалом все непогано. Але не всі.`,
  `Коли ви робите фотографію, добре б прибирати палець із кадру. Зрештою, це просто непрофесійно.`,
  `Моя бабуся випадково чхнула з фотоапаратом у руках і у неї вийшла фотографія краща.`,
  `Я послизнувся на банановій шкірці і впустив фотоапарат на кота і у мене вийшла фотографія краще.`,
  `Обличчя людей на фотці перекошені, ніби їх побивають. Як можна було зловити такий невдалий момент?`,
];

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
];

const userPhotosDescriptions = [
  `Майстерно запечатлений момент, що розкриває весь спектр кольорів і емоцій.`,
  `Живописний кадр, де кожна деталь виблискує красою і пристрастю.`,
  `Витончений знімок, який вражає глибиною та насиченістю кольорів.`,
  `Фотографія, що переносить глядача в чарівний світ, де кожен тон видає майстерність автора.
    `,
  `Вишукана композиція, яка розкриває всю красу і неповторність моменту з витонченою грацією.`,
  `Вразлива фотографія, що здатна перетворити звичайний кадр на справжню шедевральну мозаїку кольорів.
    `,
  `Магічний знімок, де віртуозне використання кольорів створює неповторну атмосферу та розповідає цілу історію.`,
  `Вражаюча фотографія, яка здатна привернути увагу до найдрібніших деталей та перенести у світ незабутніх вражень.`,
  `Художнє полотно, на якому кожен краплинка кольору витає у повітрі і майстерно грає свою роль.`,
  `Очаровуючий знімок, де кольори стають головними героями і створюють неповторну симфонію естетики.`,
];

const usersComments = new Array(20)
  .fill(null)
  .map((el, i) => getUsersComments(i));

const usersPhotos = new Array(25)
  .fill(null)
  .map((el, i) => getUsersPhotosObject(i));

function getUsersPhotosObject(i) {
  return {
    id: `${i + 1}`,
    url: `photos/${i + 1}`,
    description: createRandomUserPhotosDescription(),
    likes: createRandomLikesCount(),
    comments: usersComments,
  };
}

function getUsersComments(i) {
  return {
    id: createRandomCommentId(i),
    avatar: createRandomAvatar(),
    message: createRandomCommentMessage(),
    name: createRandomCommentUserName(),
  };
}

function createRandomLikesCount() {
  const minLikesCount = 15;
  const maxLikesCount = 200;
  return Math.floor(
    Math.random() * (maxLikesCount - minLikesCount) + minLikesCount
  );
}

function createRandomAvatar() {
  const minPhotoId = 1;
  const maxPhotoId = 7;
  const randomPhotoId = Math.floor(
    Math.random() * (maxPhotoId - minPhotoId) + minPhotoId
  );
  return `img/avatar-${randomPhotoId}.svg`;
}

function createRandomCommentMessage() {
  const minCommentMessageId = 0;
  const maxCommentMessageId = commentsMessage.length;
  const randomCommentMessageId = Math.floor(
    Math.random() * (maxCommentMessageId - minCommentMessageId) +
      minCommentMessageId
  );
  return commentsMessage[randomCommentMessageId];
}

function createRandomCommentUserName() {
  const minCommentUserNameId = 0;
  const maxCommentUserNameId = commentsUserName.length;
  const randomCommentUserNameId = Math.floor(
    Math.random() * (maxCommentUserNameId - minCommentUserNameId) +
      minCommentUserNameId
  );
  return commentsUserName[randomCommentUserNameId];
}

function createRandomUserPhotosDescription() {
  const minUsersPhotoDescriptionId = 0;
  const maxUsersPhotoDescriptionId = userPhotosDescriptions.length;
  const randomUserPhotosDescription = Math.floor(
    Math.random() * (maxUsersPhotoDescriptionId - minUsersPhotoDescriptionId) +
      minUsersPhotoDescriptionId
  );
  return userPhotosDescriptions[randomUserPhotosDescription];
}

function createRandomCommentId(i) {
  const randomIdArray = [];
  while (randomIdArray.length < 600) {
    const randomId = Math.floor(Math.random() * (999 - 1)) + 1;
    if (!randomIdArray.includes(randomId)) {
      randomIdArray.push(randomId);
    }
  }
  return randomIdArray[i];
}

console.log(usersPhotos);
