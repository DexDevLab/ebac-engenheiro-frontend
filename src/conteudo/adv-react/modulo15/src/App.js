import { Box, Heading, useCustomBreakpoint } from "./ds";
import {
  BoxPartial,
  ButtonPartial,
  HeadingPartial,
  HyperlinkPartial,
  ImageComponentPartial,
  ModalPartial,
  NavbarPartial,
  SwitchPartial,
  TextPartial,
  ThemeSwitchPartial,
  ToastPartial,
  ToggleThemeButtonPartial,
} from "./partials";

export default function App() {
  const { current, breakpointGTE } = useCustomBreakpoint("md");

  return (
    <>
      <NavbarPartial />

      <Box
        dir="column"
        align={"center"}
        justify={"around"}
        wrap={"nowrap"}
        sx={"h-100 w-100 mb2"}
      >
        <Heading sx={!breakpointGTE ? "f3" : ""}>DS Design System</Heading>
        <Heading>{current.toString()}</Heading>

        <ModalPartial />

        <HyperlinkPartial />

        <ToggleThemeButtonPartial />

        <SwitchPartial />

        <ThemeSwitchPartial />

        <ButtonPartial />

        <ToastPartial />

        <HeadingPartial />

        <TextPartial />

        <ModalPartial />

        <ImageComponentPartial />

        <BoxPartial />

        <ModalPartial />
      </Box>
    </>
  );
}

//TODO SEPARATOR PARA DIVIDIR OS ITENS DO CARRINHO
//TODO ITERAR EM ARRAY
//TODO SELETOR NUMÉRICO
//TODO LISTA DO CARRINHO (EM MODAL)
//TODO CONTAINER (ESTILO COM BORDA E SOMBRA ETC)
//TODO CAROUSEL
//TODO TEXTINPUT
//TODO SELECT
//TODO CHECKBOX
//TODO FORMULARIO
