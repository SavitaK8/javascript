const todoList = [];

function addTodo() {
  const inputTask = document.querySelector('.js-todo-input');
  const name = inputTask.value;


  const inputDate = document.querySelector('.js-date-input');
  const dueDate = inputDate.value;

  todoList.push({
    name , dueDate
  });

  inputTask.value = '';
  inputDate.value = '';

  renderTodoList();
} 


function renderTodoList() {

  let todoListHTML = '';

  for(let i=0; i<todoList.length; i++) {

    const todoObject = todoList[i];

    const {name , dueDate} = todoObject;

    const html = `<div>${name}</div>
    <div>${dueDate}</div>
    <button onclick="
    todoList.splice(${i}, 1);
    renderTodoList();
    " class="delete-todo-button">Delete</button>`;

    todoListHTML += html;
  }

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

}


