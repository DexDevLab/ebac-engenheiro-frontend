import { useEffect, useState } from "react";
import logo from "../images/logo.svg";
import "../styles/App.css";

function App({ username, ...props }) {
  const user = username.toString();
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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>React App</h1>
        {user.length > 1 ? (
          <p>
            Olá {user}! É a sua {count}ª visita.
          </p>
        ) : (
          <p>Olá visitante! Por favor, faça login.</p>
        )}
      </header>
    </div>
  );
}

export default App;
