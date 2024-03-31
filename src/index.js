import "./css/base.css";
import { renderTodosByHash, toggleVisibilityIfListEmpty, handleKeyPress, renderListCounter, clearCompleted, handleHashChange } from "./js/functions";
import { cleanButton } from "./js/utils";

window.addEventListener("hashchange", handleHashChange, false);
document.addEventListener("keydown", handleKeyPress);
cleanButton.addEventListener("click",clearCompleted);

(function() {
  toggleVisibilityIfListEmpty()
  renderTodosByHash(window.location.hash)
  renderListCounter()
})()