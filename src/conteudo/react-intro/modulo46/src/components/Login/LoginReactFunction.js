import React, { useState } from "react";
import "../../styles/Login.css";

function Login({ children, ...pageprops }) {
  const [isActive, setIsActive] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");
  let inputUser = "";

  function buttonClick() {
    setIsActive(true);
    setTimeout(setIsActive, 150, false);
    if (isLogged) {
      setIsLogged(false);
      setUsername("");
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
      {React.cloneElement(children, { username: username })}
      <div className="Login">
        <header className="Login-header">
          <h2>Login</h2>
          {isLogged ? (
            <p>Logado como {username}</p>
          ) : (
            <div className="Login-container">
              <div className="Login-group">
                <label htmlFor="username">Nome de usuário</label>
                <input
                  onChange={(ev) => setUser(ev.target.value)}
                  type="text"
                  name="username"
                  placeholder="usuario"
                ></input>
              </div>
            </div>
          )}
          <div className="Login-group">
            <input
              onChange={buttonClick}
              checked={isActive}
              type="checkbox"
              name="Login-button-control"
              id="Login-button-control"
            />
            <label htmlFor="Login-button-control">
              <div className="Login-button">
                {isLogged ? <p>Sair</p> : <p>Entrar</p>}
              </div>
            </label>
          </div>
        </header>
      </div>
    </>
  );
}

export default Login;
