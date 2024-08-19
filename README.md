um to do list feito com javascript como metodo de avaliacao para a disciplina de web dinamico

segue modelo

![image](https://github.com/user-attachments/assets/383f16bc-6cd6-416d-bd71-0b11df032d4e)

---------------------------------------------------------
o modelo deve salvar os itens como objeto json, em um array 
no localStorage, utilizando os comandos localStorage.setItem & localStorage.getItem

apos armazenar, uma funcao map captura todos os objetos e mostra na tela, com seus devidos cards/linhas, com as opcoes de concluir e modificar

adicionar - recebe o valor no campo de input, junto da data selecionada com o atributo de urgencia, armazena no localstorage como um objeto json

fetch - uma funcao assincrona pega todos os objetos  instanciados no array e exibe em uma lista com os campos de editar e concluir

editar - realiza uma busca no array para modificar aquele objeto especificado e modificar a informacao solicitada

concluir - finaliza a tarefa marcando demarcando ela de modo diferente das demais, seja riscado, ou com cores.

