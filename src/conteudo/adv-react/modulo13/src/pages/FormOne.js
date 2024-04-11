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
import { useNavigate } from "react-router-dom";
import "../assets/styles/App.css";
import FormComponent from "../components/Forms/FormComponent";
import FormControlLabelComponent from "../components/Forms/FormControlLabelComponent";
import InputMaskComponent from "../components/Forms/InputMaskComponent";
import SelectComponent from "../components/Forms/SelectComponent";
import SVBox from "../components/Styled/SVBox";
import useForm from "../hooks/useForm";

function FormOne() {
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

  const [onChange, onSubmit, formData, formError, formStatus, submitData] =
    useForm(formFields);

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
      >
        <Box
          sx={{
            display: ["box", "flex"],
            maxWidth: ["100%", "100%", "80%", "45%"],
            marginX: "auto",
          }}
          my={6}
        >
          <SVBox gap={2} sx={{ width: "45%" }}>
            <TextField
              sx={{ width: "100%" }}
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
              sx={{ width: "100%" }}
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
          <SVBox gap={2.5} sx={{ width: "45%" }}>
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

export default FormOne;
