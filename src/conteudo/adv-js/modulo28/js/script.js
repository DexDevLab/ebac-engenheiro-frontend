function calcularMedia(notas) {
  let soma = 0;
  for (c = 0; c < notas.length; c++) {
    soma += notas[c];
  }

  media = soma / notas.length;

  return media;
}

let media; // escopo global

function aprovacao(notas, apr) {
  let media = calcularMedia(notas); // escopo da função

  let condicao = media >= apr ? `<b id="approved">aprovado</b>. A média foi acima de <b>${apr}</b>.` : `<b id="reproved">reprovado</b>. A média foi ABAIXO de <b>${apr}</b>.`;

  return "Média:<b> " + media + "</b> - Resultado: " + condicao;
}

// Função Recursivas

function contagemRegressiva(numero) {
  console.log(numero);

  let proximoNumero = numero - 1;

  if (proximoNumero > 0) contagemRegressiva(proximoNumero);
}

// contagemRegressiva(50);

/*
 * Formulário envio de dados para cálculo da média
 */
const formulario1 = document.getElementById("formulario-01");

if (formulario1)
  formulario1.addEventListener("submit", function (evento) {
    evento.preventDefault();
    evento.stopPropagation();

    let dados = new FormData(this);

    let notas = [];
    let apr = 0;

    for (let key of dados.keys()) {
      if (key.match("na")) {
        apr = Number(dados.get(key));
      } else {
        let numero = dados.get(key).match(/\d*/) ? Number(dados.get(key)) : 0; // é um número
        if (!isNaN(numero)) {
          notas.push(numero);
        }
      }
    }

    // console.log("DADOS: " + [...dados]);

    console.log(notas + " / " + apr);

    texto = aprovacao(notas, apr);

    document.getElementById("resultado").innerHTML = texto;
  });

function validaCampo(elemento) {
  elemento.addEventListener("focusout", function (event) {
    event.preventDefault();

    if (this.value == "") {
      document.querySelector(".mensagem").innerHTML =
        "verifique o preenchimento dos campos em vermelho";
      this.classList.add("erro");
      this.parentNode.classList.add("erro");
      return false;
    } else {
      document.querySelector(".mensagem").innerHTML = "";
      this.classList.remove("erro");
      this.parentNode.classList.remove("erro");
    }
  });
}

function validaCampoNumerico(elemento) {
  elemento.addEventListener("focusout", function (event) {
    event.preventDefault();

    let numero = this.value.match(/^[\d]5-[\d]3/)
      ? this.value.replace(/-/, "")
      : this.value;

    if (numero != "" && numero.match(/[0-9]*/) && numero >= 0 && numero <= 10) {
      document.querySelector(".mensagem").innerHTML = "";
      this.classList.remove("erro");
      this.parentNode.classList.remove("erro");
    } else {
      document.querySelector(".mensagem").innerHTML =
        "verifique o preenchimento dos campos em destaque";
      this.classList.add("erro");
      this.parentNode.classList.add("erro");
      return false;
    }
  });
}

function validaEmail(elemento) {
  elemento.addEventListener("focusout", function (event) {
    event.preventDefault();

    const emailValido = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?/i;
    if (this.value.match(emailValido)) {
      document.querySelector(".mensagem").innerHTML = "";
      this.classList.remove("erro");
      this.parentNode.classList.remove("erro");
    } else {
      document.querySelector(".mensagem").innerHTML =
        "verifique o preenchimento dos campos em destaque";
      this.classList.add("erro");
      this.parentNode.classList.add("erro");
      return false;
    }
  });
}

let camposObrigatorios = document.querySelectorAll("input.obrigatorio");
let camposNumericos = document.querySelectorAll("input.numero");
let camposEmail = document.querySelectorAll("input.email");

for (let emFoco of camposObrigatorios) {
  validaCampo(emFoco);
}

for (let emFoco of camposNumericos) {
  validaCampoNumerico(emFoco);
}

for (let emFoco of camposEmail) {
  validaEmail(emFoco);
}
