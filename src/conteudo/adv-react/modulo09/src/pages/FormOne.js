import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import FormComponent from "../components/Forms/FormComponent";
import FormControlLabelComponent from "../components/Forms/FormControlLabelComponent";
import InputMaskComponent from "../components/Forms/InputMaskComponent";
import SelectComponent from "../components/Forms/SelectComponent";
import SHBox from "../components/Styled/SHBox";
import SVBox from "../components/Styled/SVBox";

function FormOne({ setLocation, ...props }) {
  const theme = useTheme();
  const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));

  const formFields = {
    nome: {
      label: "Nome",
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
      isValid: function (value, dependant) {
        return Number(value) > 0 ? true : false;
      },
    },
    genero: {
      label: "Gênero",
      isValid: function (value, dependant) {
        return value.toString().length > 0 ? true : false;
      },
    },
    estadoCivil: {
      label: "Estado Civil",
      isValid: function (value, dependant) {
        return value.toString().length > 0 ? true : false;
      },
    },
    docTipo: {
      label: "Tipo de Documento",
      isValid: function (value, dependant) {
        return value.toString().length > 0 ? true : false;
      },
    },
    doc: {
      label: "Documento",
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

  const dependants = ["doc", "docTipo"];

  const onChange = (label, target) => {
    validate(label, target.value);
    if (dependants && label.toString().includes(dependants[1])) {
      setFormData({
        ...formData,
        [dependants[1]]: { label: target.id, value: target.value },
        [dependants[0]]: { label: "", value: "" },
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

  const validate = (label, value) => {
    if (dependants) {
      setFormError({
        ...formError,
        [label]: !formFields[label].isValid(value, formData[dependants[1]]),
      });
    } else {
      setFormError({
        ...formError,
        [label]: !formFields[label].isValid(value, null),
      });
    }
  };

  return (
    <>
      <SVBox pt={3} h={5}>
        <Typography variant="h6">
          Formulário 1 - Cadastro básico de usuário
        </Typography>
      </SVBox>
      <FormComponent
        dependants={dependants}
        formFields={formFields}
        formData={formData}
        setFormData={setFormData}
        formError={formError}
        setFormError={setFormError}
        submitData={submitData}
        setSubmitData={setSubmitData}
        formStatus={formStatus}
        setFormStatus={setFormStatus}
        breakpoint={greaterThanMid}
      >
        <SHBox $isFlex={greaterThanMid} my={6}>
          <SVBox gap={2} w={8}>
            <TextField
              sx={{ width: "100%" }}
              variant="filled"
              label={formFields.nome.label}
              type="text"
              value={formData.nome.value}
              id={formFields.nome.label}
              onChange={(e) => onChange("nome", e.target)}
              error={formError.nome ? true : false}
            />
            <TextField
              sx={{ width: "100%" }}
              variant="filled"
              label={formFields.idade.label}
              id={formFields.idade.label}
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
          <SVBox gap={2} w={8}>
            <FormControl sx={{ width: "100%" }}>
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
            <FormControl sx={{ width: "100%" }}>
              <InputLabel
                id="select-label-doc"
                sx={{ width: "100%", textAlign: "left" }}
              >
                Selecione o Documento
              </InputLabel>
              <SelectComponent
                value={formData.docTipo.value}
                onChange={(e) =>
                  onChange("docTipo", {
                    id: "Tipo de Documento",
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
              dependant={formData[dependants[1]].value}
            />
          </SVBox>
        </SHBox>
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
          onClick={() => setLocation("")}
        >
          Voltar
        </Button>
      </FormComponent>
    </>
  );
}

export default FormOne;
