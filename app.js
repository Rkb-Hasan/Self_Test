const addTasks = document.querySelector(".add-task-form");
const todoList = document.querySelector("#todo-list");
const inProgressList = document.querySelector("#in-progress-list");
const doneList = document.querySelector("#done-list");
const clearTasks = document.querySelector("#clear-all-btn");
const taskLists = document.querySelectorAll(".task-list");
const board = document.querySelector(".board-container");

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
            <button style="${item.status == "done" ? "display: hidden;" : ""}" data-id=${item.id} id="update">--></button>
            <button data-id=${item.id} id="delete" class="danger-btn">X</button>
       </p>
    </li>
   `;
    })
    .join("");
}

function deleteTask(el) {
  const index = tasks.findIndex((task) => task.id === Number(el.dataset.id));

  if (index !== -1) {
    tasks.splice(index, 1);
  }

  populateTask(tasks, todoList);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatus(el) {
  const status = el.closest(".task-item").dataset.status;
  const updatedStatus = status === "todo" ? "in-progress" : "done";

  const newArr = tasks.map((task) => {
    console.log(task.id === Number(el.dataset.id));
    if (!(task.id === Number(el.dataset.id))) {
      return task;
    }
    task.status = updatedStatus;
    return task;
  });

  console.log(newArr);
}

function action(e) {
  const el = e.target;
  //   console.log(el);

  if (el.matches("#delete")) {
    deleteTask(el);
    // console.log(el);
  } else if (el.matches("#update")) {
    updateTaskStatus(el);
  }
}

board.addEventListener("click", action);
addTasks.addEventListener("submit", addTask);

populateTask(tasks, todoList);
