// carregar carros guardados
let carros = JSON.parse(localStorage.getItem("carros")) || [];

const container = document.querySelector(".container");
const scanBtn = document.querySelector(".scanBtn");
const fotoInput = document.getElementById("fotoInput");
const preview = document.getElementById("preview");

let fotoAtual = "";

// mostrar carros
function mostrarCarros(){

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

atualizarEstatisticas();

}

// abrir câmara
scanBtn.onclick = () => {
fotoInput.click();
};

// quando tira foto
fotoInput.onchange = () => {

const file = fotoInput.files[0];

if(!file) return;

const reader = new FileReader();

reader.onload = function(e){

fotoAtual = e.target.result;
preview.src = fotoAtual;

};

reader.readAsDataURL(file);

};

// adicionar carro
function adicionarCarro(){

if(!fotoAtual){
alert("Tire uma foto primeiro!");
return;
}

let nome = prompt("Nome do modelo");
let ano = prompt("Ano");
let serie = prompt("Série");
let numero = prompt("Número da coleção");

carros.push({
nome,
ano,
serie,
numero,
foto: fotoAtual
});

localStorage.setItem("carros", JSON.stringify(carros));

fotoAtual = "";
preview.src = "";

mostrarCarros();

}

// remover carro
function remover(index){

carros.splice(index,1);

localStorage.setItem("carros", JSON.stringify(carros));

mostrarCarros();

}

// estatísticas
function atualizarEstatisticas(){

const totalCarros = document.getElementById("totalCarros");
const totalSeries = document.getElementById("totalSeries");
const totalAnos = document.getElementById("totalAnos");

if(!totalCarros) return;

totalCarros.textContent = carros.length;

let series = new Set();
let anos = new Set();

carros.forEach(carro=>{
series.add(carro.serie);
anos.add(carro.ano);
});

totalSeries.textContent = series.size;
totalAnos.textContent = anos.size;

}

// botão adicionar
document.querySelector(".add").onclick = adicionarCarro;

// iniciar app
mostrarCarros();