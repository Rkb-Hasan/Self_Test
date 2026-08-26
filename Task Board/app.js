const addTasks = document.querySelector(".add-task-form");
const todoList = document.querySelector("#todo-list");
const inProgressList = document.querySelector("#in-progress-list");
const doneList = document.querySelector("#done-list");
const clearTasks = document.querySelector("#clear-all-btn");
const taskLists = document.querySelectorAll(".task-list");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
function addTask(e) {
  e.preventDefault();
  const text = this.querySelector("input[type=text]").value;

  const task = {
    id: Date.now(),
    text,
    status: "todo",
  };

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  populateTask(tasks, todoList);

  this.reset();
}

function populateTask(items, itemList) {
  itemList.innerHTML = items
    .map((item) => {
      return `
    <li class="task-item" data-id=${item.id} data-status=${item.status}>
       <p class="task-action">
            ${item.text}
            <button>--></button>
            <button data-id=${item.id} class="danger-btn">X</button>
       </p>
    </li>
   `;
    })
    .join("");
}

function deleteTask(e) {
  if (!e.target.matches(".danger-btn")) return;
  console.log(tasks);

  const index = tasks.findIndex(
    (task) => task.id === Number(e.target.dataset.id),
  );
  console.log(index);
  if (index !== -1) {
    tasks.splice(index, 1);
  }

  populateTask(tasks, todoList);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

addTasks.addEventListener("submit", addTask);

taskLists.forEach((taskList) => {
  taskList.addEventListener("click", deleteTask);
});

populateTask(tasks, todoList);
