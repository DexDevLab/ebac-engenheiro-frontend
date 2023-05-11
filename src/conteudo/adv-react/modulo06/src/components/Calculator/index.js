import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import SVBox from "../Styled/SVBox";
import CalcBtnModule from "./CalcBtnModule";
import clickSimulator from "./handlers/clickSimulator";
import inputProcessor from "./processors/inputProcessor";
import keyValidation from "./validators/keyValidation";

function Calculator({ ...props }) {
  const [memory, setMemory] = useState("0");
  const [operation, setOperation] = useState("");
  const [pressedKey, setPressedKey] = useState("");
  const [textFieldValue, setTextFieldValue] = useState("0");
  const [calcError, setCalcError] = useState(false);

  // CONSTRÓI A FUNÇÃO PARA PROCESSAR ENTRADAS NA CALCULADORA
  const inputProcessFn = (input) => {
    setMemory(
      inputProcessor(
        memory,
        input,
        operation,
        setOperation,
        textFieldValue,
        setTextFieldValue,
        setCalcError
      )
    );
  };

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
    if (keyValidation(key, operation, memory)) {
      clickSimulator(setPressedKey, key);
      inputProcessFn(key);
    }
  };

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
        <CalcBtnModule inputProcessFn={inputProcessFn} activeKey={pressedKey} />
      </SVBox>
    </SVBox>
  );
}

export default Calculator;
