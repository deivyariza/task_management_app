const addTaskButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('new-task');
const prioritySelect = document.getElementById('priority-select');
const filterInput = document.getElementById('filter-input');
const filterButton = document.getElementById('filter-btn');
const taskList = document.getElementById('task-list');
const dueDateInput = document.getElementById('due-date'); 


function addTask() {
    const taskText = taskInput.value.trim(); 
    const priority = prioritySelect.value; 
    const dueDate = dueDateInput.value; 

    if (taskText === '') {
        alert('Por favor, escribe una tarea.');
        return;
    }

    const listItem = document.createElement('li');
    listItem.textContent = taskText; 

    
    switch (priority) {
        case 'alta':
            listItem.style.color = 'red';
            break;
        case 'media':
            listItem.style.color = 'orange';
            break;
        case 'baja':
            listItem.style.color = 'black';
            break;
    }

    
    if (dueDate) {
        listItem.textContent += ` (Vence: ${dueDate})`; 
    }

    
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Completar';
    completeButton.onclick = function () {
        listItem.style.textDecoration = 'line-through'; 
        completeButton.disabled = true; 
        updateSummary(); 
    };

    
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.onclick = function () {
        const newTaskText = prompt('Edita tu tarea:', taskText);
        if (newTaskText !== null) {
            listItem.textContent = newTaskText;
            if (dueDate) {
                listItem.textContent += ` (Vence: ${dueDate})`; 
            }
        }
    };

    const changePriorityButton = document.createElement('button');
changePriorityButton.textContent = 'Cambiar Prioridad';
changePriorityButton.classList.add('priority');
changePriorityButton.onclick = function () {
    const newPriority = prompt('Asignar nueva prioridad (alta/media/baja):');
    if (newPriority) {
        listItem.style.color = (newPriority === 'alta') ? 'red' : (newPriority === 'media' ? 'orange' : 'black');
    }
};

    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.onclick = function () {
        listItem.remove(); 
        updateSummary(); 
    };

    listItem.appendChild(completeButton);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    listItem.appendChild(changePriorityButton);
    taskList.appendChild(listItem); 

    
    taskInput.value = '';
    dueDateInput.value = ''; 
    updateSummary(); 
}


addTaskButton.addEventListener('click', addTask);


taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

function updateSummary() {
    const totalTasks = taskList.getElementsByTagName('li').length;
    const completedTasks = Array.from(taskList.getElementsByTagName('li')).filter(task => 
        task.style.textDecoration === 'line-through'
    ).length;
    const pendingTasks = totalTasks - completedTasks;

    document.getElementById('total-tasks').textContent = `Total de tareas: ${totalTasks}`;
    document.getElementById('completed-tasks').textContent = `Tareas completadas: ${completedTasks}`;
    document.getElementById('pending-tasks').textContent = `Tareas pendientes: ${pendingTasks}`;
}



function filterTasks() {
    const filterText = filterInput.value.toLowerCase();
    const tasks = taskList.getElementsByTagName('li');

    Array.from(tasks).forEach(task => {
        const taskText = task.textContent.toLowerCase();
        task.style.display = taskText.includes(filterText) ? '' : 'none';
    });
}

filterButton.addEventListener('click', filterTasks);
