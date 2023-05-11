import calculationProcessor from "./calculationProcessor";

// FUNÇÃO QUE PROCESSA A ENTRADA NA CALCULADORA
function inputProcessor(
  memory,
  input,
  operation,
  setOperationFn,
  textFieldValue,
  setTextFieldFn,
  setCalcErrorFn
) {
  let result = memory;

  // REMOVE TELA DE ERRO DA CALCULADORA
  if (textFieldValue.toString().includes("ERROR")) {
    setOperationFn("");
    setTextFieldFn(input);
    setCalcErrorFn(false);
  }

  switch (input) {
    case "Del": {
      setOperationFn("");
      setTextFieldFn("0");
      return "0";
    }
    case "=": {
      return calculationProcessor(
        "",
        memory,
        operation,
        setOperationFn,
        setTextFieldFn,
        setCalcErrorFn
      );
    }
    case "+": {
      if (operation === "") {
        setOperationFn("+");
        // QUANDO A memoryÓRIA ESTÁ VAZIA, IMPEDE
        // DE PROCESSAR O VALOR '0' CONTIDO NA
        // TELA DA CALCULADORA COMO PADRÃO. ESTE
        // COMPORTAMENTO TAMBÉM SE APLICA NAS
        // DEMAIS OPERAÇÕES.
        if (result === "") {
          setTextFieldFn(input);
        } else {
          setTextFieldFn(textFieldValue + input);
        }
        return `${result}${input}`;
      } else {
        // SE UMA NOVA OPERAÇÃO EM SEQUÊNCIA FOR FEITA, CALCULA AUTOMATICAMENTE
        // OS VALORES NA memoryÓRIA PARA PERMITIR UMA NOVA SOMA.
        // A MESMA LÓGICA É APLICADA NAS DEMAIS OPERAÇÕES.
        return calculationProcessor(
          input,
          memory,
          operation,
          setOperationFn,
          setTextFieldFn,
          setCalcErrorFn
        );
      }
    }
    case "-": {
      if (operation === "") {
        setOperationFn("-");
        if (result === "") {
          setTextFieldFn(input);
        } else {
          setTextFieldFn(textFieldValue + input);
        }
        return `${result}${input}`;
      } else {
        return calculationProcessor(
          input,
          memory,
          operation,
          setOperationFn,
          setTextFieldFn,
          setCalcErrorFn
        );
      }
    }
    case "*": {
      if (operation === "") {
        setOperationFn("*");
        if (result === "") {
          setTextFieldFn(input);
        } else {
          setTextFieldFn(textFieldValue + input);
        }
        return `${result}${input}`;
      } else {
        return calculationProcessor(
          input,
          memory,
          operation,
          setOperationFn,
          setTextFieldFn,
          setCalcErrorFn
        );
      }
    }
    case "/": {
      if (operation === "") {
        setOperationFn("/");
        if (result === "") {
          setTextFieldFn(input);
        } else {
          setTextFieldFn(textFieldValue + input);
        }
        return `${result}${input}`;
      } else {
        return calculationProcessor(
          input,
          memory,
          operation,
          setOperationFn,
          setTextFieldFn,
          setCalcErrorFn
        );
      }
    }
    case ".": {
      setTextFieldFn(memory + input);
      return `${result}${input}`;
    }
    default: {
      // IMPEDE DE COMPUTAR ZERO À ESQUERDA
      if (Number(memory) === 0 && !memory.toString().includes(".")) {
        setTextFieldFn(input);
        return `${input}`;
      } else {
        setTextFieldFn(textFieldValue + input);
      }
      return `${result}${input}`;
    }
  }
}

export default inputProcessor;
