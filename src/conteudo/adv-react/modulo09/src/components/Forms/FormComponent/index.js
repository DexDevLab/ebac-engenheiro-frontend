import { Alert, Box, Typography } from "@mui/material";
import SContainer from "../../Styled/SContainer";
import SHBox from "../../Styled/SHBox";
import SVBox from "../../Styled/SVBox";
import { SH2 } from "../../Styled/Style";

function FormComponent({
  formFields,
  formData,
  setFormData,
  formError,
  setFormError,
  submitData,
  setSubmitData,
  formStatus,
  setFormStatus,
  dependants = undefined,
  breakpoint,
  children,
  ...props
}) {
  const submitDataComponent = (key, label, value) => {
    return (
      <Box key={`${key}-${label}`} xs={6} p={1} width={1}>
        <Typography variant="h6" style={{ wordWrap: "break-word" }}>
          {label}: {value}
        </Typography>
      </Box>
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      setFormStatus("success");
      setSubmitData({ ...formData });
      const resetFormData = {};
      Object.keys(formFields).forEach((key) => {
        Object.assign(resetFormData, {
          [key]: {
            label: "",
            value: "",
          },
        });
      });
      setFormData({ ...resetFormData });
    } else {
      setFormStatus("error");
    }
  };

  const isValid = () => {
    const isValid = {};
    Object.keys(formFields).forEach((key) => {
      if (dependants) {
        Object.assign(isValid, {
          [key]: !formFields[key].isValid(
            formData[key].value,
            formData[dependants[1]]
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
        <form onSubmit={onSubmit}>{children}</form>
        {submitData && (
          <SVBox pt={5} gap={2} w={breakpoint ? 14 : 7}>
            <Box>
              <SH2>Dados do Formulário</SH2>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
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
            </Box>
            {/* <Grid
                mt={5}
                mx={"auto"}
                container
                direction={breakpoint ? "row" : "column"}
                spacing={1}
                columnSpacing={3}
                sx={{
                  width: "100%",
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
              </Grid> */}
          </SVBox>
        )}
      </SContainer>
    </>
  );
}

export default FormComponent;
