import { userPhotos } from "./main.js";
const bigPictureSection = document.querySelector(".big-picture");
const body = document.querySelector("body");
const image = bigPictureSection.querySelector("img");
const description = bigPictureSection.querySelector(".social__caption");
const likesCount = bigPictureSection.querySelector(".likes-count");
const commentsList = bigPictureSection.querySelector(".social__comments");
const commentsMaxCount = bigPictureSection.querySelector(".comments-count");
const commentsShown = document.querySelector(".comments-shown");
const commentsCountBlock = document.querySelector(".social__comment-count");
let commentsShownCount = 5;
const commentsLoader = document.querySelector(".social__comments-loader");
const userComments = await fetch("http://127.0.0.1:4001/comments")
  .then((response) => response.json())
  .then((json) => {
    return json;
  })
  .catch(() => alert("ERROR"));

commentsLoader.addEventListener("click", loadComments);

function loadComments() {
  commentsShownCount += 5;
  if (commentsShownCount < +commentsMaxCount.textContent) {
    createComments(commentsShownCount);
    commentsShown.textContent = commentsShownCount;
  } else {
    commentsShown.textContent = +commentsMaxCount.textContent;
    commentsLoader.classList.add("hidden");
    createComments(+commentsMaxCount.textContent);
  }
}

function openBigPictureWindow(e) {
  if (e.target.classList.contains("picture__img")) {
    const id = +e.target.dataset.id;
    const commentsCount = +e.target.dataset.commentsCount;
    const photoInfo = userPhotos.find((e) => e.id === id);

    bigPictureSection.classList.remove("hidden");
    body.classList.add("modal-open");
    commentsShownCount = 5;

    image.src = photoInfo.url;
    image.alt = photoInfo.description;
    description.textContent = photoInfo.description;
    likesCount.textContent = photoInfo.likes;

    getComments(commentsCount);
  }
}

function getComments(commentsCount) {
  if (commentsCount > commentsShownCount && commentsCount !== 0) {
    commentsShown.textContent = commentsShownCount;
    commentsMaxCount.textContent = commentsCount;
    commentsLoader.classList.remove("hidden");
    createComments(commentsShownCount);
  } else if (commentsCount <= commentsShownCount && commentsCount !== 0) {
    commentsShown.textContent = commentsCount;
    commentsMaxCount.textContent = commentsCount;
    commentsLoader.classList.add("hidden");
    createComments(commentsCount);
  } else if (commentsCount === 0) {
    commentsList.innerHTML = ``;
    commentsCountBlock.classList.add("hidden");
    commentsLoader.classList.add("hidden");
  }
}

function createComments(count) {
  commentsList.innerHTML = ``;
  const documentFragment = document.createDocumentFragment();

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
  commentsList.appendChild(documentFragment);
}

export { openBigPictureWindow };
