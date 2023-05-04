import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../images/logo.svg";
import SContainer from "./Styled/SContainer";
import SHBox from "./Styled/SHBox";
import SVBox from "./Styled/SVBox";
import { SH1, SH2, SHeader, SLogo, SP1 } from "./Styled/Style";

function App({ greeting, ...props }) {
  const [isLoaded, setLoaded] = useState(false);

  const notify = (text, theme) =>
    toast(text, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: theme,
    });

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1500);
    if (isLoaded) {
      notify(greeting, "light");
      setTimeout(() => {
        notify(greeting, "dark");
      }, 1500);
    }
  });

  return (
    <>
      <ToastContainer />
      <SContainer>
        <SHeader>
          <SLogo src={logo} alt="logo" />
          {greeting ? (
            <>
              <SHBox>
                <SVBox h={10}>
                  <h1>{greeting}</h1>
                  <SH1>{greeting}</SH1>
                  <h2>{greeting}</h2>
                  <SH2>{greeting}</SH2>
                </SVBox>
                <SVBox h={10}>
                  <p>{greeting}</p>
                  <SP1 color="normal">{greeting}</SP1>
                  <SP1 color="warning">{greeting}</SP1>
                  <SP1 color="danger">{greeting}</SP1>
                </SVBox>
              </SHBox>
            </>
          ) : (
            <SH1>React App</SH1>
          )}
        </SHeader>
      </SContainer>
    </>
  );
}

export default App;
