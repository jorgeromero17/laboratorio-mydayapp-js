import "./css/base.css";
import { renderTodoList, toggleVisibilityIfListEmpty, handleKeyPress } from "./js/functions";


document.addEventListener("keydown", handleKeyPress);

(function() {
  toggleVisibilityIfListEmpty()
  renderTodoList()
})()