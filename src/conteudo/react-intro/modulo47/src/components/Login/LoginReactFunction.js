import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../Button/ButtonComponent";
import SContainer from "../Styled/SContainer";
import SVBox from "../Styled/SVBox";
import { SH2, SHeader, SLoginInputGroup, SP1 } from "../Styled/Style";

function Login({ children, ...pageprops }) {
  const [isActive, setIsActive] = useState(false);
  const [resetCounter, setResetCounter] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  const visitCount = window.localStorage.getItem("VISIT_COUNT");
  let initialValue = 0;
  if (visitCount) {
    initialValue = JSON.parse(visitCount);
  }
  const [count, setCount] = useState(initialValue);

  useEffect(() => {
    window.localStorage.setItem("VISIT_COUNT", JSON.stringify(count + 1));
    setCount(count + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let inputUser = "";

  function buttonClick() {
    setIsActive(true);
    setTimeout(setIsActive, 150, false);
    if (isLogged) {
      setIsLogged(false);
      setUsername("");
      if (resetCounter) {
        setCount(1);
      }
    } else {
      if (inputUser.length > 1) {
        setUsername(inputUser);
        setIsLogged(true);
      }
    }
  }

  function setUser(value) {
    inputUser = value;
  }

  return (
    <>
      {children &&
        React.Children.map(children, (child) =>
          React.cloneElement(child, { username: username, count: count })
        )}
      <SContainer>
        <SHeader>
          {isLogged ? (
            <SP1>Logado como {username}</SP1>
          ) : (
            <>
              <SH2>Login</SH2>
              <SLoginInputGroup>
                <label htmlFor="username">Nome de usuário</label>
                <input
                  onChange={(ev) => setUser(ev.target.value)}
                  type="text"
                  name="username"
                  placeholder="usuario"
                ></input>
              </SLoginInputGroup>
            </>
          )}
          <SVBox h={isLogged ? 2 : 1}>
            {isLogged && (
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="success"
                      onChange={() => setResetCounter(!resetCounter)}
                    />
                  }
                  label="Reiniciar contador de visitas"
                  color="success"
                />
              </FormGroup>
            )}
            <ButtonComponent
              onChange={buttonClick}
              checked={isActive}
              name={"login-button-control"}
              label={isLogged ? "Sair" : "Entrar"}
            ></ButtonComponent>
          </SVBox>
        </SHeader>
      </SContainer>
    </>
  );
}

export default Login;
