const todoList = [];

document.querySelector('.js-add-todo-button').addEventListener('click' , () => {
    addTodo();
});

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

  todoList.forEach((todoObject, index) => {
    const {name , dueDate} = todoObject;

    const html = `<div>${name}</div>
    <div>${dueDate}</div>
    <button class="delete-todo-button js-delete-todo-button">Delete</button>`;

    todoListHTML += html;
  });
   
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;  

  document.querySelectorAll('.js-delete-todo-button').forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
    todoList.splice(index, 1);
    renderTodoList();
  });
});
 
}

// closure concept
