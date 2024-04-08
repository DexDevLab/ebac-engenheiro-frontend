import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

function SelectComponent({
  value,
  onChange,
  error,
  labelID,
  label,
  id,
  refs,
  dependant = "0",
  options,
  ...props
}) {
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    dependant.toString().length > 0 ? setDisabled(false) : setDisabled(true);
  }, [dependant]);
  return (
    <Select
    ref={refs}
      value={value}
      onChange={onChange}
      error={error ? true : false}
      labelId={labelID}
      label={label}
      id={id}
      sx={{ minWidth: "100%", textAlign: "left"}}
      disabled={disabled}
      {...props}
    >
      {Array.from(options).map((item, idx) => {
        return (
          <MenuItem key={idx} value={item.value}>
            {item.label}
          </MenuItem>
        );
      })}
    </Select>
  );
}

export default SelectComponent;
