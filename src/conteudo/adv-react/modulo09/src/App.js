import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import SVBox from "./components/Styled/SVBox";
import { SH1, SH2 } from "./components/Styled/Style";
import FormOne from "./pages/FormOne";
import FormTwo from "./pages/FormTwo";
import Home from "./pages/Home";

function App({ ...props }) {
  const [location, setLocation] = useState("");

  const loadPage = (location) => {
    switch (location) {
      case "":
        return <Home setLocation={setLocation} />;
      case "formOne":
        return <FormOne setLocation={setLocation} />;
      case "formTwo":
        return <FormTwo setLocation={setLocation} />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <SVBox pt={4} h={5}>
        <SH1>EBAC - Profissão: Engenheiro Frontend - React do Zero ao Pro</SH1>
        <SH2>Módulo 09 - Exercício - Formulário com HOC e Render Props</SH2>
      </SVBox>
      {loadPage(location)}
    </>
  );
}

export default App;
