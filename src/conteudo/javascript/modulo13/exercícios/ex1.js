/**
 * 1 - Descrever um algoritmo para resolver o problema da travessia de modo “seguro':
 Um homem precisa atravessar um rio com um barco que possui capacidade apenas para 
 carregar ele mesmo e mais um de seus três pertences. São eles: um lobo, uma cabra 
 e um maço de alfafa. Em cada viagem, só é possível ir o homem e apenas um de seus 
pertences. A seguinte regra deverá ser respeitada: o lobo não pode ficar sozinho 
com a cabra e nem a cabra sozinha com o maço de alfafa. Escreva um algoritmo para 
fazer a travessia dos pertences que estão em uma margem do rio para a outra.
 */

// O BARCO
let barco = [];

//  A ORIGEM
let origem = ["homem", "lobo", "cabra", "alfafa"];

// O DESTINO
let destino = [];

console.log("Início!");

// PRIMEIRA VIAGEM
console.log("PRIMEIRA VIAGEM");
console.log("1 - Entram no barco o homem e a cabra");

origem = sai(origem, ["homem", "cabra"]);
barco = entra(barco, ["homem", "cabra"]);
exibir(barco, origem, destino);

console.log("2 - Chegam ao destino o homem e a cabra");

barco = sai(barco, ["homem", "cabra"]);
destino = entra(destino, ["homem", "cabra"]);
exibir(barco, origem, destino);

console.log("3 - O homem deixa a cabra e retorna sozinho ao barco");

destino = sai(destino, ["homem"]);
barco = entra(barco, ["homem"]);
exibir(barco, origem, destino);

console.log("4 - O homem retorna à origem");

barco = sai(barco, ["homem"]);
origem = entra(origem, ["homem"]);
exibir(barco, origem, destino);

// SEGUNDA VIAGEM
console.log("SEGUNDA VIAGEM");
console.log("5 - O homem pega o lobo e viaja com ele de barco");

origem = sai(origem, ["homem", "lobo"]);
barco = entra(barco, ["homem", "lobo"]);
exibir(barco, origem, destino);

console.log("6 - Chegam ao destino o homem e o lobo");

barco = sai(barco, ["homem", "lobo"]);
destino = entra(destino, ["homem", "lobo"]);
exibir(barco, origem, destino);

console.log("7 - O homem pega a cabra de volta, deixando o lobo");

destino = sai(destino, ["cabra", "homem"]);
barco = entra(barco, ["cabra", "homem"]);
exibir(barco, origem, destino);

console.log("8 - homem retorna junto com a cabra para a origem");

barco = sai(barco, ["cabra", "homem"]);
origem = entra(origem, ["cabra", "homem"]);
exibir(barco, origem, destino);

// TERCEIRA VIAGEM
console.log("TERCEIRA VIAGEM");
console.log("9 - O homem pega a alfafa, deixando a cabra");

origem = sai(origem, ["alfafa", "homem"]);
barco = entra(barco, ["alfafa", "homem"]);
exibir(barco, origem, destino);

console.log("10 - Chegam ao destino o homem e a alfafa");

barco = sai(barco, ["alfafa", "homem"]);
destino = entra(destino, ["alfafa", "homem"]);
exibir(barco, origem, destino);

console.log("11 - O homem retorna sozinho para a origem");

destino = sai(destino, ["homem"]);
barco = entra(barco, ["homem"]);
exibir(barco, origem, destino);

console.log("12 - O homem chega à origem");

barco = sai(barco, ["homem"]);
origem = entra(origem, ["homem"]);
exibir(barco, origem, destino);

// QUARTA VIAGEM
console.log("QUARTA VIAGEM");
console.log("13 - Entram no barco o homem e a cabra");

origem = sai(origem, ["cabra", "homem"]);
barco = entra(barco, ["cabra", "homem"]);
exibir(barco, origem, destino);

console.log(
  "14 - O homem chega ao destino junto com a cabra, deixando juntos os três no destino"
);

barco = sai(barco, ["cabra", "homem"]);
destino = entra(destino, ["cabra", "homem"]);
exibir(barco, origem, destino);

console.log("Fim!");

function exibir(barcoArray, origemArray, destinoArray) {
  console.log("");
  console.log("Barco: " + barcoArray);
  console.log("Origem: " + origemArray);
  console.log("Destino: " + destinoArray);
  console.log("");
}

function entra(local, objeto) {
  return Array.from(local).concat(objeto);
}

function sai(local, objeto) {
  return Array.from(local).filter((item) => {
    return !objeto.includes(item);
  });
}
