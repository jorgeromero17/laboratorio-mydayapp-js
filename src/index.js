import "./css/base.css";
import { renderTodoList, toggleVisibilityIfListEmpty, handleKeyPress, renderListCounter, clearCompleted } from "./js/functions";
import { cleanButton } from "./js/utils";

document.addEventListener("keydown", handleKeyPress);
cleanButton.addEventListener("click",clearCompleted);

(function() {
  toggleVisibilityIfListEmpty()
  renderTodoList()
  renderListCounter()
})()