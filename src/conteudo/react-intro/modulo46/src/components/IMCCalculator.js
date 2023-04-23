import { useState } from "react";
import "../styles/IMC.css";

function IMCCalculator() {
  const [isActive, setIsActive] = useState(false);
  const [show, setShow] = useState(false);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [primaryLabel, setPrimaryLabel] = useState("");
  const [secondaryLabel, setSecondaryLabel] = useState("");
  const [labelColor, setLabelColor] = useState("normalColor");

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
      setLabelColor("dangerColor");
      setSecondaryLabel(
        "Houve um erro ao calcular o IMC. Por favor, reveja os valores inseridos e tente novamente."
      );
    } else {
      const imc = (parsedWeight / Math.pow(parsedHeight, 2)).toFixed(1);
      setPrimaryLabel(`Seu IMC é de ${imc}`);
      switch (true) {
        case imc < 18.5: {
          setLabelColor("dangerColor");
          setSecondaryLabel("Classificação: MAGREZA. Procure um médico.");
          break;
        }
        case imc < 24.9: {
          setLabelColor("normalColor");
          setSecondaryLabel("Parabéns! Seu peso está normal!");
          break;
        }
        case imc < 29.9: {
          setLabelColor("warningColor");
          setSecondaryLabel(
            "Classificação: OBESIDADE GRAU I. Reveja seu hábito alimentar!"
          );
          break;
        }
        case imc < 39.9: {
          setLabelColor("dangerColor");
          setSecondaryLabel(
            "Classificação: OBESIDADE GRAU II. Procure um médico."
          );
          break;
        }
        case imc >= 40: {
          setLabelColor("dangerColor");
          setSecondaryLabel(
            "Classificação: OBESIDADE GRAU III. Procure um médico."
          );
          break;
        }
        default: {
          setPrimaryLabel(`ERRO`);
          setLabelColor("dangerColor");
          setSecondaryLabel(
            "Houve um erro ao calcular o IMC. Por favor, reveja os valores inseridos e tente novamente."
          );
          break;
        }
      }
    }
  }

  return (
    <header className="IMC-header">
      <p>Cálculo de IMC</p>
      <div className="IMC-container">
        <div className="IMC-group">
          <label htmlFor="altura">Altura</label>
          <input
            onChange={(ev) => resetHeight(ev.target.value)}
            type="text"
            name="altura"
            placeholder="1,65"
            value={height}
          ></input>
          <label htmlFor="peso">m</label>
        </div>
        <div className="IMC-group">
          <label htmlFor="peso">Peso</label>
          <input
            onChange={(ev) => resetWeight(ev.target.value)}
            type="text"
            name="peso"
            placeholder="65,5"
            value={weight}
          ></input>
          <label htmlFor="peso">Kg</label>
        </div>
      </div>
      <div className="IMC-group">
        <input
          onChange={buttonClick}
          checked={isActive}
          type="checkbox"
          name="IMC-button-control"
          id="IMC-button-control"
        />
        <label htmlFor="IMC-button-control">
          <div className="IMC-button">
            <p>Calcular</p>
          </div>
        </label>
      </div>
      {show && (
        <>
          <p>{primaryLabel}</p>
          <p className={labelColor}>{secondaryLabel}</p>
        </>
      )}
    </header>
  );
}

export default IMCCalculator;
