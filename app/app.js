// capturar elementos
const container = document.getElementById('container');
const form = document.querySelector('#form_storage');
const input = document.querySelector('#txt_bar');
const select = document.querySelector('#priority');
const date_time = document.querySelector('#remain_time');


// eventos
form.addEventListener('submit', function(event){
    event.preventDefault();
    const task = input.value;
    const priority = select.value;
    const rmt = date_time.value;
    localStorage.setItem("task", JSON.stringify({task: task, priority, rmt}))
    const r = localStorage.getItem("task");
    console.log(r)
})

// priority.addEventListener('change', function(event){
//     console.log(priority.value)
// })

// funcoes