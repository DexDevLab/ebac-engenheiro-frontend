import { Box, TextField, Typography } from "@mui/material";
import _ from "lodash";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom/dist";
import "../assets/styles/App.css";
import SVBox from "../components/Styled/SVBox";

function ResultPage() {
  const location = useLocation();
  const submitData = useMemo(() => {
    const data = {};
    if (!_.isNull(location.state)) {
      Object.keys(location.state.submit).forEach((key) => {
        Object.assign(data, {
          [key]: location.state.submit[key].value,
        });
      });
    }
    return data;
  }, [location.state]);

  return (
    <>
      {Object.keys(submitData).length > 0 ? (
        <>
          <SVBox pt={3} h={5}>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Resultado do Formulário
            </Typography>
          </SVBox>
          <Box
            sx={{
              display: ["box", "flex"],
              maxWidth: ["100%", "100%", "80%", "45%"],
              marginX: "auto",
            }}
            my={6}
          >
            <SVBox gap={2} w={[5.5]} pt={2}>
              <TextField
                disabled
                sx={{
                  width: ["unset", "100%"],
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                  },
                }}
                variant="standard"
                label={"Nome"}
                type="text"
                defaultValue={submitData.nome.toString()}
              />
              <TextField
                disabled
                sx={{
                  width: ["unset", "100%"],
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                  },
                }}
                variant="standard"
                label={"Idade"}
                type="text"
                defaultValue={submitData.idade.toString()}
              />
              <TextField
                disabled
                sx={{
                  width: ["unset", "100%"],
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                  },
                }}
                variant="standard"
                label={"Gênero"}
                type="text"
                defaultValue={submitData.genero.toString()}
              />
            </SVBox>
            <SVBox gap={2} w={[6]} pt={2}>
              <TextField
                disabled
                sx={{
                  width: ["unset", "100%"],
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                  },
                }}
                variant="standard"
                label={"Estado Civil"}
                type="text"
                defaultValue={submitData.estadoCivil.toString()}
              />
              <TextField
                disabled
                sx={{
                  width: ["unset", "100%"],
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                  },
                }}
                variant="standard"
                label={"Tipo de Documento"}
                type="text"
                defaultValue={submitData.docTipo.toString()}
              />
              <TextField
                disabled
                sx={{
                  width: ["unset", "100%"],
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#000000",
                  },
                }}
                variant="standard"
                label={"Número do Documento"}
                type="text"
                defaultValue={submitData.doc.toString()}
              />
            </SVBox>
          </Box>
        </>
      ) : (
        <SVBox pt={3} h={5}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            Por favor preencha o{" "}
            <Link
              style={{
                textDecoration: "none",
                fontWeight: "bold",
              }}
              to="/form"
            >
              Formulário
            </Link>
            .
          </Typography>
        </SVBox>
      )}
    </>
  );
}

export default ResultPage;
