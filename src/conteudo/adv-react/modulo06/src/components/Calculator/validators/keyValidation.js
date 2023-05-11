// FUNÇÃO QUE TESTA SE UMA TECLA PRESSIONADA É VÁLIDA
function keyValidation(key, operation, memory) {
  const operators = ["+", "-", "*", "/", "=", "Del"];
  // TESTANDO SE É UMA OPERAÇÃO
  const test1 =
    Array.from(operators).filter((operator) => key.includes(operator)).length >
    0;

  // TESTANDO SE É UM NÚMERO
  const test2 = /[0-9]/.test(key);

  // TESTANDO SE É O PRIMEIRO PONTO DECIMAL
  const test3 =
    key.includes(".") &&
    ((memory.toString().split(".").length - 1 < 1 && operation === "") ||
      (memory.toString().split(".").length - 1 < 2 && operation !== ""));

  return test1 || test2 || test3;
}

export default keyValidation;
