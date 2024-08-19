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
const data_pool= localStorage.getItem("task");

// async function getResponse(){

//     data_pool.map((post)=> {
//         const divCard= document.createElement('div');
//         divCard.classList.add("card");
//         const task_name=document.createElement('h1');
//         task_name.innerText=post.title
//         const remain_time=document.createElement('p');
//         remain_time.innerText=post.body
//         const concluido=document.createElement('a');
//         concluido.innerText="ler mais..."
//         link.setAttribute("href", `https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
//         link.setAttribute("id", post.id )
    
//         divCard.appendChild(title);
//         divCard.appendChild(body);
//         divCard.appendChild(link);
//         container.appendChild(divCard);
        
//         console.log(post)
// } )
//  }


//  getResponse();