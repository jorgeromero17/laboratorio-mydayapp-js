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
  console.log(todos)
  todos.forEach(todo => {
    const todoItem = document.createElement("li")
    todoItem.setAttribute("value", todo.id)
    todoItem.className = todo.completed ? "completed" : ""
    todoItem.addEventListener("dblclick", (e) => handleDoubleClick(e.target))

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

function handleDoubleClick(target) {  
  const li = target.offsetParent
  const input = li.childNodes[1]
  toggleEditingView(li,input,true)
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

function updateTodo(id,input) {
  console.log(id,input)
  todos = todos.map(todo=>{
    if(todo.id === id) {
      todo.title = input.value.trim()
    }
    return todo
  })
  renderTodoList()

}

function toggleEditingView(li,input,isEditing) {
  if(isEditing) {
    li.classList.remove("view")
    li.classList.add("editing")
    input.focus()
  } else {
    li.classList.add("view")
    li.classList.remove("editing")
    input.blur()
  }
}

export function handleKeyPress(event) {
  if (event.key === "Enter") {
    const mainInput = $(".new-todo")
    const inputOnFocus = document.activeElement
    if(inputOnFocus) {
      if(inputOnFocus === mainInput) {
        addNewTodo()
      } else {
        const li = $(".editing")
        toggleEditingView(li,inputOnFocus,false)
        updateTodo(li.value,inputOnFocus)
      }
    }
  }
  if (event.key === "Escape") {
    const li = $(".editing")
    if(li){
      const inputOnFocus = document.activeElement
      toggleEditingView(li,inputOnFocus,false)
    }
  }
}