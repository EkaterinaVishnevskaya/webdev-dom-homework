import { renderComments } from "./renderComments.js";
import { sanitizeHTML } from "./sanitizeHTML.js";
import { comments } from "./comments.js";

const nameField = document.querySelector(".add-form-name");
const commField = document.querySelector(".add-form-text");

export const initAddCommentListener = () => {
  const button = document.querySelector(".add-form-button");
  button.addEventListener("click", () => {
    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear() % 100;
    const day = date.getDate();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const name = sanitizeHTML(nameField.value);
    const commText = sanitizeHTML(commField.value);
    if ((name == "") | (commText == "")) {
      alert("Вы не ввели имя или ваш комментарий пуст");
      return;
    }
    const dateStr = `${(day < 10 ? "0" : "") + day}.${(month < 10 ? "0" : "") + month}.${(year < 10 ? "0" : "") + year}  ${(hour < 10 ? "0" : "") + hour}:${(minutes < 10 ? "0" : "") + minutes}`;
    const newComm = {
      name: name,
      text: commText,
      time: dateStr,
      isLiked: false,
      likes: 0,
    };
    comments.push(newComm);
    nameField.value = "";
    commField.value = "";
    renderComments();
  });
};

export const initCommentElementListener = () => {
  const commentsElements = document.querySelectorAll(".comment");
  for (const commentElement of commentsElements) {
    commentElement.addEventListener("click", () => {
      const comm = comments[commentElement.dataset.index];
      commField.value += `\n${comm.name}: ${comm.text}\n`;
    });
  }
};

export const initLikeListener = () => {
  const likeButtons = document.querySelectorAll(".like-button");
  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener("click", () => {
      event.stopPropagation();
      const index = likeButton.dataset.index;
      const comm = comments[index];

      comm.likes = comm.isLiked ? comm.likes - 1 : comm.likes + 1;
      comm.isLiked = !comm.isLiked;

      renderComments();
    });
  });
};
