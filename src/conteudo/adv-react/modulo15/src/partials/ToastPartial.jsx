import { useContext } from "react";
import {
  Box,
  Button,
  ThemeContext,
  useCustomBreakpoint,
  useToast,
} from "../ds";

export default function ToastPartial(props) {
  const { toggleTheme } = useContext(ThemeContext);
  const { breakpointGTE } = useCustomBreakpoint("md");

  const primaryToast = useToast({});
  const successToast = useToast({ variant: "success" });
  const warningToast = useToast({
    variant: "warning",
  });
  const errorToast = useToast({
    variant: "error",
  });
  const promisedToastSuccess = useToast({
    variant: "promised",
    autoReject: false,
    promisedContents: {
      pending: "Carregando...",
      fullfilled: "Feito!",
      rejected: "Algo deu errado!",
    },
    callbackFn: () => toggleTheme(),
  });
  const promisedToastFailed = useToast({
    variant: "promised",
    autoReject: true,
    promisedContents: {
      pending: "Carregando...",
      fullfilled: "Feito!",
      rejected: "Algo deu errado!",
    },
  });

  return (
    <Box
      dir={breakpointGTE ? "row" : "column"}
      align={"center"}
      justify={"around"}
      wrap={"wrap"}
      sx={
        breakpointGTE
          ? `w-50 h4 mr-auto ml-auto mt4`
          : `w-75 h4 mr-auto ml-auto mt2`
      }
      gap={2}
    >
      <Button onClick={() => primaryToast()}>Primary Toast</Button>

      <Button variant={"secondary"} onClick={() => successToast()}>
        Success Toast
      </Button>

      <Button variant={"warning"} onClick={() => warningToast()}>
        Warning Toast
      </Button>

      <Button variant={"error"} onClick={() => errorToast()}>
        Error Toast
      </Button>

      <Button onClick={() => promisedToastSuccess()}>Promised Toast</Button>

      <Button onClick={() => promisedToastFailed()}>
        Promised Toast Error
      </Button>
    </Box>
  );
}
