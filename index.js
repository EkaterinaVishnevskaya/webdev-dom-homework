import { fetchComments } from "./modules/api.js";
import { updateComments } from "./modules/comments.js";
import { initAddCommentListener } from "./modules/initListeners.js";
import { renderComments } from "./modules/renderComments.js";

document.querySelector(".comments").innerHTML = "Загружаю...";

fetchComments().then((data) => {
  updateComments(data);
  renderComments();
});

initAddCommentListener();
