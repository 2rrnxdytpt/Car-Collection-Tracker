let carros = JSON.parse(localStorage.getItem("carros")) || [];

function mostrarCarros(){

const container = document.querySelector(".container");
container.innerHTML = "";

carros.forEach((carro,index)=>{

container.innerHTML += `
<div class="card">

<img src="${carro.foto}">
<h2>${carro.nome}</h2>

<p>Ano: ${carro.ano}</p>
<p>Série: ${carro.serie}</p>
<p>Número: ${carro.numero}</p>

<button onclick="remover(${index})">Remover</button>

</div>
`;

});

}

function adicionarCarro(){

let nome = prompt("Nome do modelo");
let ano = prompt("Ano");
let serie = prompt("Série");
let numero = prompt("Número coleção");
let foto = prompt("URL da foto");

carros.push({
nome,
ano,
serie,
numero,
foto
});

localStorage.setItem("carros", JSON.stringify(carros));

mostrarCarros();

}

function remover(index){

carros.splice(index,1);

localStorage.setItem("carros", JSON.stringify(carros));

mostrarCarros();

}

document.querySelector(".add").onclick = adicionarCarro;

mostrarCarros();