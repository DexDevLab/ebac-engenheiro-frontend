import SendIcon from "@mui/icons-material/Send";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormComponent from "../components/Forms/FormComponent";
import SVBox from "../components/Styled/SVBox";
import useForm from "../hooks/useForm";

function FormTwo({ ...props }) {
  const navigate = useNavigate();
  const feedbackMaxChars = 200;
  const [count, setCount] = useState(feedbackMaxChars);

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
    email: {
      label: "Email",
      dependant: "nome",
      clears: [],
      isValid: function (value, dependant) {
        return value.toString().match("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")
          ? true
          : false;
      },
    },
    feedback: {
      label: "Comentário",
      dependant: "email",
      clears: [],
      isValid: function (value, dependant) {
        return value.toString().length > 0 ? true : false;
      },
    },
  };

  const [onChange, onSubmit, formData, formError, formStatus, submitData] =
    useForm(formFields);

  const customSubmit = (e) => {
    onSubmit(e);
    setCount(feedbackMaxChars);
  };

  return (
    <>
      <SVBox pt={3} h={5}>
        <Typography variant="h6">
          Formulário 2 - Questionário de Feedback
        </Typography>
      </SVBox>
      <FormComponent
        submitData={submitData}
        formStatus={formStatus}
        onSubmit={(e) => customSubmit(e)}
      >
        <Box
          sx={{
            display: ["box", "flex"],
            maxWidth: ["100%", "100%", "80%", "45%"],
            marginX: "auto",
          }}
          my={6}
        >
          <SVBox pt={0} h={1}>
            <Typography variant="h6">
              Conte para nós sua experiência conosco!
            </Typography>
          </SVBox>
        </Box>
        <SVBox gap={2}>
          <TextField
            sx={{ width: ["unset", "50%", "40%", "20%"] }}
            variant="filled"
            label={formFields.nome.label}
            type="text"
            value={formData.nome.value}
            id={formFields.nome.label}
            onChange={(e) => onChange("nome", e.target)}
            error={formError.nome ? true : false}
          />
          <TextField
            sx={{ width: ["unset", "50%", "40%", "20%"] }}
            variant="filled"
            label={formFields.email.label}
            type="email"
            value={formData.email.value}
            id={formFields.email.label}
            onChange={(e) => onChange("email", e.target)}
            error={formError.email ? true : false}
          />
        </SVBox>
        <SVBox gap={0} pt={2}>
          <TextField
            id={formFields.feedback.label}
            label={formFields.feedback.label}
            value={formData.feedback.value}
            multiline
            rows={4}
            placeholder="Escreva seu comentário aqui..."
            variant="filled"
            onChange={(e) => {
              onChange("feedback", e.target);
              setCount(feedbackMaxChars - e.target.value.toString().length);
            }}
            error={formError.feedback ? true : false}
            sx={{ width: ["64%", "50%", "40%", "20%"] }}
            inputProps={{
              maxLength: feedbackMaxChars,
              style: { fontSize: 12 },
            }}
          />
        </SVBox>
        <SVBox
          gap={0}
          mb={4}
          justify={"end"}
          sx={{ width: ["64%", "50%", "40%", "20%"] }}
        >
          <Typography
            variant="small"
            sx={{
              fontSize: "10px",
              textAlign: "right",
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
          onClick={() => navigate(-1)}
        >
          Voltar
        </Button>
      </FormComponent>
    </>
  );
}

export default FormTwo;
