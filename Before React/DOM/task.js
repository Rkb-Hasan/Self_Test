const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskCount = document.querySelector("#taskCount");
const taskList = document.querySelector("#taskList");
const totalTask = taskList.getElementsByClassName("taskIteam").length ?? 0;

function updateTaskCount() {
  taskCount.textContent = `Tasks: ${taskList.getElementsByClassName("taskIteam").length}`;
}

function updateInterface(item) {
  taskList.appendChild(item);
  updateTaskCount();
}

function deleteTask(e) {
  if (e.target.dataset.action !== "delete") return;

  this.removeChild(e.target.closest(".taskIteam"));
  updateTaskCount();
}

function addTask(e) {
  e.preventDefault();
  const task = taskInput.value.trim();

  if (!task) {
    alert("Task cant be empty");
    return;
  }

  const item = document.createElement("li");
  item.classList.add("taskIteam");
  const itemChild = document.createElement("p");
  itemChild.innerHTML = `
  <span>${task}</span>
  <button data-action ="delete">delete</button>
  <button>edit</button> 
`;
  item.appendChild(itemChild);
  updateInterface(item);
  this.reset();
}

taskCount.textContent = `Tasks: ${totalTask}`;
taskForm.addEventListener("submit", addTask);
taskList.addEventListener("click", deleteTask);
