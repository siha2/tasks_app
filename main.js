let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let delAll = document.querySelector(".re");
let arrayOfTasks = [];

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

// add task
submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    input.value = "";
  }
}

tasksDiv.addEventListener("click", (e) => {
  // delete button
  if (e.target.classList.contains("del")) {
    // remove task from local storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // remove element from page
    e.target.parentElement.remove();
  }
  // task element
  if (e.target.classList.contains("task")) {
    // toggle completed for the task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));
    // toggle done class
    e.target.classList.toggle("done");
  }
})

delAll.onclick = function () {
  arrayOfTasks = [];
  localStorage.removeItem("tasks");
  tasksDiv.innerHTML = "";
}

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false
  };
  arrayOfTasks.push(task);
  addElementsToPageFrom(arrayOfTasks);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  // empty tasks div
  tasksDiv.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    // create main div
    let div = document.createElement("div");
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    // create delete button
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasksDiv.appendChild(div);
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false ? arrayOfTasks[i].completed = true : arrayOfTasks[i].completed = false;
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}