import { useEffect, useState } from "react";
import ButtonComponent from "./Button/ButtonComponent";
import SHBox from "./Styled/SHBox";
import { SHeader, SLoginInputGroup, SP1 } from "./Styled/Style";

function IMCCalculator({ username, ...props }) {
  const [isActive, setIsActive] = useState(false);
  const [show, setShow] = useState(false);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [primaryLabel, setPrimaryLabel] = useState("");
  const [secondaryLabel, setSecondaryLabel] = useState("");
  const [labelColor, setLabelColor] = useState("normal");

  useEffect(() =>{
    if(username.toString().length > 1 ){
      setShow(false);
      setPrimaryLabel("");
      setSecondaryLabel("");
    }
  },[username])

  function buttonClick() {
    setIsActive(true);
    setTimeout(setIsActive, 150, false);
    setShow(true);
    calcIMC(weight, height);
  }

  function resetWeight(val) {
    setShow(false);
    setWeight(val);
  }

  function resetHeight(val) {
    setShow(false);
    setHeight(val);
  }

  function calcIMC(inputWeight, inputHeight) {
    console.log(
      "Calculando IMC - Altura: " + inputHeight + " Peso: " + inputWeight
    );
    const parsedWeight = parseFloat(inputWeight.toString().replace(",", "."));
    const parsedHeight = parseFloat(inputHeight.toString().replace(",", "."));
    if (parsedHeight < 1 || parsedWeight < 1) {
      setPrimaryLabel(`ERRO`);
      setLabelColor("danger");
      setSecondaryLabel(
        "Houve um erro ao calcular o IMC. Por favor, reveja os valores inseridos e tente novamente."
      );
    } else {
      const imc = (parsedWeight / Math.pow(parsedHeight, 2)).toFixed(1);
      setPrimaryLabel(`Seu IMC é de ${imc}`);
      switch (true) {
        case imc < 18.5: {
          setLabelColor("danger");
          setSecondaryLabel("Classificação: MAGREZA. Procure um médico.");
          break;
        }
        case imc < 24.9: {
          setLabelColor("normal");
          setSecondaryLabel("Parabéns! Seu peso está normal!");
          break;
        }
        case imc < 29.9: {
          setLabelColor("warning");
          setSecondaryLabel(
            "Classificação: OBESIDADE GRAU I. Reveja seu hábito alimentar!"
          );
          break;
        }
        case imc < 39.9: {
          setLabelColor("danger");
          setSecondaryLabel(
            "Classificação: OBESIDADE GRAU II. Procure um médico."
          );
          break;
        }
        case imc >= 40: {
          setLabelColor("danger");
          setSecondaryLabel(
            "Classificação: OBESIDADE GRAU III. Procure um médico."
          );
          break;
        }
        default: {
          setPrimaryLabel(`ERRO`);
          setLabelColor("danger");
          setSecondaryLabel(
            "Houve um erro ao calcular o IMC. Por favor, reveja os valores inseridos e tente novamente."
          );
          break;
        }
      }
    }
  }

  return (
    <>
      {username.toString().length > 1 && (
        <SHeader>
          <SP1>Cálculo de IMC</SP1>
          <SHBox>
            <SLoginInputGroup>
              <label htmlFor="altura">Altura</label>
              <input
                onChange={(ev) => resetHeight(ev.target.value)}
                type="text"
                name="altura"
                placeholder="1,65"
              ></input>
              <label htmlFor="peso">m</label>
            </SLoginInputGroup>
            <SLoginInputGroup>
              <label htmlFor="peso">Peso</label>
              <input
                onChange={(ev) => resetWeight(ev.target.value)}
                type="text"
                name="peso"
                placeholder="65,5"
              ></input>
              <label htmlFor="peso">Kg</label>
            </SLoginInputGroup>
          </SHBox>
          <ButtonComponent
            onChange={buttonClick}
            checked={isActive}
            name={"imc-button"}
            label={"Calcular"}
          ></ButtonComponent>
          {show && (
            <>
              <SP1>{primaryLabel}</SP1>
              <SP1 color={labelColor}>{secondaryLabel}</SP1>
            </>
          )}
        </SHeader>
      )}
    </>
  );
}

export default IMCCalculator;
