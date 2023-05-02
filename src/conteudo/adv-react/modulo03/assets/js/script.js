console.log("Script");

// DECLARAÇÃO DE VARIÁVEIS/SELETORES DOM HTML
const form = document.getElementById("form");
const loader = document.querySelector(".loader");
const button = document.querySelector(".pressed");
const outputContainer = document.querySelector(".container2");
const outputBox = document.querySelector(".container-box");
const allLabels = outputBox.getElementsByTagName("label");
const outputLabels = Array.from(allLabels).filter((label) => label.id);

// LISTENER DO FORMULÁRIO
form.addEventListener("submit", (event) => {
  event.preventDefault();
  toggleLoader();
  getData(form);
  toggleLoader();
});

// ATIVA OU DESATIVA O SPINNER/LOADER
function toggleLoader() {
  const loaderState = window.getComputedStyle(loader).display;
  if (loaderState == "none") {
    loader.style.display = "inline-block";
    button.value = "Aguarde...";
    button.disabled = true;
  } else {
    setTimeout(() => {
      loader.style.display = "none";
      button.value = "Enviar";
      button.disabled = false;
      outputContainer.style.display = "flex";
      window.alert("Formulário Enviado com sucesso!");
    }, 2000);
  }
}

// FUNÇÃO QUE COLETA OS DADOS DO FORMULÁRIO E PREENCHE O CONTAINER DE
// RESULTADOS
function getData(form) {
  // RECEBENDO DADOS DO FORMULÁRIO
  const formData = new FormData(form);

  // MANIPULANDO OS DADOS E PREENCHENDO O CONTAINER DE RESULTADOS,
  // COM EXCEÇÃO DOS CAMPOS DE GÊNERO E DO CHECKBOX
  Array.from(formData).forEach((item, idx) => {
    if (idx !== 1 || idx !== 6) {
      outputLabels[idx].innerHTML = item[1];
    }
  });

  // SANITIZANDO O VALOR DO FORMULÁRIO NO SELETOR DE GÊNERO
  switch (formData.get("genero")) {
    case "masc":
      labelValue = "Masculino";
      break;
    case "fem":
      labelValue = "Feminino";
      break;
    case "nonb":
      labelValue = "Não-Binário";
      break;
    case "nondec":
      labelValue = "Prefiro não declarar";
      break;
    default:
      labelValue = "Não informado";
      break;
  }
  outputLabels[1].innerHTML = labelValue;

  // SANITIZANDO O CAMPO DE CHECKBOX
  if (formData.get("notif")) {
    outputLabels[6].innerHTML = "Sim";
  } else {
    outputLabels[6].innerHTML = "Não";
  }
}
