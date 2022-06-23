// Globals
let todos = [];
let users = [];

//Attach Events - привязываем событие
// event when the document is fully loaded - make func initApp
document.addEventListener('DOMContentLoaded', initApp);

// Event logic - task - to get users and somwhere to save
function initApp() {
  // for us important to get all date - we use promise.all
  // values its - arr - and we can use деструктуризацию
  Promise.all([getAllTodos(), getAllUsers]).then((values) => {
    [todos, users] = values;

    // after we got it - we should send them in разметку
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
