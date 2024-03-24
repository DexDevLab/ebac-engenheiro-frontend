import SendIcon from "@mui/icons-material/Send";
import {
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import FormComponent from "../components/Forms/FormComponent";
import SHBox from "../components/Styled/SHBox";
import SVBox from "../components/Styled/SVBox";

function FormTwo({ setLocation, ...props }) {
  const theme = useTheme();
  const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));
  const feedbackMaxChars = 200;

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
    email: {
      label: "Email",
      isValid: function (value, dependant) {
        return value.toString().match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
          ? true
          : false;
      },
    },
    feedback: {
      label: "Comentário",
      isValid: function (value, dependant) {
        return value.toString().length > 0 ? true : false;
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
  const [count, setCount] = useState(feedbackMaxChars);

  const dependants = undefined;

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
    if (label.toString().includes("feedback")) {
      setCount(feedbackMaxChars - target.value.toString().length);
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
          Formulário 2 - Questionário de Feedback
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
        <SHBox $isFlex={greaterThanMid} gap={5} w={10} mt={6} mb={2}>
          <SVBox pt={0} h={1}>
            <Typography variant="h6">
              Conte para nós sua experiência conosco!
            </Typography>
          </SVBox>
        </SHBox>
        <SHBox $isFlex={greaterThanMid} gap={5} w={10} mb={5}>
          <TextField
            sx={{ width: "50%" }}
            variant="filled"
            label={formFields.nome.label}
            type="text"
            value={formData.nome.value}
            id={formFields.nome.label}
            onChange={(e) => onChange("nome", e.target)}
            error={formError.nome ? true : false}
          />
          <TextField
            sx={{ width: "50%" }}
            variant="filled"
            label={formFields.email.label}
            type="email"
            value={formData.email.value}
            id={formFields.email.label}
            onChange={(e) => onChange("email", e.target)}
            error={formError.email ? true : false}
          />
        </SHBox>
        <SVBox gap={0} w={10} mb={5}>
          <TextField
            id={formFields.feedback.label}
            label={formFields.feedback.label}
            value={formData.feedback.value}
            multiline
            rows={4}
            placeholder="Escreva seu comentário aqui..."
            variant="filled"
            onChange={(e) => onChange("feedback", e.target)}
            error={formError.feedback ? true : false}
            sx={{ width: "100%" }}
            inputProps={{
              maxLength: feedbackMaxChars,
              style: { fontSize: 12 },
            }}
          />
          <Typography
            variant="small"
            sx={{
              fontSize: "10px",
              marginLeft: "auto",
            }}
          >
            {count} caracteres restantes
          </Typography>
        </SVBox>
        <Button type="submit" variant="contained" endIcon={<SendIcon />}>
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

export default FormTwo;
