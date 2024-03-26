import "./css/base.css";
import { renderTodoList, toggleVisibilityIfListEmpty, handleKeyPress } from "./js/functions";


document.addEventListener("keypress", handleKeyPress);

(function() {
  toggleVisibilityIfListEmpty()
  renderTodoList()
})()