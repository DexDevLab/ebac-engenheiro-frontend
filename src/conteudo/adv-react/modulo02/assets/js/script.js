console.log("Script");

// DECLARAÇÃO DE VARIÁVEIS/SELETORES DOM HTML
const resultField = document.querySelector(".result");
const inputs = document.querySelectorAll("input[type=button]");

// A 'MEMÓRIA' DA CALCULADORA
let memory = "";

let operation = "";
const operators = ["+", "-", "*", "/", "=", "Del"];

// CRIA RECURSIVAMENTE LISTENERS DE CLICK PARA CADA BOTÃO
inputs.forEach((element) => {
  element.addEventListener("click", (event) => {
    const evt = new KeyboardEvent("keydown", {
      bubbles: true,
      key: event.target.value,
    });
    document.dispatchEvent(evt);
  });
});

// SIMULA A ANIMAÇÃO DE 'PRESS' DO BOTÃO, MESMO SE NÃO FOR CLICADO DIRETAMENTE
function toggleButton(el) {
  el.classList.remove("active");
}

// LISTENER GLOBAL DE PRESSIONAMENTO DE TECLA
document.addEventListener("keydown", async (event) => {
  // console.log("MEMORY: " + memory);
  // console.log("RESULTFIELD: " + resultField.value);
  // console.log("OPERATION: " + operation);
  resultField.classList.remove("red");
  let key = event.key.toString();
  key = key
    .toString()
    .replaceAll(",", ".")
    .replaceAll("x", "*")
    .replaceAll("X", "*")
    .replaceAll("Delete", "Del")
    .replaceAll("Enter", "=");
  if (pressedKeyIsValid(key)) {
    // PRESSIONA O BOTÃO QUANDO UM NÚMERO É DIGITADO NO TECLADO
    inputs.forEach((element) => {
      if (element.value.includes(key)) {
        element.classList.add("active");
        setTimeout(toggleButton, 100, element);
      }
    });
    memory = processInput(memory, key);
  }
});

resultField.addEventListener("keydown", (event) => {
  event.preventDefault();
});

// FUNÇÃO QUE TESTA SE UMA TECLA PRESSIONADA É VÁLIDA
function pressedKeyIsValid(key) {
  // TESTANDO SE É UMA OPERAÇÃO
  const test1 =
    Array.from(operators).filter((operator) => key.includes(operator)).length >
    0;

  // TESTANDO SE É UM NÚMERO
  const test2 = /[0-9]/.test(key);

  // TESTANDO SE É O PRIMEIRO PONTO DECIMAL
  const test3 =
    key.includes(".") &&
    ((memory.split(".").length - 1 < 1 && operation === "") ||
      (memory.split(".").length - 1 < 2 && operation !== ""));

  return test1 || test2 || test3;
}

// SANITIZA O NÚMER0 PARA SER PROCESSADO ADEQUADAMENTE PELO JAVASCRIPT
function sanitizeNumber(num) {
  if (
    num.toString().length === 0 ||
    (num.toString().includes("0") && num.toString().length === 1) ||
    (num.toString().includes(".") && num.toString().length === 1)
  ) {
    return 0;
  }
  if (num.toString().includes(".")) {
    return parseFloat(num);
  } else {
    return parseInt(num);
  }
}

