import { MenuItem, Select } from "@mui/material";

function SelectComponent({
  value,
  onChange,
  error,
  labelID,
  label,
  id,
  options,
  ...props
}) {
  return (
    <Select
      value={value}
      onChange={onChange}
      error={error ? true : false}
      labelId="select-estado-civil"
      label="Estado Civil"
      id="estado-civil-select"
      sx={{ width: "100%", textAlign: "left" }}
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
