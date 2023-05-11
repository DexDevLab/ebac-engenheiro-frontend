import memoryProcessor from "./memoryProcessor";
import operationProcessor from "./operationProcessor";

function calculationProcessor(
  opr,
  memory,
  operation,
  setOperationFn,
  setTextFieldFn,
  setCalcErrorFn
) {
  let result = memory;
  if (operation.length === 1) {
    const memoryArr = memory.toString().split("");
    // IMPEDE A ADIÇÃO DE UM SINAL DE OPERAÇÃO APÓS O OUTRO
    if (opr.length === 0 && !/[0-9]/.test(memoryArr[memoryArr.length - 1])) {
      memoryArr.pop();
      result = memoryArr.join("") + opr;
    }
    const memResult = memoryProcessor(memoryArr);
    if (memResult[1].length === 0) {
      result = memResult[0] - 0 + (opr || "");
    } else if (memResult[2].length > 0) {
      result =
        operationProcessor(
          memResult[0],
          memResult[2],
          memResult[1],
          setOperationFn
        ) + (opr || "");
    }
  }
  setOperationFn(opr || "");
  if (result.toString().includes("ERROR")) {
    setTextFieldFn("ERROR");
    setCalcErrorFn(true);
    result = 0;
  } else {
    setTextFieldFn(result);
  }
  return result;
}

export default calculationProcessor;
