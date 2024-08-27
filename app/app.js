// Capturar elementos
const container = document.getElementById('container');
const tsk_lst = document.getElementById('tsk_lst');
const form = document.querySelector('#form_storage');
const input = document.querySelector('#txt_bar');
const select = document.querySelector('#priority');
const date_time = document.querySelector('#remain_time');


// Eventos
form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const task_name = input.value;
    const priority = select.value;
    const rmt = date_time.value;

    let task = { task_name: task_name, priority: priority, rmt: rmt };
    let tasks = JSON.parse(localStorage.getItem("task")) || [];

    tasks.push(task);
    localStorage.setItem("task", JSON.stringify(tasks));
    active_task();
});

tsk_lst.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('finish-btn')) {
        const taskIndex = event.target.dataset.index;
        finish_task(taskIndex);
    }
});

// Funcoes
function active_task() {
    const data_sto = localStorage.getItem("task");
    let data_pool = JSON.parse(data_sto) || [];
    
    tsk_lst.innerHTML = '';
    
    data_pool.reverse().forEach((post, index) => {
        const divCard = document.createElement('div');
        divCard.classList.add('task');
        
        const task_name = document.createElement('h2');
        task_name.innerText = post.task_name;
        
        const level = document.createElement('p');
        level.innerText = post.priority;
        
        const date_limit = document.createElement('input');
        date_limit.classList.add('rmt');
        date_limit.value = post.rmt;
        
        const finish = document.createElement('input');
        finish.setAttribute('type', 'button');
        finish.value = 'concluir';
        finish.classList.add('finish-btn');
        finish.setAttribute('data-index', index);

        divCard.appendChild(task_name);
        divCard.appendChild(level);
        divCard.appendChild(date_limit);
        divCard.appendChild(finish);
        tsk_lst.appendChild(divCard);
    });
}

function finish_task(index) {
    let tasks = JSON.parse(localStorage.getItem("task")) || [];
    let finishedTasks = JSON.parse(localStorage.getItem("finish_tasks")) || [];

    const [completedTask] = tasks.splice(index, 1);
    finishedTasks.push(completedTask);

    localStorage.setItem("task", JSON.stringify(tasks));
    localStorage.setItem("finish_tasks", JSON.stringify(finishedTasks));

    active_task();
}

active_task();
