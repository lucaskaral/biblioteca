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
                        <input id='anoPublicacaoInput'> </br>
                        <label for='ISBN'>ISBN: </label>
                        <input type='date' id='ISBNInput'> </br>
                        <input type='submit' value='Cadastrar'>
                     </form>`;
    formularioDiv.innerHTML = formulario;
}