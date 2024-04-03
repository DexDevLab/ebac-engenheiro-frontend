import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";

function App({ ...props }) {
  const [location, setLocation] = useState("");

  const loadPage = (location) => {
    switch (location) {
      case "":
        return <Home setLocation={setLocation} />;
      default:
        return <></>;
    }
  };

  return <>{loadPage(location)}</>;
}

export default App;
