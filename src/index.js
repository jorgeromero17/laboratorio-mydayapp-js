import "./css/base.css";

import { todos, $ } from "./js/utils";

function renderTodoList(){
  const todoListContainer = $(".todo-list")
  todoListContainer.innerHTML = ""

  const todoList = todos.map(todo => {
    return `
    <li>
      <div class="view">
        <input class="toggle" type="checkbox" ${todo.completed ? "checked" : ""} />
        <label>${todo.title}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="Buy a unicorn" />
    </li>
    `
  }).join("")

  todoListContainer.innerHTML = todoList
}

renderTodoList()