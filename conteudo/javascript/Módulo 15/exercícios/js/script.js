let emptyFieldListener = function (event) {
  event.preventDefault();
  if (this.value == "") {
    document.querySelector(".mensagem").innerHTML =
      "Verifique o preenchimento dos campos em vermelho.";
    document.querySelector(".alert-box").classList.add("error");
    this.classList.add("error");
    this.parentNode.classList.add("error");
  } else {
    document.querySelector(".mensagem").innerHTML = "";
    document.querySelector(".alert-box").classList.remove("error");
    this.classList.remove("error");
    this.parentNode.classList.remove("error");
  }
};

let numericFieldListener = function (event) {
  event.preventDefault();
  let tel = this.value.match(/[()-]+/)
    ? this.value
        .replace("-", "")
        .replace("(", "")
        .replace(")", "")
        .replaceAll(" ", "")
    : this.value;

  if (tel.match(/\d{11}/)) {
    document.querySelector(".mensagem").innerHTML = "";
    document.querySelector(".alert-box").classList.remove("error");
    this.classList.remove("error");
    this.parentNode.classList.remove("error");
  } else {
    document.querySelector(".mensagem").innerHTML =
      "Verifique o número de telefone inserido.";
    document.querySelector(".alert-box").classList.add("error");
    this.classList.add("error");
    this.parentNode.classList.add("error");
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

document.getElementById("form1").addEventListener("submit", function (evt) {
  evt.preventDefault();
  evt.stopPropagation();

  let formData = new FormData(this);
  let invalidFields = [];
  let formOutput = [];

  for (let key of formData.keys()) {
    let value = formData.get(key);
    if (
      (key == "nome" && !value.match(/[\w]/)) ||
      (key == "email" && !value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
    ) {
      invalidFields.push(key);
    } else {
      if (key == "telefone") {
        let tel = value.match(/[()-]+/)
          ? value
              .replace("-", "")
              .replace("(", "")
              .replace(")", "")
              .replaceAll(" ", "")
          : value;
        if (!tel.match(/\d{11}/)) {
          invalidFields.push(key);
        } else {
          formOutput.push([key, tel]);
        }
      } else {
        formOutput.push([key, value]);
      }
    }
  }
  if (invalidFields.length === 0) {
    formOutput.forEach((item) => {
      let selector = "#" + item[0];
      document.querySelector(selector).value = item[1];
    });
    document.getElementById("form1").submit();
  } else {
    invalidFields.forEach((item) => {
      let selector = "#" + item;
      document.querySelector(selector).classList.add("error");
      document.querySelector(selector).parentNode.classList.add("error");
      document.querySelector(".mensagem").innerHTML =
        "Verifique o preenchimento dos campos em vermelho.";
      document.querySelector(".alert-box").classList.add("error");
    });
  }
});

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
