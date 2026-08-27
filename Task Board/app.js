const addTasks = document.querySelector(".add-task-form");
const todoList = document.querySelector("#todo-list");
const inProgressList = document.querySelector("#in-progress-list");
const doneList = document.querySelector("#done-list");
const clearTasks = document.querySelector("#clear-all-btn");
const taskLists = document.querySelectorAll(".task-list");
const board = document.querySelector(".board-container");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function populateTask(items) {
  taskLists.forEach((task) => (task.innerHTML = ""));

  items.map((item) => {
    const itemList = document.querySelector(`#${item.status}-list`);
    if (itemList) {
      const itemHTML = `<li class="task-item" data-id=${item.id} data-status=${item.status}>
       <p class="task-action">
          ${item.text}
            <button style="display: ${item.status === "done" && "none"}">
               <img data-id=${item.id} id="update" src="./images/${item.status}.png" alt=${item.status} />
            </button>
            <button >
               <img data-id=${item.id} id="delete" src="./images/delete.png" alt="delete" />
            </button>
       </p>
    </li>`;
      itemList.innerHTML += itemHTML;
    }
  });
}

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
  populateTask(tasks);

  this.reset();
}

function deleteTask(el) {
  const index = tasks.findIndex((task) => task.id === Number(el.dataset.id));

  if (index !== -1) {
    tasks.splice(index, 1);
  }

  populateTask(tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskStatus(el) {
  const status = el.closest(".task-item").dataset.status;
  const updatedStatus = status === "todo" ? "in-progress" : "done";

  const newTasks = tasks.map((task) => {
    if (!(task.id === Number(el.dataset.id))) {
      return task;
    }
    task.status = updatedStatus;
    return task;
  });

  tasks.splice(0, tasks.length, ...newTasks);
  populateTask(tasks);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function action(e) {
  const el = e.target;

  if (el.matches("#delete")) {
    deleteTask(el);
  } else if (el.matches("#update")) {
    updateTaskStatus(el);
  }
}

function clearAllTasks() {
  const currentStore = JSON.parse(localStorage.getItem("tasks"));
  if (!(currentStore?.length && currentStore !== null)) {
    alert("Task board is empty!");
    return;
  }

  const confirmed = confirm("Are you sure?");
  if (confirmed) {
    populateTask([]);
    localStorage.setItem("tasks", JSON.stringify([]));
  }
}

board.addEventListener("click", action);
addTasks.addEventListener("submit", addTask);
clearTasks.addEventListener("click", clearAllTasks);
populateTask(tasks);
