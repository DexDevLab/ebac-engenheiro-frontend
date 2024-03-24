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
  // const smallToMid = useMediaQuery(theme.breakpoints.between("sm", "md"));
  // const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));
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
    nome: "",
    idade: "",
    genero: "",
    estadoCivil: "",
    docTipo: "",
    doc: "",
  });
  const [submitData, setSubmitData] = useState("");
  const [formStatus, setFormStatus] = useState("");

  const onChange = (label, value) => {
    validate(label, value);
    if (label.toString().includes("docTipo")) {
      setFormData({
        ...formData,
        docTipo: value,
        doc: "",
      });
    } else {
      setFormData({ ...formData, [label]: value });
    }
    setFormStatus("");
    setSubmitData("");
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (formIsValid()) {
      setFormStatus("success");
      setSubmitData({ ...formData });
      setFormData({
        nome: "",
        idade: "",
        genero: "",
        estadoCivil: "",
        docTipo: "",
        doc: "",
      });
    } else {
      setFormStatus("error");
    }
  };

  const validate = (label, value) => {
    let isValid = false;
    switch (label) {
      case "nome":
        isValid =
          value.includes(" ") &&
          value.toString().match("([A-z])\\D+") &&
          !value.toString().match("([0-9])+");
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
          (formData.docTipo.includes("CNH") &&
            value.toString().length === 11) ||
          (formData.docTipo.includes("RG") && value.length === 12) ||
          (formData.docTipo.includes("Outro") && value.length !== 0);
        break;
      default:
        break;
    }
    setFormError({
      ...formError,
      [label]: !isValid,
    });
  };

  const formIsValid = () => {
    const isValid = {
      nome:
        !formData.nome.includes(" ") ||
        !formData.nome.toString().match("([A-z])\\D+") ||
        formData.nome.toString().match("([0-9])+"),
      idade: !Number(formData.idade) > 0,
      genero: !formData.genero.length > 0,
      estadoCivil: !formData.estadoCivil.length > 0,
      docTipo: !formData.docTipo.length > 0,
      doc:
        (formData.docTipo.includes("CNH") &&
          formData.doc.toString().length !== 11) ||
        (formData.docTipo.includes("RG") &&
          formData.doc.toString().length !== 12) ||
        (formData.docTipo.includes("Outro") &&
          formData.doc.toString().length === 0) ||
        formData.doc.length === 0,
    };
    setFormError({ ...isValid });
    return !(Object.values(isValid).indexOf(true) >= 0);
  };

  useEffect(() => {
    formData.docTipo.length > 0 ? setDisabled(false) : setDisabled(true);
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
                value={formData.nome}
                onChange={(e) => onChange("nome", e.target.value)}
                error={formError.nome ? true : false}
              />
              <TextField
                sx={{ width: "100%" }}
                variant="filled"
                label="Idade"
                type="number"
                value={formData.idade}
                onChange={(e) => onChange("idade", e.target.value)}
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
                  onChange={(e) => onChange("genero", e.target.value)}
                  row
                  aria-labelledby="radio-buttons-group-label"
                  name="radio-buttons-group"
                  sx={{ width: "100%", justifyContent: "center" }}
                  value={formData.genero}
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
                  value={formData.estadoCivil}
                  onChange={(e) => onChange("estadoCivil", e.target.value)}
                  error={formError.estadoCivil ? true : false}
                  labelId="select-estado-civil"
                  id="select-estado-civil"
                  label="Estado Civil"
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
                  value={formData.docTipo}
                  onChange={(e) => onChange("docTipo", e.target.value)}
                  error={formError.docTipo ? true : false}
                  labelId="select-doc"
                  id="select-doc"
                  label="Selecione o Documento"
                  sx={{ width: "100%", textAlign: "left" }}
                >
                  <MenuItem value={"RG"}>RG</MenuItem>
                  <MenuItem value={"CNH"}>CNH</MenuItem>
                  <MenuItem value={"Outro"}>Outro</MenuItem>
                </Select>
              </FormControl>
              {formData.docTipo.includes("RG") ? (
                <InputMask
                  disabled={disabled}
                  value={formData.doc}
                  id={"Número do Documento"}
                  onChange={(e) => onChange("doc", e.target.value)}
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
                  value={formData.doc}
                  id={"Número do Documento"}
                  onChange={(e) => onChange("doc", e.target.value)}
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
            <Grid
              mt={5}
              mx={"auto"}
              container
              columnSpacing={3}
              direction={greaterThanMid ? "row" : "column"}
              spacing={1}
              sx={{
                width: "70%",
                textAlign: "left",
              }}
            >
              <Grid item xs={6}>
                <Typography variant="h6">Nome: {submitData.nome}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">Idade: {submitData.idade}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">
                  Gênero: {submitData.genero}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">
                  Estado Civil: {submitData.estadoCivil}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">
                  Tipo de Documento: {submitData.docTipo}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6">
                  Número do Documento: {submitData.doc}
                </Typography>
              </Grid>
            </Grid>
          </SVBox>
        )}
      </SContainer>
    </>
  );
}

export default FormComponent;
