import { Box, Link } from "@mui/material";
import SVBox from "../components/Styled/SVBox";
import { SH2 } from "../components/Styled/Style";

export default function Home({ setLocation, ...props }) {
  return (
    <SVBox h={5}>
      <Box
        pt={"8rem"}
        width={"100%"}
        sx={{
          justifyContent: "center",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Link
          style={{ color: "inherit", textDecoration: "inherit", cursor: 'pointer' }}
          onClick={() => setLocation("formOne")}
        >
          <SH2>Formulário 1</SH2>
        </Link>

        <Link
          style={{ color: "inherit", textDecoration: "inherit", cursor: 'pointer' }}
          onClick={() => setLocation("formTwo")}
        >
          <SH2>Formulário 2</SH2>
        </Link>
      </Box>
    </SVBox>
  );
}
