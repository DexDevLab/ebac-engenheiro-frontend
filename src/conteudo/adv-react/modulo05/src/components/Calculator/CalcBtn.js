import { Box } from "@mui/material";
import SButton from "../Styled/SButton";

function CalcBtn({ label, color, w, h, onClick, btnRef, activeKey, ...props }) {
  return (
    <Box width={w || "70px"} margin={"4px"}>
      <SButton
        activekey={(label === activeKey).toString()}
        ref={btnRef}
        onClick={onClick}
        variant="contained"
        fullWidth
        sx={{
          backgroundColor: color || "white",
          ":hover": {
            backgroundColor: "#61dafb",
          },
          border: "1px solid black",
          color: color ? "white" : "black",
          fontWeight: "bold",
          height: h,
        }}
        color={color}
        {...props}
      >
        {label}
      </SButton>
    </Box>
  );
}

export default CalcBtn;
