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
    let tasks = JSON.parse(localStorage.getItem("task"));

    if (!Array.isArray(tasks)) {
        tasks = [];
    }

    tasks.push(task);
    localStorage.setItem("task", JSON.stringify(tasks));
    criar_lista();
});

// priority.addEventListener('change', function(event){
//     console.log(priority.value);
// });


// Funções
function criar_lista() {
    const data_sto = localStorage.getItem("task");
    let data_pool = JSON.parse(data_sto);
    
    tsk_lst.innerHTML = '';
    
    data_pool.reverse().map((post) => {
        const divCard = document.createElement('div');
        divCard.classList.add('task');
        
        const task_name = document.createElement('h2');
        task_name.innerText = post.task_name;
        
        const level = document.createElement('p');
        level.innerText = post.priority;
        
        const date_limit = document.createElement('input');
        date_limit.classList.add('rmt');
        date_limit.value = post.rmt;
        
        const edit = document.createElement('input');
        edit.setAttribute('type','submit');
        edit.value = 'concluir';
        
        divCard.appendChild(task_name);
        divCard.appendChild(level);
        divCard.appendChild(date_limit);
        divCard.appendChild(edit);
        tsk_lst.appendChild(divCard);
        
        // console.log(post);
    });
}

// function deletar_task(){
//     const data_sto = localStorage.getItem("task");
//     let data_pool = JSON.parse(data_sto);
//     data_pool.find
    
// }
criar_lista();
