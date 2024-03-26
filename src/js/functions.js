import { $ } from "./utils";

let todos = [
  {
    id: 1,
    title: "Hacer las compras",
    completed: false
  },
  {
    id: 2,
    title: "Estudiar programación",
    completed: true
  },
  {
    id: 3,
    title: "Ver videos",
    completed: false
  },
]

export function renderTodoList(){
  const todoListContainer = $(".todo-list")
  todoListContainer.innerHTML = ""

  todos.forEach(todo => {
    const todoItem = document.createElement("li")
    todoItem.setAttribute("value", todo.id)
    todoItem.className = todo.completed ? "completed" : ""
    todoItem.addEventListener("dblclick", (e) => handleDoubleClick(e))

    const viewDiv = document.createElement("div")
    viewDiv.className = "view"

    const toggleInput = document.createElement("input")
    toggleInput.className = "toggle"
    toggleInput.type = "checkbox"
    toggleInput.checked = todo.completed
    toggleInput.addEventListener("change", () => toggleTodoState(todo.id))

    const label = document.createElement("label")
    label.textContent = todo.title

    const destroyButton = document.createElement("button")
    destroyButton.className = "destroy"

    viewDiv.appendChild(toggleInput)
    viewDiv.appendChild(label)
    viewDiv.appendChild(destroyButton)

    const editInput = document.createElement("input")
    editInput.className = "edit"
    editInput.value = todo.title

    todoItem.appendChild(viewDiv)
    todoItem.appendChild(editInput)

    todoListContainer.appendChild(todoItem)
  });
}

function toggleTodoState(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      return {
        ...todo,
        completed: !todo.completed // Cambiar el estado completed
      }
    }
    return todo
  })
  renderTodoList()
}

function handleDoubleClick(e) {
  console.log(e)
}


export function toggleVisibilityIfListEmpty() {
  const footer = $(".footer")
  const main = $(".main")

  if (todos.length < 1) {
    footer.style.display = "none"
    main.style.display = "none"
  } else {
    footer.style.display = "block"
    main.style.display = "block"
  }
}

function addNewTodo() {
  const inputValue = $(".new-todo").value.trim()
  console.log(inputValue)

  if(inputValue.length < 1) {
    return
  }

  const newTodo = {
    id: todos.length,
    title: inputValue,
    completed: false
  }

  todos.push(newTodo)
  renderTodoList()
}

export function handleKeyPress(event) {
  if (event.keyCode === 13) {
    addNewTodo()
  }
}