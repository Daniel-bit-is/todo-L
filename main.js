import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="todo-container">
    <h1> Todo List</h1>
    <form class="todo-form" id="todoForm">
      <input 
        type="text" 
        class="todo-input" 
        id="todoInput" 
        placeholder="Add a new task..."
        required
      >
      <button type="submit" class="add-button">Add</button>
    </form>
    <ul class="todo-list" id="todoList"></ul>
  </div>
`

const todoForm = document.getElementById('todoForm')
const todoInput = document.getElementById('todoInput')
const todoList = document.getElementById('todoList')

let todos = []

function addTodo(text) {
  const todo = {
    id: Date.now(),
    text,
    completed: false
  }
  todos.push(todo)
  renderTodos()
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id)
  renderTodos()
}

function toggleTodo(id) {
  todos = todos.map(todo => 
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  )
  renderTodos()
}

function renderTodos() {
  todoList.innerHTML = todos
    .map(todo => `
      <li class="todo-item">
        <input 
          type="checkbox" 
          class="todo-checkbox" 
          ${todo.completed ? 'checked' : ''}
          onchange="window.toggleTodo(${todo.id})"
        >
        <span class="todo-text ${todo.completed ? 'completed' : ''}">
          ${todo.text}
        </span>
        <button 
          class="delete-button"
          onclick="window.deleteTodo(${todo.id})"
        >
          Delete
        </button>
      </li>
    `)
    .join('')
}

todoForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const text = todoInput.value.trim()
  if (text) {
    addTodo(text)
    todoInput.value = ''
  }
})

// Hacer que las funciones estén disponibles globalmente para los controladores onclick
window.deleteTodo = deleteTodo
window.toggleTodo = toggleTodo

// renderizado inicial
renderTodos()