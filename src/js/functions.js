import { $, cleanButton } from "./utils";

let todos = JSON.parse(localStorage.getItem("mydayapp-js")) ?? []

function renderTodoList(todos){
  const todoListContainer = $(".todo-list")
  todoListContainer.innerHTML = ""

  todos.forEach(todo => {
    const todoItem = document.createElement("li")
    todoItem.setAttribute("data-id", todo.id)
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
    destroyButton.addEventListener("click", () => handleDestroyTodo(todo.id))

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

  renderClearCompletedButton()
}

function toggleTodoState(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      return {
        ...todo,
        completed: !todo.completed
      }
    }
    return todo
  })
  renderTodosByHash(window.location.hash)
  renderListCounter()
  updateLocalStorage()
}

function handleDoubleClick(target) {
  const liEditing = $(".editing")
  if(liEditing){
    return
  }

  const li = target.offsetParent
  if(li){
    const input = li.childNodes[1]
    toggleEditingView(li,input,true)
  }
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
  const input = $(".new-todo")
  const inputValue = input.value.trim()

  if(inputValue.length < 1) {
    return
  }

  const newTodo = {
    id: generateUniqueId(),
    title: inputValue,
    completed: false
  }

  todos.push(newTodo)
  renderTodosByHash(window.location.hash)
  renderListCounter()
  toggleVisibilityIfListEmpty()
  updateLocalStorage()
  input.value = ""
}

function generateUniqueId() {
  const timestamp = new Date().getTime();
  return `${timestamp}`;
}

function updateTodo(id,input) {
  
  todos = todos.map(todo=>{
    if(todo.id === id) {
      todo.title = input.value.trim()
    }
    return todo
  })
  renderTodosByHash(window.location.hash)
  renderListCounter()
  updateLocalStorage()
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
        updateTodo(li.getAttribute("data-id"),inputOnFocus)
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

export function renderListCounter() {
  const counter = todos.filter(todo => !todo.completed).length

  const counterIndicator = $(".todo-count")
  counterIndicator.innerHTML = `<strong>${counter}</strong> ${counter > 1 ? "items" : "item" } left`
}

export function clearCompleted() {
  todos = todos.filter(todo => !todo.completed)
  renderTodosByHash(window.location.hash)
  toggleVisibilityIfListEmpty()
  updateLocalStorage()
}

function updateLocalStorage() {
  const miArrayJSON = JSON.stringify(todos)
  localStorage.setItem('mydayapp-js', miArrayJSON)
}

function handleDestroyTodo(id) {
  todos = todos.filter(todo => todo.id != id)
  renderTodosByHash(window.location.hash)
  renderListCounter()
  toggleVisibilityIfListEmpty()
  updateLocalStorage()
}

export function handleHashChange() {
  const hash = window.location.hash
  renderTodosByHash(hash)

}

export function renderTodosByHash(hash) {
  let todosToShow = [...todos]
  switch (hash) {
    case '#/all':
      renderTodoList(todos)
      break;
    case '#/pending':
      todosToShow = todos.filter(todo => !todo.completed)
      renderTodoList(todosToShow)
      break;
    case '#/completed':
      todosToShow = todos.filter(todo => todo.completed)
      renderTodoList(todosToShow)
      break;
    default:
      renderTodoList(todos)
      break;
  }
  toggleClassBasedOnHash(hash)
}

function  toggleClassBasedOnHash(hash) {
  // Obtener todos los elementos <a> dentro de la lista con la clase "filters"
  const anchors = document.querySelectorAll('.filters a');
    
  // Si el hash está vacío o no coincide con ningún href, selecciona el anchor con href "#/all"
  let hashFound = false;
  anchors.forEach(function(anchor) {
    const href = anchor.getAttribute('href');
    if (href === hash) {
      anchor.classList.add('selected');
      hashFound = true;
    } else {
      anchor.classList.remove('selected');
    }
  });

  if (!hashFound) {
    anchors.forEach(function(anchor) {
      const href = anchor.getAttribute('href');
      if (href === '#/all') {
        anchor.classList.add('selected');
      }
    });
  }
}

function renderClearCompletedButton() {
  const anyCompleted = todos.some(todo => todo.completed)
  cleanButton.style.display = anyCompleted ? "block" : "none";
}
