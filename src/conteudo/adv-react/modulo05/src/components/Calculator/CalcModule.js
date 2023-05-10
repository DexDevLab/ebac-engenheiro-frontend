import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import SHBox from "../Styled/SHBox";
import SVBox from "../Styled/SVBox";
import CalcBtn from "./CalcBtn";

function CalcModule({ ...props }) {
  const [memory, setMemory] = useState("0");
  const [operation, setOperation] = useState("");
  const [pressedKey, setPressedKey] = useState("");
  const [textFieldValue, setTextFieldValue] = useState("0");
  const [calcError, setCalcError] = useState(false);
  const operators = ["+", "-", "*", "/", "=", "Del"];

  // FUNÇÃO QUE TESTA SE UMA TECLA PRESSIONADA É VÁLIDA
  function pressedKeyIsValid(key) {
    // TESTANDO SE É UMA OPERAÇÃO
    const test1 =
      Array.from(operators).filter((operator) => key.includes(operator))
        .length > 0;

    // TESTANDO SE É UM NÚMERO
    const test2 = /[0-9]/.test(key);

    // TESTANDO SE É O PRIMEIRO PONTO DECIMAL
    const test3 =
      key.includes(".") &&
      ((memory.toString().split(".").length - 1 < 1 && operation === "") ||
        (memory.toString().split(".").length - 1 < 2 && operation !== ""));

    const test = test1 || test2 || test3;
    return test;
  }

  // SANITIZA O NÚMER0 PARA SER PROCESSADO ADEQUADAMENTE
  function sanitizeNumber(num) {
    if (
      num.toString().length === 0 ||
      (num.toString().includes("0") && num.toString().length === 1) ||
      (num.toString().includes(".") && num.toString().length === 1)
    ) {
      return 0;
    }
    if (num.toString().includes(".")) {
      return parseFloat(num - 0);
    } else {
      return parseInt(num - 0);
    }
  }

  // SIMULA O CLIQUE DO MOUSE
  function simulateClick(key) {
    setPressedKey(key);
    setTimeout(() => setPressedKey(""), 150);
  }

  // HANDLER DO INPUT DE TECLA
  const calcHandler = (event) => {
    event.preventDefault();
    let key = event.key.toString();
    key = key
      .toString()
      .replaceAll(",", ".")
      .replaceAll("x", "*")
      .replaceAll("X", "*")
      .replaceAll("Delete", "Del")
      .replaceAll("Enter", "=");
    if (pressedKeyIsValid(key)) {
      simulateClick(key);
      setMemory(processInput(memory, key));
    }
  };

  // FUNÇÃO QUE PROCESSA A ENTRADA NA CALCULADORA
  function processInput(mem, input) {
    let result = mem;

    // REMOVE TELA DE ERRO DA CALCULADORA
    if (textFieldValue.toString().includes("ERROR")) {
      setOperation("");
      setTextFieldValue(input);
      setCalcError(false);
    }

    switch (input) {
      case "Del": {
        setOperation("");
        setTextFieldValue("0");
        return "0";
      }
      case "=": {
        return calcEquals();
      }
      case "+": {
        if (operation === "") {
          setOperation("+");
          // QUANDO A MEMÓRIA ESTÁ VAZIA, IMPEDE
          // DE PROCESSAR O VALOR '0' CONTIDO NA
          // TELA DA CALCULADORA COMO PADRÃO. ESTE
          // COMPORTAMENTO TAMBÉM SE APLICA NAS
          // DEMAIS OPERAÇÕES.
          if (result === "") {
            setTextFieldValue(input);
          } else {
            setTextFieldValue(textFieldValue + input);
          }
          return `${result}${input}`;
        } else {
          // SE UMA NOVA OPERAÇÃO EM SEQUÊNCIA FOR FEITA, CALCULA AUTOMATICAMENTE
          // OS VALORES NA MEMÓRIA PARA PERMITIR UMA NOVA SOMA.
          // A MESMA LÓGICA É APLICADA NAS DEMAIS OPERAÇÕES.
          return calcEquals("+");
        }
      }
      case "-": {
        if (operation === "") {
          setOperation("-");
          if (result === "") {
            setTextFieldValue(input);
          } else {
            setTextFieldValue(textFieldValue + input);
          }
          return `${result}${input}`;
        } else {
          return calcEquals("-");
        }
      }
      case "*": {
        if (operation === "") {
          setOperation("*");
          if (result === "") {
            setTextFieldValue(input);
          } else {
            setTextFieldValue(textFieldValue + input);
          }
          return `${result}${input}`;
        } else {
          return calcEquals("*");
        }
      }
      case "/": {
        if (operation === "") {
          setOperation("/");
          if (result === "") {
            setTextFieldValue(input);
          } else {
            setTextFieldValue(textFieldValue + input);
          }
          return `${result}${input}`;
        } else {
          return calcEquals("/");
        }
      }
      case ".": {
        setTextFieldValue(mem + input);
        return `${result}${input}`;
      }
      default: {
        // IMPEDE DE COMPUTAR ZERO À ESQUERDA
        if (Number(mem) === 0 && !mem.toString().includes(".")) {
          setTextFieldValue(input);
          return `${input}`;
        } else {
          setTextFieldValue(textFieldValue + input);
        }
        return `${result}${input}`;
      }
    }
  }

  // FUNÇÃO QUE TRATA DAS OPERAÇÕES EM SI
  function processOperation(num1, operation, num2) {
    setOperation("");
    let result = 0;
    switch (operation) {
      case "+": {
        result = sanitizeNumber(num1) + sanitizeNumber(num2);
        break;
      }
      case "-": {
        result = sanitizeNumber(num1) - sanitizeNumber(num2);
        break;
      }
      case "*": {
        result = sanitizeNumber(num1) * sanitizeNumber(num2);
        break;
      }
      case "/": {
        result = sanitizeNumber(num1) / sanitizeNumber(num2);
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

  // PROCESSA A SEQUÊNCIA NUMÉRICA DE ENTRADAS NA MEMÓRIA,
  // ORGANIZA EM POSIÇÕES NUMÉRICAS E OPERADORES A FIM DE
  // PREPARAR O PROCESSAMENTO NUMÉRICO
  function processMemory(memArr) {
    let num1 = "";
    let num2 = "";
    let internalOperator = "";
    memArr.forEach((memPos, idx) => {
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

  // FUNÇÃO DE '='. TRATA TAMBÉM DE OPERAÇÕES EM FILA E PROCESSA RESULTADOS.
  function calcEquals(opr) {
    let result = memory;
    if (operation.length === 1) {
      const memoryArr = memory.toString().split("");
      // IMPEDE A ADIÇÃO DE UM SINAL DE OPERAÇÃO APÓS O OUTRO
      if (opr && !/[0-9]/.test(memoryArr[memoryArr.length - 1])) {
        memoryArr.pop();
        result = memoryArr.join("") + opr;
      }
      const memResult = processMemory(memoryArr);
      if (memResult[1].length === 0) {
        result = memResult[0] - 0 + (opr || "");
      } else if (memResult[2].length > 0) {
        result =
          processOperation(memResult[0], memResult[2], memResult[1]) +
          (opr || "");
      }
    }
    setOperation(opr || "");
    if (result.toString().includes("ERROR")) {
      setTextFieldValue("ERROR");
      setCalcError(true);
      result = 0;
    } else {
      setTextFieldValue(result);
    }
    return result;
  }

  useEffect(() => {
    // LISTENER GLOBAL DE PRESSIONAMENTO DE TECLA
    // USADO KEYUP PARA PREVENIR FLOODING DE TECLA
    document.addEventListener("keyup", calcHandler);
    // DEVE SER FEITA A REMOÇÃO DO EVENT LISTENER PARA IMPEDIR LOOP
    return () => document.removeEventListener("keyup", calcHandler);
  });

  return (
    <SVBox marginTop={"150px"}>
      <SVBox
        padding={"5px"}
        border={"1px solid black"}
        justify={"center"}
        h={7.2}
        sx={{ backgroundColor: "gray" }}
      >
        <Box
          border={"1px solid black"}
          display={"flex"}
          width={"100%"}
          marginTop={"7px"}
          sx={{
            backgroundColor: "white",
          }}
        >
          <TextField
            InputProps={{
              sx: {
                "& input": {
                  textAlign: "right",
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "22px",
                  backgroundColor: calcError ? "red" : "white",
                },
              },
            }}
            sx={{
              "& .MuiInputBase-input.Mui-disabled": {
                WebkitTextFillColor: "#000000",
              },
            }}
            fullWidth
            id="calc-input"
            value={textFieldValue}
            disabled
          />
        </Box>

        <SHBox>
          <CalcBtn
            activeKey={pressedKey}
            h={"50px"}
            label={"7"}
            onClick={() => {
              setMemory(processInput(memory, "7"));
            }}
          ></CalcBtn>
          <CalcBtn
            activeKey={pressedKey}
            h={"50px"}
            label={"8"}
            onClick={() => {
              setMemory(processInput(memory, "8"));
            }}
          ></CalcBtn>
          <CalcBtn
            activeKey={pressedKey}
            h={"50px"}
            label={"9"}
            onClick={() => {
              setMemory(processInput(memory, "9"));
            }}
          ></CalcBtn>
          <CalcBtn
            activeKey={pressedKey}
            h={"50px"}
            label={"/"}
            onClick={() => {
              setMemory(processInput(memory, "/"));
            }}
          ></CalcBtn>
        </SHBox>
        <SHBox>
          <CalcBtn
            activeKey={pressedKey}
            h={"50px"}
            label={"4"}
            onClick={() => {
              setMemory(processInput(memory, "4"));
            }}
          ></CalcBtn>
          <CalcBtn
            activeKey={pressedKey}
            h={"50px"}
            label={"5"}
            onClick={() => {
              setMemory(processInput(memory, "5"));
            }}
          ></CalcBtn>
          <CalcBtn
            activeKey={pressedKey}
            h={"50px"}
            label={"6"}
            onClick={() => {
              setMemory(processInput(memory, "6"));
            }}
          ></CalcBtn>
          <CalcBtn
            activeKey={pressedKey}
            h={"50px"}
            label={"X"}
            onClick={() => {
              setMemory(processInput(memory, "*"));
            }}
          ></CalcBtn>
        </SHBox>
        <SHBox>
          <CalcBtn
            activeKey={pressedKey}
            h={"50px"}
            label={"1"}
            onClick={() => {
              setMemory(processInput(memory, "1"));
            }}
          ></CalcBtn>
          <CalcBtn
            activeKey={pressedKey}
            h={"50px"}
            label={"2"}
            onClick={() => {
              setMemory(processInput(memory, "2"));
            }}
          ></CalcBtn>
          <CalcBtn
            activeKey={pressedKey}
            h={"50px"}
            label={"3"}
            onClick={() => {
              setMemory(processInput(memory, "3"));
            }}
          ></CalcBtn>
          <CalcBtn
            activeKey={pressedKey}
            h={"50px"}
            label={"-"}
            onClick={() => {
              setMemory(processInput(memory, "-"));
            }}
          ></CalcBtn>
        </SHBox>
        <SHBox>
          <SVBox h={1.8} marginBottom={"5px"} justify={"start"}>
            <SHBox justify={"start"}>
              <CalcBtn
                activeKey={pressedKey}
                h={"50px"}
                w={"148px"}
                label={"0"}
                onClick={() => {
                  setMemory(processInput(memory, "0"));
                }}
              ></CalcBtn>
              <CalcBtn
                activeKey={pressedKey}
                h={"50px"}
                label={"."}
                onClick={() => {
                  setMemory(processInput(memory, "."));
                }}
              ></CalcBtn>
            </SHBox>
            <SHBox justify={"start"}>
              <CalcBtn
                activeKey={pressedKey}
                onClick={() => {
                  setMemory(processInput(memory, "Del"));
                }}
                h={"50px"}
                color={"error"}
                label={"Del"}
              ></CalcBtn>
              <CalcBtn
                activeKey={pressedKey}
                h={"50px"}
                color={"success"}
                w={"148px"}
                label={"="}
                onClick={() => {
                  setMemory(processInput(memory, "="));
                }}
              ></CalcBtn>
            </SHBox>
          </SVBox>
          <CalcBtn
            activeKey={pressedKey}
            h={"109px"}
            label={"+"}
            onClick={() => {
              setMemory(processInput(memory, "+"));
            }}
          ></CalcBtn>
        </SHBox>
      </SVBox>
    </SVBox>
  );
}

export default CalcModule;
