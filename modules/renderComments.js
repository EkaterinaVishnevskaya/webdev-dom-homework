import { comments } from "./comments.js";
import {
  initLikeListener,
  initCommentElementListener,
} from "./initListeners.js";

export const renderComments = () => {
  console.log("It works!");
  const list = document.querySelector(".comments");
  console.log(comments);
  list.innerHTML = comments
    .map((comment, index) => {
      return `<li class="comment" data-index="${index}"">
        <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.date.toLocaleDateString()}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">${comment.likes}</span>
              <button data-index="${index}" class="like-button ${comment.isLiked ? "-active-like" : ""}"></button>
            </div>
          </div>
          </li>`;
    })
    .join("");

  initLikeListener();
  initCommentElementListener();
};
