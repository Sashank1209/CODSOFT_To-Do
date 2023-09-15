document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const container = document.querySelector('.container');
    const h1 = document.querySelector('h1');
    const buttons = document.querySelectorAll('button');
    const darkModeText = document.querySelector('.dark-mode-toggle');
  
    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    function updateLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function renderTasks() {
      taskList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <span>${task}</span>
          <button class="editTask" data-index="${index}">Edit</button>
          <button class="deleteTask" data-index="${index}">Delete</button>
        `;
        taskList.appendChild(li);
      });
    }
  
    function addTask() {
      const task = taskInput.value.trim();
      if (task !== '') {
        tasks.push(task);
        updateLocalStorage();
        renderTasks();
        taskInput.value = '';
      }
    }
  
    function editTask(index, newTask) {
      tasks[index] = newTask;
      updateLocalStorage();
      renderTasks();
    }
  
    function deleteTask(index) {
      tasks.splice(index, 1);
      updateLocalStorage();
      renderTasks();
    }
  
    darkModeToggle.addEventListener('click', function () {
      body.classList.toggle('dark-mode');
      container.classList.toggle('dark-mode');
      h1.classList.toggle('dark-mode');
      buttons.forEach(button => button.classList.toggle('dark-mode'));
      darkModeText.classList.toggle('dark-mode');
    });
  
    addTaskButton.addEventListener('click', addTask);
  
    taskList.addEventListener('click', function (event) {
      const target = event.target;
      if (target.classList.contains('editTask')) {
        const index = target.getAttribute('data-index');
        const newTask = prompt('Edit task:', tasks[index]);
        if (newTask !== null) {
          editTask(index, newTask);
        }
      } else if (target.classList.contains('deleteTask')) {
        const index = target.getAttribute('data-index');
        deleteTask(index);
      }
    });
  
    renderTasks();
  });
  