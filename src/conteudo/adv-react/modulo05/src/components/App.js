import "react-toastify/dist/ReactToastify.css";
import CalcModule from "./Calculator/CalcModule";
import SVBox from "./Styled/SVBox";
import { SH1, SH2 } from "./Styled/Style";

function App({ ...props }) {
  return (
    <>
      <SVBox h={5}>
        <SH1>EBAC - Profissão: Engenheiro Frontend - React do Zero ao Pro</SH1>
        <SH2>Módulo 05 - Exercício - Calculadora</SH2>
      </SVBox>
      <CalcModule />
    </>
  );
}

export default App;
