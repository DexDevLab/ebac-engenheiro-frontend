import "react-toastify/dist/ReactToastify.css";
import FormComponent from "./FormComponent";
import SVBox from "./Styled/SVBox";
import { SH1, SH2 } from "./Styled/Style";

function App({ ...props }) {
  return (
    <>
      <SVBox h={5}>
        <SH1>EBAC - Profissão: Engenheiro Frontend - React do Zero ao Pro</SH1>
        <SH2>Módulo 08 - Exercício - Formulário com Componentes em Array</SH2>
      </SVBox>
      <FormComponent />
    </>
  );
}

export default App;
