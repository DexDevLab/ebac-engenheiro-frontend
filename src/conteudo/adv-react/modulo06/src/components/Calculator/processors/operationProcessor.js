import numberValidation from "../validators/numberValidation";

// FUNÇÃO QUE TRATA DAS OPERAÇÕES EM SI
function operationProcessor(num1, operation, num2, setOperationFn) {
  setOperationFn("");
  let result = 0;
  switch (operation) {
    case "+": {
      result = numberValidation(num1) + numberValidation(num2);
      break;
    }
    case "-": {
      result = numberValidation(num1) - numberValidation(num2);
      break;
    }
    case "*": {
      result = numberValidation(num1) * numberValidation(num2);
      break;
    }
    case "/": {
      result = numberValidation(num1) / numberValidation(num2);
      break;
    }
    default: {
      return result;
    }
  }
  if (
    result.toString().includes("Infinity") ||
    result.toString().includes("undefined") ||
    isNaN(result)
  ) {
    return "ERROR";
  } else {
    return result;
  }
}

export default operationProcessor;
