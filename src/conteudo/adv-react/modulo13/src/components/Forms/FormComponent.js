import { Alert, Box, Typography } from "@mui/material";
import SContainer from "../Styled/SContainer";
import SHBox from "../Styled/SHBox";
import { SH2 } from "../Styled/Style";

function FormComponent({
  submitData,
  formStatus,
  alertMessage,
  onSubmit,
  showSubmittedData = true,
  showAlertMessage = true,
  formResultTitle,
  children,
  ...props
}) {

  const alertMsgComponent = () => {
    return formStatus === "success" ? (
      <>{alertMessage || "Formulário enviado com sucesso!"}</>
    ) : (
      <>
        "Erro ao enviar o formulário. Verifique os campos em vermelho e tente
        novamente."
      </>
    );
  };

  const submitDataComponent = (key, label, value) => {
    return (
      <Box key={`${key}-${label}`} p={1} width={"fit-content"}>
        <Typography
          variant="h6"
          sx={{
            fontSize: {
              mobile: "1rem",
              tablet: "1rem",
              laptop: "1.5rem",
              desktop: "1.2rem",
            },
          }}
          style={{ wordWrap: "break-word" }}
        >
          {label}: {value}
        </Typography>
      </Box>
    );
  };

  return (
    <>
      {formStatus && showAlertMessage && (
        <SHBox w={5} pt={5}>
          <Alert severity={formStatus}>{alertMsgComponent()}</Alert>
        </SHBox>
      )}

      <SContainer>
        <form onSubmit={(e) => onSubmit(e)}>{children}</form>
        {formStatus === "success" && (
          <Box
            pt={4}
            gap={2}
            sx={{
              maxWidth: ["100%", "100%", "80%", "60%"],
              marginX: "auto",
            }}
          >
            <Box>
              <SH2>{formResultTitle}</SH2>
            </Box>
            {showSubmittedData && submitData && (
              <Box
                sx={{
                  display: ["box", "flex"],
                  flexDirection: "row",
                  flexWrap: "wrap",
                  maxWidth: ["100%", "100%", "80%", "50%"],
                  marginX: "auto",
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
            )}
          </Box>
        )}
      </SContainer>
    </>
  );
}

export default FormComponent;
