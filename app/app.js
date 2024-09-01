// Aqui o foco foi manter a estrutura/logica utilizada para fazer o codigo.
// Porem como o bootstrap foi implementado, foi preciso substituir os elementos
// pelos elementos do bootstrap

// Também foi adicionado o comando switch, este comando que
// funcionará em relaçao as prioridades e servirá como um "perfil",
// que tará cor, imagem, texto para cada prioridade

// Tambem como mencionado no codigo do html, no js terá outro novo comando
// que será o clone node, este comando servirá para clonarmos o template que
// esta no html e trazer o mesmo para a DOM para assim possamos personalizar
// as suas areas(inserindo a imagem, tarefa, prioridade e data) e ja
// utilizar a estrutura que o bootstrap fornece



// Capturar elementos
const container = document.getElementById('container');
const tsk_lst = document.getElementById('tsk_lst');
const form = document.querySelector('#form_storage');
const input = document.querySelector('#txt_bar');
const select = document.querySelector('#priority');
const date_time = document.querySelector('#remain_time');


const cardTemplate = document.getElementById('task-template');

// Eventos
tsk_lst.addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('finish-btn')) {
        const taskIndex = event.target.closest('.card').dataset.index;
        finish_task(taskIndex);
    } else if (event.target && event.target.classList.contains('edit-btn')) {
        const taskIndex = event.target.closest('.card').dataset.index;
        edit_task(taskIndex);
    } else if (event.target && event.target.classList.contains('delete-btn')) {
        const taskIndex = event.target.closest('.card').dataset.index;
        delete_task(taskIndex);
    }
});

form.addEventListener('submit', listener);


function active_task() {
    const data_sto = localStorage.getItem("task");
    let data_pool = JSON.parse(data_sto) || [];
    
    tsk_lst.innerHTML = ''; 

// Novo comando do codigo -> clone.Node

    data_pool.forEach((post, index) => {
        const newCard = cardTemplate.cloneNode(true);
        newCard.classList.remove('d-none');
        newCard.setAttribute('data-index', index);

    
        const cardBody = newCard.querySelector('.card-body');
        const cardImage = newCard.querySelector('.card-img-top');

// Novo comando do codigo -> switch

        switch (post.priority) {
            case 'alta':
                cardBody.classList.add('bg-danger', 'text-white');
                cardImage.src = '/models/assets/alta.png'; 
                break;
            case 'media':
                cardBody.classList.add('bg-warning', 'text-dark');
                cardImage.src = '/models/assets/media.png';
                break;
            case 'baixa':
                cardBody.classList.add('bg-success', 'text-white');
                cardImage.src = '/models/assets/baixa.png';
                break;
            default:
                cardBody.classList.add('bg-light', 'text-dark');
                cardImage.src = '';
        }

        const taskNameElement = newCard.querySelector('.card-title');
        taskNameElement.innerText = post.task_name;

        const taskDetailsElement = newCard.querySelector('.card-text');
        taskDetailsElement.innerText = `Prioridade: ${post.priority} \nData limite: ${post.rmt}`;

        tsk_lst.appendChild(newCard);
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
    } else {
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