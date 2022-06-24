// Globals
const todoList = document.getElementById('todo-list');
const userSelect = document.getElementById('user-todo');
let todos = [];
let users = [];

//Attach Events - привязываем событие
// event when the document is fully loaded - make func initApp
document.addEventListener('DOMContentLoaded', initApp);

// basic logic
function getUserName(userId) {
  const user = users.find((u) => u.id === userId);
  return user.name;
}

function printTodo({ id, userId, title, completed }) {
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.dataset.id = id;
  li.innerHTML = `<span>${title} <i>by</i> <b>${getUserName(
    userId
  )}</b></span>`;

  const status = document.createElement('input');
  status.type = 'checkbox';
  status.checked = completed;

  const close = document.createElement('span');
  // html = x
  close.innerHTML = '&times';
  close.className = 'close';

  li.prepend(status);
  li.append(close);

  todoList.prepend(li);
}

// one option for one user
function createUserOption(user) {
  const option = document.createElement('option');
  option.value = user.id;
  option.innerText = user.name;

  userSelect.append(option);
}

// Event logic - task - to get users and somwhere to save
function initApp() {
  // for us important to get all date - we use promise.all
  // values its - arr - and we can use деструктуризацию
  Promise.all([getAllTodos(), getAllUsers()]).then((values) => {
    [todos, users] = values;

    // after we got it - we should send them in разметку
    todos.forEach((todo) => printTodo(todo));
    users.forEach((user) => createUserOption(user));
  });
}

// Async logic
// get all tasks, await use inside - not ouside
async function getAllTodos() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await response.json();

  return data;
}

// get all usres
async function getAllUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await response.json();

  return data;
}
