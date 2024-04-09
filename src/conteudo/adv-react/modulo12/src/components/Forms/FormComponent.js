import { Alert, Box, Typography } from "@mui/material";
import SContainer from "../Styled/SContainer";
import SHBox from "../Styled/SHBox";
import SVBox from "../Styled/SVBox";
import { SH2 } from "../Styled/Style";

function FormComponent({
  submitData,
  formStatus,
  breakpoint,
  onSubmit,
  formResultTitle,
  children,
  ...props
}) {
  const submitDataComponent = (key, label, value) => {
    return (
      <Box key={`${key}-${label}`} xs={6} p={1} width={"fit-content"}>
        <Typography variant="h6" style={{ wordWrap: "break-word" }}>
          {label}: {value}
        </Typography>
      </Box>
    );
  };

  return (
    <>
      {formStatus && (
        <SHBox w={5} pt={5}>
          <Alert severity={formStatus}>
            {formStatus === "success"
              ? "Formulário enviado com sucesso!"
              : "Erro ao enviar o formulário. Verifique os campos em vermelho e tente novamente."}
          </Alert>
        </SHBox>
      )}

      <SContainer>
        <form onSubmit={onSubmit}>{children}</form>
        {formStatus === "success" && (
          <SVBox pt={4} gap={2} w={breakpoint ? 14 : 7}>
            <Box>
              <SH2>{formResultTitle}</SH2>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                width: "100%",
                textAlign: "left",
              }}
            >
              {Object.keys(submitData).map((key, idx) => {
                return submitDataComponent(
                  idx,
                  submitData[key].label,
                  submitData[key].fancyValue
                );
              })}
            </Box>
          </SVBox>
        )}
      </SContainer>
    </>
  );
}

export default FormComponent;
