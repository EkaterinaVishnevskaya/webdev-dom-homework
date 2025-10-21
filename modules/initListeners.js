import { renderComments } from "./renderComments.js";
import { sanitizeHTML } from "./sanitizeHTML.js";
import { comments, updateComments } from "./comments.js";
import { postComment } from "./api.js";

const nameField = document.querySelector(".add-form-name");
const commField = document.querySelector(".add-form-text");

export const initAddCommentListener = () => {
  const button = document.querySelector(".add-form-button");
  button.addEventListener("click", () => {
    const name = sanitizeHTML(nameField.value);
    const commText = sanitizeHTML(commField.value);
    if ((name == "") | (commText == "")) {
      alert("Вы не ввели имя или ваш комментарий пуст");
      return;
    }
    postComment(commText, name).then((data) => {
      updateComments(data);
      renderComments();
      nameField.value = "";
      commField.value = "";
    });
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
