import { useState } from "react";
import { TbShoppingCartFilled } from "react-icons/tb";
import {
  Box,
  Button,
  Heading,
  ImageComponent,
  Navbar,
  Text,
  useModal,
  useToast,
} from "../ds";

export default function NavbarPartial(props) {
  const [cartCount, setCartCount] = useState(3);

  const paymentToast = useToast({
    variant: "promised",
    autoReject: false,
    promisedContents: {
      pending: "Processando seu pagamento...",
      fullfilled: "Pagamento concluído!",
      rejected: "Algo deu errado!",
    },
  });

  const cartList = [
    {
      name: "Calça Capri",
      option: "Tamanho M",
      price: "300",
    },
    {
      name: "Pendrive Fancy",
      option: "Azul",
      price: "350",
    },
    {
      name: "Câmera Pi",
      option: "Pro Xtreme",
      price: "1000",
    },
  ];

  const BrandLogo = () => {
    return (
      <ImageComponent
        type={"svg"}
        sx={"h-75"}
        style={{
          width: "40px",
        }}
      />
    );
  };

  const cartOnClick = () => {
    open();
  };

  const paymentOnClick = () => {
    paymentToast();
  };

  const CartComponent = () => {
    return (
      <>
        <Box
          dir={"column"}
          align={"center"}
          justify={"between"}
          wrap={"wrap"}
          style={{
            width: "100%",
            backgroundColor: "red",
            height: "fit-content",
          }}
        >
          <Box
            dir={"column"}
            align={"left"}
            style={{
              width: "100%",
              height: "fit-content",
              backgroundColor: "blue",
            }}
          >
            <Heading
              sx={"f4 ma0 mb3"}
              style={{
                color: "black",
              }}
            >
              Calça Capri
            </Heading>
            <Text
              sx={"ma0"}
              style={{
                color: "black",
              }}
            >
              Tamanho M
            </Text>
            <Box
            dir={"row"}
            align={"center"}
            justify={"between"}
            style={{
              width: "100%",
              height: "fit-content",
              backgroundColor: "purple",
            }}
          >
            <Text
              style={{
                color: "black",
              }}
            >
              R$ 300,00
            </Text>
            <Text style={{ fontWeight: "bold", color: "black" }}>
              Seletor
            </Text>
          </Box>
            <Heading
              sx={"f4 ma0 mb3"}
              style={{
                color: "black",
              }}
            >
              Pendrive Fancy
            </Heading>
            <Text
              style={{
                color: "black",
              }}
              sx={"ma0"}
            >
              Azul
            </Text>
            <Box
            dir={"row"}
            align={"center"}
            justify={"between"}
            style={{
              width: "100%",
              height: "fit-content",
              backgroundColor: "purple",
            }}
          >
            <Text
              style={{
                color: "black",
              }}
            >
              R$ 350,00
            </Text>
            <Text style={{ fontWeight: "bold", color: "black" }}>
              Seletor
            </Text>
          </Box>
            <Heading
              sx={"f4 ma0 mb3"}
              style={{
                color: "black",
              }}
            >
              Câmera Pi
            </Heading>
            <Text
              sx={"ma0"}
              style={{
                color: "black",
              }}
            >
              Pro Xtreme
            </Text>
            <Box
            dir={"row"}
            align={"center"}
            justify={"between"}
            style={{
              width: "100%",
              height: "fit-content",
              backgroundColor: "purple",
            }}
          >
            <Text
              style={{
                color: "black",
              }}
            >
              R$ 1000,00
            </Text>
            <Text style={{ fontWeight: "bold", color: "black" }}>
              Seletor
            </Text>
          </Box>
          </Box>
          <Box
            dir={"row"}
            align={"center"}
            justify={"between"}
            gap={1}
            style={{
              width: "100%",
              height: "fit-content",
              backgroundColor: "green",
            }}
          >
            <Text style={{ fontWeight: "bold", color: "black" }}>
              Total das compras
            </Text>
            <Text style={{ fontWeight: "bold", color: "black" }}>
              R$ 3000,00
            </Text>
          </Box>
          <Box
            dir={"row"}
            justify={"around"}
            style={{
              height: "fit-content",
              padding: "10px",
            }}
          >
            <Button onClick={() => paymentOnClick()}>Ir para Pagamento</Button>
          </Box>
        </Box>
      </>
    );
  };

  const { ModalComponent, isOpen, open } = useModal({
    modalTitle: "Meu Carrinho",
    modalContent: CartComponent(),
  });

  const CartIconComponent = () => {
    return (
      <Box
        dir={"row"}
        justify={"between"}
        sx={"w2"}
        style={{
          position: "relative",
          cursor: "pointer",
        }}
        onClick={() => cartOnClick()}
      >
        <Box
          dir={"column"}
          justify={"center"}
          sx={"w1 p0 m0 h1 bg-warning br-100"}
          style={{
            position: "absolute",
            left: "25px",
            top: "-4px",
            display: cartCount > 0 ? "flex" : "none",
          }}
        >
          <Text
            style={{
              fontSize: "12px",
              fontWeight: "bold",
              color: "black",
            }}
            sx={"m0 p0 pt1"}
            variant={"sm"}
          >
            {cartCount}
          </Text>
        </Box>

        <TbShoppingCartFilled size={30} />
      </Box>
    );
  };

  return (
    <>
      <Navbar
        brandLogo={BrandLogo()}
        options={CartIconComponent()}
        itemList={[
          {
            label: "Menu 1",
            link: undefined,
          },
          {
            label: "Menu 2",
            link: undefined,
          },
          {
            label: "Menu 3",
            link: undefined,
          },
        ]}
      />
      {ModalComponent()}
    </>
  );
}
