import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/App.css";
import FormComponent from "../components/Forms/FormComponent";
import FormControlLabelComponent from "../components/Forms/FormControlLabelComponent";
import InputMaskComponent from "../components/Forms/InputMaskComponent";
import SelectComponent from "../components/Forms/SelectComponent";
import SVBox from "../components/Styled/SVBox";

function FormPage() {
  const navigate = useNavigate();

  const formFields = {
    nome: {
      label: "Nome",
      dependant: "",
      clears: [],
      isValid: function (value, dependant) {
        return value.includes(" ") &&
          value.toString().match("([A-z])\\D+") &&
          !value.toString().match("([0-9])+")
          ? true
          : false;
      },
    },
    idade: {
      label: "Idade",
      dependant: "",
      clears: [],
      isValid: function (value, dependant) {
        return Number(value) > 0 ? true : false;
      },
    },
    genero: {
      label: "Gênero",
      dependant: "",
      clears: [],
      isValid: function (value, dependant) {
        return value.toString().length > 0 ? true : false;
      },
    },
    estadoCivil: {
      label: "Estado Civil",
      dependant: "",
      clears: [],
      isValid: function (value, dependant) {
        return value.toString().length > 0 ? true : false;
      },
    },
    docTipo: {
      label: "Tipo de Documento",
      dependant: "",
      clears: ["doc"],
      isValid: function (value, dependant) {
        return value.toString().length > 0 ? true : false;
      },
    },
    doc: {
      label: "Documento",
      dependant: "docTipo",
      clears: [],
      isValid: function (value, dependant) {
        return (dependant.value.includes("CNH") &&
          value.toString().length === 11) ||
          (dependant.value.includes("RG") && value.length === 12) ||
          (dependant.value.includes("Outro") && value.length !== 0)
          ? true
          : false;
      },
    },
  };

  const formErrorFromFields = {};
  const formDataFromFields = {};

  Object.keys(formFields).forEach((key) => {
    Object.assign(formErrorFromFields, { [key]: false });
    Object.assign(formDataFromFields, {
      [key]: {
        label: "",
        value: "",
      },
    });
  });

  const [formError, setFormError] = useState({ ...formErrorFromFields });
  const [formData, setFormData] = useState({ ...formDataFromFields });
  const [submitData, setSubmitData] = useState("");
  const [formStatus, setFormStatus] = useState("");

  const resetFormData = () => {
    setFormData({ ...formDataFromFields });
  };

  const onChange = (label, target) => {
    validate(label, target.value);
    if (formFields[label].clears.length > 0) {
      if (formFields[label].clears[0].includes("all")) {
        resetFormData();
      } else {
        formFields[label].clears.forEach((item) => {
          setFormData({
            ...formData,
            [item]: { label: "", value: "" },
          });
        });
      }
    }
    setFormData({
      ...formData,
      [label]: {
        label: target.id,
        value: target.value,
      },
    });
    setFormStatus("");
    setSubmitData("");
  };

  const validate = (label, value) => {
    if (formFields[label].dependant.length > 0) {
      setFormError({
        ...formError,
        [label]: !formFields[label].isValid(
          value,
          formData[formFields[label].dependant]
        ),
      });
    } else {
      setFormError({
        ...formError,
        [label]: !formFields[label].isValid(value, null),
      });
    }
  };

  const isValid = () => {
    const isValid = {};
    Object.keys(formFields).forEach((key) => {
      if (formFields[key].dependant.length > 0) {
        Object.assign(isValid, {
          [key]: !formFields[key].isValid(
            formData[key].value,
            formData[formFields[key].dependant]
          ),
        });
      } else {
        Object.assign(isValid, {
          [key]: !formFields[key].isValid(formData[key].value, null),
        });
      }
    });
    setFormError({ ...isValid });
    return !(Object.values(isValid).indexOf(true) >= 0);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      setSubmitData({
        ...formData,
      });
      setFormStatus("success");
      resetFormData();
    } else {
      setFormStatus("error");
    }
  };

  const alertMessage = () => {
    return (
      <>
        Dados enviados com sucesso!{" "}
        <Link
          style={{
            textDecoration: "none",
            fontWeight: "bold",
          }}
          to="/listagem"
          state={{
            submit: submitData,
          }}
        >
          Conferir Dados
        </Link>
      </>
    );
  };

  return (
    <>
      <SVBox pt={3} h={5}>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Formulário 1 - Cadastro básico de usuário
        </Typography>
      </SVBox>
      <FormComponent
        submitData={submitData}
        formStatus={formStatus}
        onSubmit={onSubmit}
        showSubmittedData={false}
        alertMessage={alertMessage()}
      >
        <Box
          sx={{
            display: ["box", "flex"],
            maxWidth: ["100%", "100%", "80%", "45%"],
            marginX: "auto",
          }}
          my={6}
        >
          <SVBox gap={2} w={[1, 6]}>
            <TextField
              sx={{ width: ["unset", "100%"] }}
              variant="filled"
              label={formFields.nome.label}
              type="text"
              value={formData.nome.value}
              id={formFields.nome.label}
              onChange={(e) =>
                onChange("nome", {
                  id: formFields.nome.label,
                  value: e.target.value,
                })
              }
              error={formError.nome ? true : false}
            />
            <TextField
              sx={{ width: ["unset", "100%"] }}
              variant="filled"
              label={formFields.idade.label}
              id={formFields.idade.label}
              type="number"
              value={formData.idade.value}
              onChange={(e) =>
                onChange("idade", {
                  id: formFields.idade.label,
                  value: e.target.value,
                })
              }
              error={formError.idade ? true : false}
            />
            <FormControl
              //sx={{ width: "100%" }}
              sx={{ paddingBottom: ["10px", "unset"] }}
            >
              <FormLabel
                sx={{ textAlign: "left", width: "100%" }}
                error={formError.genero ? true : false}
              >
                Gênero
              </FormLabel>
              <RadioGroup
                onChange={(e) =>
                  onChange("genero", {
                    id: formFields.genero.label,
                    value: e.target.value,
                  })
                }
                value={formData.genero.value}
                row
                aria-labelledby="radio-buttons-group-label"
                name="radio-buttons-group"
              >
                <FormControlLabelComponent
                  error={formError.genero ? true : false}
                  value={"Feminino"}
                  control={<Radio />}
                  label={"Feminino"}
                />
                <FormControlLabelComponent
                  error={formError.genero ? true : false}
                  value={"Masculino"}
                  control={<Radio />}
                  label={"Masculino"}
                />
                <FormControlLabelComponent
                  error={formError.genero ? true : false}
                  value={"Outro"}
                  control={<Radio />}
                  label={"Outro"}
                />
              </RadioGroup>
            </FormControl>
          </SVBox>
          <SVBox gap={2.5} w={[6]}>
            <FormControl sx={{ width: ["70%", "100%"] }}>
              <InputLabel
                id="select-label-estado-civil"
                sx={{ width: "100%", textAlign: "left" }}
              >
                Estado Civil
              </InputLabel>
              <SelectComponent
                value={formData.estadoCivil.value}
                onChange={(e) =>
                  onChange("estadoCivil", {
                    id: formFields.estadoCivil.label,
                    value: e.target.value,
                  })
                }
                error={formError.estadoCivil}
                labelId="select-estado-civil"
                label={formFields.estadoCivil.label}
                id="estado-civil-select"
                options={[
                  { label: "Solteiro", value: "Solteiro" },
                  { label: "Casado", value: "Casado" },
                  { label: "Separado", value: "Separado" },
                  { label: "Divorciado", value: "Divorciado" },
                  { label: "Viúvo", value: "Viúvo" },
                ]}
              />
            </FormControl>
            <FormControl sx={{ width: ["70%", "100%"] }}>
              <InputLabel id="select-label-doc">
                Selecione o Documento
              </InputLabel>
              <SelectComponent
                value={formData.docTipo.value}
                onChange={(e) =>
                  onChange("docTipo", {
                    id: formFields.docTipo.label,
                    value: e.target.value,
                  })
                }
                error={formError.docTipo}
                labelId="select-doc"
                id="doc-select"
                label="Selecione o Documento"
                defaultValue={""}
                options={[
                  { label: "RG", value: "RG" },
                  { label: "CNH", value: "CNH" },
                  { label: "Outro", value: "Outro" },
                ]}
              />
            </FormControl>
            <InputMaskComponent
              value={formData.doc.value}
              id={"Número do Documento"}
              onChange={(e) => onChange("doc", e.target)}
              mask={"99.999.999-9"}
              maskChar=""
              error={formError.doc}
              variant={"filled"}
              label={formFields.doc.label}
              type={"text"}
              useMask={formData.docTipo.value.includes("RG")}
              dependant={formData.docTipo.value}
              sx={{ width: ["unset", "100%"] }}
            />
          </SVBox>
        </Box>
        <Button
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
          sx={{
            margin: "10px",
          }}
        >
          Enviar
        </Button>
        <Button
          type="button"
          color="success"
          variant="contained"
          sx={{
            margin: "10px",
          }}
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
      </FormComponent>
    </>
  );
}

export default FormPage;
