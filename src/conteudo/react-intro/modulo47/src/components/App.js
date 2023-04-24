import logo from "../images/logo.svg";
import SContainer from "./Styled/SContainer";
import { SH1, SHeader, SLogo, SP1 } from "./Styled/Style";

function App({ username, count, ...props }) {
  const user = username.toString();

  return (
    <SContainer>
      <SHeader>
        <SLogo src={logo} alt="logo" />
        <SH1>React App</SH1>
        {user.length > 1 ? (
          <SP1>
            Olá {user}! É a sua {count}ª visita.
          </SP1>
        ) : (
          <SP1>Olá visitante! Por favor, faça login.</SP1>
        )}
      </SHeader>
    </SContainer>
  );
}

export default App;
