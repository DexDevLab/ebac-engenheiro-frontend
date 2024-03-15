import SendIcon from "@mui/icons-material/Send";
import {
  Alert,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import SContainer from "../Styled/SContainer";
import SHBox from "../Styled/SHBox";
import SVBox from "../Styled/SVBox";
import { SH2 } from "../Styled/Style";

function FormComponent({ ...props }) {
  const theme = useTheme();
  const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));
  const [disabled, setDisabled] = useState(true);
  const [formError, setFormError] = useState({
    nome: false,
    idade: false,
    genero: false,
    estadoCivil: false,
    docTipo: false,
    doc: false,
  });
  const [errorColor, setErrorColor] = useState("");
  const [formData, setFormData] = useState({
    nome: {
      label: "",
      value: "",
    },
    idade: {
      label: "",
      value: "",
    },
    genero: {
      label: "",
      value: "",
    },
    estadoCivil: {
      label: "",
      value: "",
    },
    docTipo: {
      label: "",
      value: "",
    },
    doc: {
      label: "",
      value: "",
    },
  });
  const [submitData, setSubmitData] = useState("");
  const [formStatus, setFormStatus] = useState("");

  const submitDataComponent = (key, label, value) => {
    return (
      <Grid key={`${key}-${label}`} item xs={6}>
        <Typography variant="h6">
          {label}: {value}
        </Typography>
      </Grid>
    );
  };

  const onChange = (label, target) => {
    validate(label, target.value);
    if (label.toString().includes("docTipo")) {
      setFormData({
        ...formData,
        docTipo: { label: target.id, value: target.value },
        doc: { label: "", value: "" },
      });
    } else {
      setFormData({
        ...formData,
        [label]: { label: target.id, value: target.value },
      });
    }
    setFormStatus("");
    setSubmitData("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      setFormStatus("success");
      setSubmitData({ ...formData });
      setFormData({
        nome: {
          label: "",
          value: "",
        },
        idade: {
          label: "",
          value: "",
        },
        genero: {
          label: "",
          value: "",
        },
        estadoCivil: {
          label: "",
          value: "",
        },
        docTipo: {
          label: "",
          value: "",
        },
        doc: {
          label: "",
          value: "",
        },
      });
    } else {
      setFormStatus("error");
    }
  };

  const validate = (label, value) => {
    let isValid = false;
    switch (label) {
      case "nome":
        isValid = value.includes(" ") && value.toString().match("([A-z])\\w+");
        break;
      case "idade":
        isValid = Number(value) > 0;
        break;
      case "genero":
      case "estadoCivil":
      case "docTipo":
        isValid = value.toString().length > 0;
        break;
      case "doc":
        isValid =
          (formData.docTipo.value.includes("CNH") &&
            value.toString().length === 11) ||
          (formData.docTipo.value.includes("RG") && value.length === 12) ||
          (formData.docTipo.value.includes("Outro") && value.length !== 0);
        break;
      default:
        break;
    }
    setFormError({
      ...formError,
      [label]: !isValid,
    });
  };

  const isValid = () => {
    const isValid = {
      nome:
        !formData.nome.value.includes(" ") ||
        !formData.nome.value.toString().match("([A-z])\\w+"),
      idade: !Number(formData.idade.value) > 0,
      genero: !formData.genero.value.length > 0,
      estadoCivil: !formData.estadoCivil.value.length > 0,
      docTipo: !formData.docTipo.value.length > 0,
      doc:
        (formData.docTipo.value.includes("CNH") &&
          formData.doc.value.toString().length !== 11) ||
        (formData.docTipo.value.includes("RG") &&
          formData.doc.value.toString().length !== 12) ||
        (formData.docTipo.value.includes("Outro") &&
          formData.doc.value.toString().length === 0) ||
        formData.doc.value.length === 0,
    };
    setFormError({ ...isValid });
    return !(Object.values(isValid).indexOf(true) >= 0);
  };

  useEffect(() => {
    formData.docTipo.value.toString().length > 0
      ? setDisabled(false)
      : setDisabled(true);
    formError.genero ? setErrorColor("red") : setErrorColor("");
  }, [formError, formData]);

  return (
    <>
      {formStatus && (
        <SHBox w={5} pt={10}>
          <Alert severity={formStatus}>
            {formStatus === "success"
              ? "Formulário enviado com sucesso!"
              : "Erro ao enviar o formulário. Verifique os campos em vermelho e tente novamente."}
          </Alert>
        </SHBox>
      )}

      <SContainer>
        <form onSubmit={onSubmit}>
          <SHBox $isFlex={greaterThanMid} my={6}>
            <SVBox gap={2} w={8}>
              <TextField
                sx={{ width: "100%" }}
                variant="filled"
                label="Nome"
                type="text"
                value={formData.nome.value}
                id={"Nome"}
                onChange={(e) => onChange("nome", e.target)}
                error={formError.nome ? true : false}
              />
              <TextField
                sx={{ width: "100%" }}
                variant="filled"
                label="Idade"
                id={"Idade"}
                type="number"
                value={formData.idade.value}
                onChange={(e) => onChange("idade", e.target)}
                error={formError.idade ? true : false}
              />
              <FormControl sx={{ width: "100%" }}>
                <FormLabel
                  sx={{ textAlign: "left", width: "100%" }}
                  error={formError.genero ? true : false}
                >
                  Gênero
                </FormLabel>
                <RadioGroup
                  onChange={(e) =>
                    onChange("genero", { id: "Gênero", value: e.target.value })
                  }
                  value={formData.genero.value}
                  row
                  aria-labelledby="radio-buttons-group-label"
                  name="radio-buttons-group"
                  sx={{ width: "100%", justifyContent: "center" }}
                >
                  <FormControlLabel
                    value="Feminino"
                    control={<Radio />}
                    label="Feminino"
                    sx={{
                      color: errorColor,
                    }}
                  />
                  <FormControlLabel
                    value="Masculino"
                    control={<Radio />}
                    label="Masculino"
                    sx={{
                      color: errorColor,
                    }}
                  />
                  <FormControlLabel
                    value="Outro"
                    control={<Radio />}
                    label="Outro"
                    sx={{
                      color: errorColor,
                    }}
                  />
                </RadioGroup>
              </FormControl>
            </SVBox>
            <SVBox gap={2} w={8}>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel
                  id="select-label-estado-civil"
                  sx={{ width: "100%", textAlign: "left" }}
                >
                  Estado Civil
                </InputLabel>
                <Select
                  value={formData.estadoCivil.value}
                  onChange={(e) =>
                    onChange("estadoCivil", {
                      id: "Estado Civil",
                      value: e.target.value,
                    })
                  }
                  error={formError.estadoCivil ? true : false}
                  labelId="select-estado-civil"
                  label="Estado Civil"
                  id="estado-civil-select"
                  sx={{ width: "100%", textAlign: "left" }}
                >
                  <MenuItem value={"Solteiro"}>Solteiro</MenuItem>
                  <MenuItem value={"Casado"}>Casado</MenuItem>
                  <MenuItem value={"Separado"}>Separado</MenuItem>
                  <MenuItem value={"Divorciado"}>Divorciado</MenuItem>
                  <MenuItem value={"Viúvo"}>Viúvo</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ width: "100%" }}>
                <InputLabel
                  id="select-label-doc"
                  sx={{ width: "100%", textAlign: "left" }}
                >
                  Selecione o Documento
                </InputLabel>
                <Select
                  value={formData.docTipo.value}
                  onChange={(e) =>
                    onChange("docTipo", {
                      id: "Tipo de Documento",
                      value: e.target.value,
                    })
                  }
                  error={formError.docTipo ? true : false}
                  labelId="select-doc"
                  id="doc-select"
                  label="Selecione o Documento"
                  defaultValue={""}
                  sx={{ width: "100%", textAlign: "left" }}
                >
                  <MenuItem value={"RG"}>RG</MenuItem>
                  <MenuItem value={"CNH"}>CNH</MenuItem>
                  <MenuItem value={"Outro"}>Outro</MenuItem>
                </Select>
              </FormControl>
              {formData.docTipo.value.includes("RG") ? (
                <InputMask
                  disabled={disabled}
                  value={formData.doc.value}
                  id={"Número do Documento"}
                  onChange={(e) => onChange("doc", e.target)}
                  mask={"99.999.999-9"}
                  maskChar=""
                >
                  {(inputProps) => (
                    <TextField
                      {...inputProps}
                      sx={{ width: "100%" }}
                      error={formError.doc ? true : false}
                      variant="filled"
                      label="Documento"
                      type="text"
                    />
                  )}
                </InputMask>
              ) : (
                <TextField
                  disabled={disabled}
                  sx={{ width: "100%" }}
                  variant="filled"
                  label="Documento"
                  type="text"
                  value={formData.doc.value}
                  id={"Número do Documento"}
                  onChange={(e) => onChange("doc", e.target)}
                  error={formError.doc ? true : false}
                />
              )}
            </SVBox>
          </SHBox>
          <Button type="submit" variant="contained" endIcon={<SendIcon />}>
            Enviar
          </Button>
        </form>
        {submitData && (
          <SVBox pt={5} gap={2} w={greaterThanMid ? 14 : 7}>
            <Box>
              <SH2>Dados do Formulário</SH2>
            </Box>

            <Box width={"100%"}>
              <Grid
                mt={5}
                mx={"auto"}
                container
                direction={greaterThanMid ? "row" : "column"}
                spacing={1}
                columnSpacing={3}
                sx={{
                  width: "70%",
                  textAlign: "left",
                }}
              >
                {Object.keys(submitData).map((key, idx) => {
                  return submitDataComponent(
                    idx,
                    submitData[key].label,
                    submitData[key].value
                  );
                })}
              </Grid>
            </Box>
          </SVBox>
        )}
      </SContainer>
    </>
  );
}

export default FormComponent;
