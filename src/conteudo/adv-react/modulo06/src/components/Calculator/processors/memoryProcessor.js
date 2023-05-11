// PROCESSA A SEQUÊNCIA NUMÉRICA DE ENTRADAS NA MEMÓRIA,
// ORGANIZA EM POSIÇÕES NUMÉRICAS E OPERADORES A FIM DE
// PREPARAR O PROCESSAMENTO NUMÉRICO
function memoryProcessor(memoryArray) {
  let num1 = "";
  let num2 = "";
  let internalOperator = "";
  memoryArray.forEach((memPos, idx) => {
    // IMPEDE QUE O PRIMEIRO SINAL DO PRIMEIRO NÚMERO SEJA COLOCADO EM OUTRO LUGAR
    if (idx === 0) {
      num1 = num1 + memPos;
    } else {
      if (/[0-9]/.test(memPos) || memPos.includes(".")) {
        if (internalOperator.length > 0) {
          num2 = num2 + memPos;
        } else {
          num1 = num1 + memPos;
        }
      } else {
        internalOperator = memPos;
      }
    }
  });
  return [num1, num2, internalOperator];
}

export default memoryProcessor;
