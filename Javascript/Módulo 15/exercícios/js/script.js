let emptyFieldListener = function (event) {
  event.preventDefault();
  if (this.value == "") {
    document.querySelector(".mensagem").innerHTML =
      "Verifique o preenchimento dos campos em vermelho.";
    document.querySelector(".alert-box").classList.add("error");
    this.classList.add("error");
    this.parentNode.classList.add("error");
    return false;
  } else {
    document.querySelector(".mensagem").innerHTML = "";
    document.querySelector(".alert-box").classList.remove("error");
    this.classList.remove("error");
    this.parentNode.classList.remove("error");
  }
};

let numericFieldListener = function (event) {
  event.preventDefault();
  let numero = this.value.match(/^[\d]5-[\d]3/)
    ? this.value.replace(/-/, "")
    : this.value;

  if (numero != "" && numero.match(/[0-9]*/)) {
    document.querySelector(".mensagem").innerHTML = "";
    document.querySelector(".alert-box").classList.remove("error");
    this.classList.remove("error");
    this.parentNode.classList.remove("error");
  } else {
    document.querySelector(".mensagem").innerHTML =
      "Verifique o preenchimento numérico correto.";
    document.querySelector(".alert-box").classList.add("error");
    this.classList.add("error");
    this.parentNode.classList.add("error");
    return false;
  }
};

let emailFieldListener = function (event) {
  event.preventDefault();
  const emailValido = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (this.value.match(emailValido)) {
    document.querySelector(".mensagem").innerHTML = "";
    document.querySelector(".alert-box").classList.remove("error");
    this.classList.remove("error");
    this.parentNode.classList.remove("error");
  } else {
    document.querySelector(".mensagem").innerHTML =
      "Verifique o preenchimento correto do email.";
    document.querySelector(".alert-box").classList.add("error");
    this.classList.add("error");
    this.parentNode.classList.add("error");
    return false;
  }
};

function validateNumericField(field) {
  field.addEventListener("focusout", numericFieldListener);
  field.addEventListener("focusin", numericFieldListener);
}

function validateEmailField(field) {
  field.addEventListener("focusout", emailFieldListener);
  field.addEventListener("focusin", emailFieldListener);
}

function validateEmptyField(field) {
  field.addEventListener("focusout", emptyFieldListener);
  field.addEventListener("focusin", emptyFieldListener);
}

function enviar() {
  const elements = document.querySelectorAll("input");
  for (let obj of elements) {
    if (
      obj.classList.contains("error") ||
      (obj.classList.contains("obrigatorio") && obj.value == "") ||
      (obj.classList.contains("telefone") && obj.value == "") ||
      (obj.classList.contains("email") && obj.value == "")
    ) {
      document.querySelector(".mensagem").innerHTML =
        "Verifique o preenchimento dos campos em vermelho.";
      document.querySelector(".alert-box").classList.add("error");
      obj.classList.add("error");
      obj.parentNode.classList.add("error");
    }
  }
}

let camposObrigatorios = document.querySelectorAll("input.obrigatorio");
let camposNumericos = document.querySelectorAll("input.telefone");
let camposEmail = document.querySelectorAll("input.email");

for (let emFoco of camposObrigatorios) {
  validateEmptyField(emFoco);
}

for (let emFoco of camposNumericos) {
  validateNumericField(emFoco);
}

for (let emFoco of camposEmail) {
  validateEmailField(emFoco);
}
