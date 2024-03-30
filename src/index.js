import "./css/base.css";
import { renderTodoList, toggleVisibilityIfListEmpty, handleKeyPress, renderListCounter } from "./js/functions";


document.addEventListener("keydown", handleKeyPress);

(function() {
  toggleVisibilityIfListEmpty()
  renderTodoList()
  renderListCounter()
})()