// PROCESSA A ENTRADA, CONSIDERANDO OS VALORES EM MEMÓRIA E AS OPERAÇÕES EM FILA
function processInput(mem, key) {
  switch (key) {
    case "Del": {
      resultField.value = "";
      return "";
    }
    case "=": {
      return calcEquals();
    }
    case "+": {
      if (operation === "") {
        operation = "+";
        resultField.value = resultField.value + key;
        return `${mem}${key}`;
      } else {
        // SE UMA NOVA OPERAÇÃO EM SEQUÊNCIA FOR FEITA, CALCULA AUTOMATICAMENTE
        // OS VALORES NA MEMÓRIA PARA PERMITIR UMA NOVA SOMA.
        // A MESMA LÓGICA É APLICADA NAS DEMAIS OPERAÇÕES.
        return calcEquals("+");
      }
    }
    case "-": {
      if (operation === "") {
        operation = "-";
        resultField.value = resultField.value + key;
        return `${mem}${key}`;
      } else {
        return calcEquals("-");
      }
    }
    case "*": {
      if (operation === "") {
        operation = "*";
        resultField.value = resultField.value + key;
        return `${mem}${key}`;
      } else {
        return calcEquals("*");
      }
    }
    case "/": {
      if (operation === "") {
        operation = "/";
        resultField.value = resultField.value + key;
        return `${mem}${key}`;
      } else {
        return calcEquals("/");
      }
    }
    default: {
      resultField.value = resultField.value + key;
      return `${mem}${key}`;
    }
  }
}

// FUNÇÃO QUE RETORNA O RESULTADO, CONSIDERANDO OS NÚMEROS NA MEMÓRIA E A OPERAÇÃO
function performOperation(num1, operation, num2) {
  switch (operation) {
    case "+": {
      return calcSum(num1, num2);
    }
    case "-": {
      return calcSubtract(num1, num2);
    }
    case "*": {
      return calcMultiply(num1, num2);
    }
    case "/": {
      return calcDivide(num1, num2);
    }
    default: {
      return "";
    }
  }
}

// FUNÇÃO DE '='. É EXECUTADA TAMBÉM, CASO UMA OPERAÇÃO PENDENTE ESTEJA NA MEMÓRIA
function calcEquals(opr) {
  if (operation.length === 1) {
    const memoryArr = memory.split(operation);
    if (opr) {
      // CASO EXISTA UMA NOVA OPERAÇÃO A SE FAZER, COM UMA ANTERIOR NA
      // MEMÓRIA, REALIZA A OPERAÇÃO, ATUALIZA A MEMÓRIA, E RECORRE À
      // FUNÇÃO processInput() PARA REALIZAR A NOVA OPERAÇÃO
      if (/[0-9]/.test(memoryArr[1])) {
        memory = performOperation(memoryArr[0], operation, memoryArr[1]);
      } else {
        memory = memoryArr[0];
        operation = "";
        resultField.value = memory;
      }
      return processInput(memory, opr);
    } else {
      return performOperation(memoryArr[0], operation, memoryArr[1]);
    }
  } else {
    return memory;
  }
}

// FUNÇÃO DE '+'
function calcSum(num1, num2) {
  operation = "";
  const result = sanitizeNumber(num1) + sanitizeNumber(num2);
  if (
    result.toString().includes("Infinity") ||
    result.toString().includes("undefined")
  ) {
    resultField.classList.add("red");
    resultField.value = "ERROR";
  } else {
    resultField.value = result;
  }
  return result;
}

// FUNÇÃO DE '-'
function calcSubtract(num1, num2) {
  operation = "";
  const result = sanitizeNumber(num1) - sanitizeNumber(num2);
  if (
    result.toString().includes("Infinity") ||
    result.toString().includes("undefined")
  ) {
    resultField.classList.add("red");
    resultField.value = "ERROR";
  } else {
    resultField.value = result;
  }
  return result;
}

// FUNÇÃO DE '*'
function calcMultiply(num1, num2) {
  operation = "";
  resultField.value = "";
  const result = sanitizeNumber(num1) * sanitizeNumber(num2);
  if (
    result.toString().includes("Infinity") ||
    result.toString().includes("undefined")
  ) {
    resultField.classList.add("red");
    resultField.value = "ERROR";
  } else {
    resultField.value = result;
  }
  return result;
}

// FUNÇÃO DE '/'
function calcDivide(num1, num2) {
  operation = "";
  const result = sanitizeNumber(num1) / sanitizeNumber(num2);
  if (
    result.toString().includes("Infinity") ||
    result.toString().includes("undefined")
  ) {
    resultField.classList.add("red");
    resultField.value = "ERROR";
  } else {
    resultField.value = result;
  }
  return result;
}
