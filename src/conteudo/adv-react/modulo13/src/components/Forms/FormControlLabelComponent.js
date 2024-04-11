import { FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";

function FormControlLabelComponent({ value, control, label, error, ...props }) {
  const [errorColor, setErrorColor] = useState("");
  useEffect(() => {
    error ? setErrorColor("red") : setErrorColor("");
  }, [error]);

  return (
    <FormControlLabel
      value={value}
      control={control}
      label={label}
      sx={{
        color: errorColor,
      }}
    />
  );
}

export default FormControlLabelComponent;
