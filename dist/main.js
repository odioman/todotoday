/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/

/******/ })()
;

window.onload = loadTasks;

//on form submit add task
document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    addTask();
})

function loadTasks() {
//check local storage for tasks, if not then return
    if (localStorage.getItem('tasks') == null) return;
    
    //get tasks from local storage and covert to array
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    
    //Loop thru the tasks and add them to list
    tasks.forEach(task => {
        const list = document.querySelector('.todoList');
        const li = document.createElement('li');
        li.innerHTML = `
        <input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? 'checked' : ''}>
        <input type="text" value="${task.task}" class="task ${task.completed ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
        <button onclick="removeTask(this)">Delete</button>
        `
        list.insertBefore(li, list.children[0]);
    });
}

function addTask() {
    const task = document.querySelector("form input");
    const list = document.querySelector(".todoList");
    //return if task empty
    if (task.value === '') {
        alert("You definitely have something to do...");
        return false;
    }

    //check if task already exists
    if (document.querySelector(`input[value="${task.value}"]`)) {
        alert("You seem to have already added that task...");
        return false;
    }

    //add task to local storage
    localStorage.setItem("tasks", JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), {task: task.value, completed: false}]));

    //create list item and append to ul
    const li = document.createElement("li");
    li.innerHTML =
    `
    <input type="checkbox" onclick="taskComplete(this)" class="check">
    <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
    <button onclick="removeTask(this)">Delete</button>
    `
    list.insertBefore(li, list.children[0]);
    //clear input
    task.value=""
}

function taskComplete(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    tasks.forEach(task => {
        if (task.task === event.nextElementSibling.value) {
            task.completed = !task.completed;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    event.nextElementSibling.classList.toggle("completed");
}

function removeTask(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    tasks.forEach(task => {
        if (task.task === event.parentNode.children[1].value) {
            //delete task
            tasks.splice(tasks.indexOf(task), 1);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    event.parentElement.remove()
}

// store current to task to track changes
var currentTask = null;

//get current task
function getCurrentTask(event) {
    currentTask = event.value;
}

//edit the task and update local storage
function editTask(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    //check if task is empty
    if (event.value === '') {
        alert("Add something please");
        event.value = currentTask;
        return;
    }
    //task already exists
    tasks.forEach(task => {
        if (task.task === event.value) {
            alert("You already added that task");
            event.value = currentTask;
            return;
        }
    });
    //update task 
    tasks.forEach(task => {
        if (task.task === currentTask) {
            task.task = event.value;
        }
    });
    //update local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}