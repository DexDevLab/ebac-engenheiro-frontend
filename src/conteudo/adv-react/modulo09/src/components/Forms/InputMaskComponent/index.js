import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";

function InputMaskComponent({
  value,
  id,
  onChange,
  mask,
  maskChar,
  error,
  variant,
  label,
  type,
  useMask,
  dependant,
  ...props
}) {
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    dependant.toString().length > 0 ? setDisabled(false) : setDisabled(true);
  }, [dependant]);
  return (
    <>
      {useMask ? (
        <InputMask
          disabled={disabled}
          value={value}
          id={id}
          onChange={onChange}
          mask={mask}
          maskChar={maskChar}
          {...props}
        >
          {(inputProps) => (
            <TextField
              {...inputProps}
              sx={{ width: "100%" }}
              error={error ? true : false}
              variant={variant}
              label={label}
              type={type}
            />
          )}
        </InputMask>
      ) : (
        <TextField
          disabled={disabled}
          sx={{ width: "100%" }}
          variant={variant}
          label={label}
          type={type}
          value={value}
          id={id}
          onChange={onChange}
          error={error ? true : false}
        />
      )}
    </>
  );
}

export default InputMaskComponent;
