let body = document.querySelector("body");
let tabelaDiv = document.querySelector("#tabela");
let formularioDiv = document.querySelector("#formulario");

body.onload = function() {
    buscarLivros();
    setInterval(buscarLivros, 5000);
    montarFormularioLivros();
};

function buscarLivros() {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        console.log(this.responseText);
        const listaLivros = JSON.parse(this.responseText);
        montarTabelaLivros(listaLivros);
    }
    xhttp.open("GET", "http://localhost:3000/api/livros", true);
    xhttp.send();

}

function montarTabelaLivros(listaLivros) {
    let tabela = `<table>
        <tr>
            <th>ID</th>
            <th>Titulo</th>
            <th>Editora</th>
            <th>Ano Publicação</th>
            <th>ISBN</th>
        </tr>`;
    for (let index = 0; index < listaLivros.length; index++) {
        tabela += `<tr>
                      <td>${listaLivros[index].ID}</td>
                      <td>${listaLivros[index].titulo}</td>
                      <td>${listaLivros[index].editora}</td>
                      <td>${listaLivros[index].ano_publicacao}</td>
                      <td>${listaLivros[index].ISBN}</td>
                   </tr>`
    }
    tabela += `</table>`;
    tabelaDiv.innerHTML = tabela;
}

function montarFormularioLivros() {
    let formulario = `<form id='formLivros'>
                        <label for='titulo'>Titulo: </label>
                        <input id='tituloInput'> </br>
                        <label for='editora'>Editora: </label>
                        <input id='editoraInput'> </br>
                        <label for='anoPublicacao'>Ano Publicação: </label>
                        <input type='date' id='anoPublicacaoInput'> </br>
                        <label for='ISBN'>ISBN: </label>
                        <input id='ISBNInput'> </br>
                        <label for='idsAutores'>IDS Autores: </label>
                        <input id='idsAutoresInput'> </br> <!– To Do: Subistituir por um grid onde o usuário possa selecionar os autores –>
                        <input type='submit' value='Cadastrar'>
                     </form>`;
    formularioDiv.innerHTML = formulario;
    const formLivros = document.querySelector("#formLivros");
    formLivros.onsubimit = function(event) {
        event.preventDefault();//Evita que a página seja rendenizada novamente
        const titulo = document.querySelector("#titulo");
        const editora = document.querySelector("#editora");
        const anoPublicacao = document.querySelector("#anoPublicacao");
        const ISBN = document.querySelector("#ISBN");
        const idsAutores = document.querySelector("#idsAutores");

        if (titulo && editora && anoPublicacao && ISBN && idsAutores) {
            let livro = new Object();
            livro.titulo = titulo;
            livro.editora = editora;
            livro.anoPublicacao = anoPublicacao;
            livro.ISBN = ISBN;
            livros.idsAutores = idsAutores;

            addLivro(livro);
 
        } else {
            alert("Todos os campos devem ser preenchidos!");
        }
    }
}

function addLivro(livro) {
    let xhttp = new XMLHttpRequest();
    xhttp.onload = function() {

    }

    xhttp.open("POST", "http://localhost:3000/api/livros", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(livro);
}