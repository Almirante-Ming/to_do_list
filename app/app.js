// capturar elementos
const form = document.querySelector('#form_storage');
const input = document.querySelector('#txt_bar');


// eventos
form.addEventListener('submit', function(event){
    event.preventDefault();
    const name = input.value;
    localStorage.setItem("nome", JSON.stringify({nome: name,idade:20}))
    const r = localStorage.getItem("nome");
    console.log(r)
})


// funcoes