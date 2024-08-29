// Capturar elementos
const container = document.getElementById('container');
const tsk_lst = document.getElementById('tsk_lst');
const form = document.querySelector('#form_storage');
const input = document.querySelector('#txt_bar');
const select = document.querySelector('#priority');
const date_time = document.querySelector('#remain_time');

// Eventos
tsk_lst.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('finish-btn')) {
        const taskIndex = event.target.dataset.index;
        finish_task(taskIndex);
    } else if (event.target && event.target.classList.contains('edit-btn')) {
        const taskIndex = event.target.dataset.index;
        edit_task(taskIndex);
    } else if (event.target && event.target.classList.contains('delete-btn')) {
        const taskIndex = event.target.dataset.index;
        delete_task(taskIndex);
    }
});


form.addEventListener('submit', listener);

//funcoes
function active_task() {
    const data_sto = localStorage.getItem("task");
    let data_pool = JSON.parse(data_sto) || [];
    
    tsk_lst.innerHTML = '';
    
    data_pool.forEach((post, index) => {

        const divCard = document.createElement('div');
        divCard.classList.add('task');

        const task_name = document.createElement('h2');
        task_name.innerText = post.task_name;

        const level = document.createElement('h4');
        level.innerText = post.priority;
        
        const date_limit = document.createElement('input');
        date_limit.classList.add('rmt');
        date_limit.value = post.rmt;
        
        const finish = document.createElement('input');
        finish.setAttribute('type', 'button');
        finish.setAttribute('id', 'tsk_opt');
        finish.setAttribute('data-index', index);
        finish.classList.add('finish-btn');
        finish.value = 'concluir';
        
        const edit = document.createElement('input');
        edit.setAttribute('type', 'button');
        edit.setAttribute('id', 'tsk_opt');
        edit.setAttribute('data-index', index);
        edit.classList.add('edit-btn');
        edit.value = 'editar';

        const del = document.createElement('input');
        del.setAttribute('type', 'button');
        del.setAttribute('id', 'tsk_opt');
        del.setAttribute('data-index', index);
        del.classList.add('delete-btn');
        del.value = 'excluir';
        
        divCard.appendChild(task_name);
        divCard.appendChild(level);
        divCard.appendChild(date_limit);
        divCard.appendChild(finish);
        divCard.appendChild(edit);
        divCard.appendChild(del);
        tsk_lst.appendChild(divCard);
    });
}

function listener(event) {
    event.preventDefault();

    const task_name = input.value;
    const priority = select.value;
    const rmt = date_time.value;

    let task = {
        task_name: task_name,
        priority: priority,
        rmt: rmt
    };
    let tasks = JSON.parse(localStorage.getItem("task")) || [];

    tasks.push(task);
    localStorage.setItem("task", JSON.stringify(tasks));
    active_task();

    input.value = '';
    select.value = '';
    date_time.value = '';
}

function edit_task(index) {
    let tasks = JSON.parse(localStorage.getItem("task")) || [];
    
    if (index >= 0 && index < tasks.length) {
        input.value = tasks[index].task_name;
        select.value = tasks[index].priority;
        date_time.value = tasks[index].rmt;
        

        form.removeEventListener('submit', listener);
        
        function saveEdit(event) {
            event.preventDefault();

            tasks[index].task_name = input.value;
            tasks[index].priority = select.value;
            tasks[index].rmt = date_time.value;

            localStorage.setItem("task", JSON.stringify(tasks));

            form.removeEventListener('submit', saveEdit);
            form.addEventListener('submit', listener);

            input.value = '';
            select.value = '';
            date_time.value = '';

            active_task();
        }

        form.addEventListener('submit', saveEdit);
    }
    else {
         alert('Tarefa não encontrada para edição.');
    }
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

function delete_task(index) {
    let tasks = JSON.parse(localStorage.getItem("task")) || [];

    tasks.splice(index, 1);

    localStorage.setItem("task", JSON.stringify(tasks));

    active_task();
}

active_task();