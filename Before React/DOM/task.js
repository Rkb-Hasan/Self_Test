const taskForm = document.querySelector("#taskForm");
const taskInput = document.querySelector("#taskInput");
const taskCount = document.querySelector("#taskCount");
const taskList = document.querySelector("#taskList");

function addTask(e) {
  e.preventDefault();
  console.log(e.target);
}

taskForm.addEventListener("submit", addTask);
