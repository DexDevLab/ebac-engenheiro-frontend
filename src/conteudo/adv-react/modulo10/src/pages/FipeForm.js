import SendIcon from "@mui/icons-material/Send";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { handler } from "../api/handlers";
import FormComponent from "../components/Forms/FormComponent";
import SelectComponent from "../components/Forms/SelectComponent";
import SHBox from "../components/Styled/SHBox";
import SVBox from "../components/Styled/SVBox";

function FipeForm({ setLocation, ...props }) {
  const theme = useTheme();
  const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));

  const formFields = {
    tipo: {
      label: "Tipo de Veículo",
      dependant: "",
      clears: ["all"],
      isValid: function (value, dependant) {
        return value.toString().length > 0 ? true : false;
      },
    },
    marca: {
      label: "Marca",
      dependant: "tipo",
      clears: ["modelo, anoModelo"],
      isValid: function (value, dependant) {
        return dependant.value.toString().length > 0 &&
          value.toString().length > 0
          ? true
          : false;
      },
    },
    modelo: {
      label: "Modelo",
      dependant: "marca",
      clears: ["anoModelo"],
      isValid: function (value, dependant) {
        return dependant.value.toString().length > 0 &&
          value.toString().length > 0
          ? true
          : false;
      },
    },
    anoModelo: {
      label: "Ano Modelo",
      dependant: "modelo",
      clears: [],
      isValid: function (value, dependant) {
        return dependant.value.toString().length > 0 &&
          value.toString().length > 0
          ? true
          : false;
      },
    },
  };

  const formErrorFromFields = {};
  const formDataFromFields = {};

  Object.keys(formFields).forEach((key) => {
    Object.assign(formErrorFromFields, { [key]: false });
    Object.assign(formDataFromFields, {
      [key]: {
        label: "",
        value: "",
      },
    });
  });

  const [formError, setFormError] = useState({ ...formErrorFromFields });
  const [formData, setFormData] = useState({ ...formDataFromFields });
  const [codModelo, setCodModelo] = useState([]);
  const [fipeCode, setFipeCode] = useState({});
  const [submitData, setSubmitData] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const [fetchStatus, setFetchStatus] = useState("");
  const [marcas, setMarcas] = useState([
    {
      label: "Obtendo marcas...",
      value: "Obtendo marcas...",
    },
  ]);
  const [modelos, setModelos] = useState([
    {
      label: "Obtendo modelos...",
      value: "Obtendo modelos...",
    },
  ]);
  const [anoModelo, setAnoModelo] = useState([
    {
      label: "Obtendo anos modelos...",
      value: "Obtendo anos modelos...",
    },
  ]);

  const resetFetchData = () => {
    setFormData({ ...formDataFromFields });
    setMarcas([
      {
        label: "Obtendo marcas...",
        value: "Obtendo marcas...",
      },
    ]);
    setModelos([
      {
        label: "Obtendo modelos...",
        value: "Obtendo modelos...",
      },
    ]);
    setAnoModelo([
      {
        label: "Obtendo anos modelos...",
        value: "Obtendo anos modelos...",
      },
    ]);
  };

  const onChange = (label, target) => {
    validate(label, target.value);
    if (formFields[label].clears.length > 0) {
      if (formFields[label].clears[0].includes("all")) {
        resetFetchData();
      } else {
        formFields[label].clears.forEach((item) => {
          setFormData({
            ...formData,
            [item]: { label: "", value: "", fancyValue: "" },
          });
        });
      }
    }
    setFormData({
      ...formData,
      [label]: {
        label: target.id,
        value: target.value,
        fancyValue: target.label,
      },
    });
    setFormStatus("");
    setSubmitData("");
  };

  const validate = (label, value) => {
    if (formFields[label].dependant.length > 0) {
      setFormError({
        ...formError,
        [label]: !formFields[label].isValid(
          value,
          formData[formFields[label].dependant]
        ),
      });
    } else {
      setFormError({
        ...formError,
        [label]: !formFields[label].isValid(value, null),
      });
    }
  };

  const isValid = () => {
    const isValid = {};
    Object.keys(formFields).forEach((key) => {
      if (formFields[key].dependant.length > 0) {
        Object.assign(isValid, {
          [key]: !formFields[key].isValid(
            formData[key].value,
            formData[formFields[key].dependant]
          ),
        });
      } else {
        Object.assign(isValid, {
          [key]: !formFields[key].isValid(formData[key].value, null),
        });
      }
    });
    setFormError({ ...isValid });
    return !(Object.values(isValid).indexOf(true) >= 0);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      fetchData("submit");
      resetFetchData();
    } else {
      setFormStatus("error");
    }
  };

  const fetchData = async (field) => {
    const dataArr = [];
    const formArr = [];
    switch (field) {
      case "tipo":
        dataArr.push(
          await handler("fetchMarcas", {
            codigoTabelaReferencia: fipeCode.Codigo,
            codigoTipoVeiculo: Number(formData.tipo.value),
          })
        );
        Object.keys(dataArr[0]).forEach((key) => {
          formArr.push({
            label: dataArr[0][key].Label,
            value: dataArr[0][key].Value,
          });
        });
        setMarcas(formArr);
        break;
      case "marca":
        dataArr.push(
          await handler("fetchModelos", {
            codigoTabelaReferencia: fipeCode.Codigo,
            codigoTipoVeiculo: Number(formData.tipo.value),
            codigoMarca: Number(formData.marca.value),
          })
        );
        Object.keys(dataArr[0].Modelos).forEach((key) => {
          formArr.push({
            label: dataArr[0].Modelos[key].Label,
            value: dataArr[0].Modelos[key].Value,
          });
        });
        setModelos(formArr);
        break;
      case "modelo":
        dataArr.push(
          await handler("fetchAnoModelo", {
            codigoTabelaReferencia: fipeCode.Codigo,
            codigoTipoVeiculo: Number(formData.tipo.value),
            codigoMarca: Number(formData.marca.value),
            codigoModelo: Number(formData.modelo.value),
          })
        );
        Object.keys(dataArr[0]).forEach((key) => {
          formArr.push({
            label: dataArr[0][key].Label,
            value: dataArr[0][key].Value,
            fancyValue: dataArr[0][key].Value.split("-")[0],
          });
        });
        setAnoModelo(formArr);
        break;
      case "anoModelo":
        setCodModelo(formData.anoModelo.value.split("-"));
        break;
      case "submit":
        dataArr.push(
          await handler("fetchValorFipe", {
            codigoTabelaReferencia: fipeCode.Codigo,
            codigoTipoVeiculo: Number(formData.tipo.value),
            codigoMarca: Number(formData.marca.value),
            ano: formData.anoModelo.value,
            codigoTipoCombustivel: Number(codModelo[1]),
            anoModelo: Number(codModelo[0]),
            codigoModelo: Number(formData.modelo.value),
            tipoConsulta: "tradicional",
          })
        );
        setSubmitData({
          ...formData,
          valorFipe: {
            label: "Valor",
            value: dataArr[0].Valor,
            fancyValue: dataArr[0].Valor,
          },
        });
        break;
      default:
        if (Object.keys(fipeCode).length === 0) {
          const data = await handler("fetchFIPECode", null);
          setFipeCode(data);
        }
        break;
    }
  };

  useEffect(() => {
    try {
      if (formData) {
        fetchData();
      }
      Object.keys(formData).forEach((key) => {
        if (formData[key].value) {
          fetchData(key);
        }
      });
      if (submitData) {
        setFormStatus("success");
      }
    } catch (error) {
      setFetchStatus({ status: "error", error: error.message.toString() });
      console.log(error.message);
    }
  }, [formData, submitData]);

  return (
    <>
      <SVBox pt={2} h={5}>
        <Typography variant="h6">Tabela FIPE</Typography>
      </SVBox>
      {fetchStatus && (
        <SHBox w={5} pt={10}>
          <Alert severity={fetchStatus.status}>
            {fetchStatus.status === "error" &&
              `Falha na API. Tente novamente. (${fetchStatus.error})`}
          </Alert>
        </SHBox>
      )}
      <FormComponent
        submitData={submitData}
        formStatus={formStatus}
        breakpoint={greaterThanMid}
        onSubmit={onSubmit}
        formResultTitle={`Valor Tabela FIPE - Referência ${fipeCode.Mes}`}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: greaterThanMid ? "row" : "column",
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: greaterThanMid ? "50rem" : "100%",
            textAlign: "left",
            paddingBottom: "1rem",
            paddingTop: "4rem",
            marginX: "auto",
          }}
        >
          <Box
            sx={{
              paddingX: "1rem",
              paddingBottom: "1rem",
            }}
          >
            <FormControl sx={{ width: greaterThanMid ? "20rem" : "100%" }}>
              <InputLabel id="select-label-tipo" sx={{ width: "100%" }}>
                Tipo
              </InputLabel>
              <SelectComponent
                value={formData.tipo.value}
                onChange={(e, index) =>
                  onChange("tipo", {
                    id: formFields.tipo.label,
                    label: index.props.children,
                    value: e.target.value,
                  })
                }
                error={formError.tipo}
                labelId="select-tipo"
                label={formFields.tipo.label}
                id="tipo-select"
                options={[
                  {
                    label: "Carro",
                    value: "1",
                  },
                  {
                    label: "Moto",
                    value: "2",
                  },
                  {
                    label: "Caminhão",
                    value: "3",
                  },
                ]}
              />
            </FormControl>
          </Box>

          <Box
            sx={{
              paddingX: "1rem",
              paddingBottom: "1rem",
            }}
          >
            <FormControl sx={{ width: greaterThanMid ? "20rem" : "100%" }}>
              <InputLabel
                id="select-label-marca"
                sx={{ width: "100%", textAlign: "left" }}
              >
                Marca
              </InputLabel>
              <SelectComponent
                value={formData.marca.value}
                onChange={(e, index) =>
                  onChange("marca", {
                    id: formFields.marca.label,
                    label: index.props.children,
                    value: e.target.value,
                  })
                }
                error={formError.marca}
                labelId="select-marca"
                label={formFields.marca.label}
                id="marca-select"
                options={marcas}
                dependant={formData.tipo.value}
              />
            </FormControl>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: greaterThanMid ? "row" : "column",
            flexWrap: "wrap",
            justifyContent: "space-between",
            width: greaterThanMid ? "50rem" : "100%",
            textAlign: "left",
            marginX: "auto",
          }}
        >
          <Box
            sx={{
              paddingX: "1rem",
              paddingBottom: "3rem",
            }}
          >
            <FormControl sx={{ width: greaterThanMid ? "20rem" : "100%" }}>
              <InputLabel
                id="select-label-modelo"
                sx={{ width: "100%", textAlign: "left" }}
              >
                Modelo
              </InputLabel>
              <SelectComponent
                value={formData.modelo.value}
                onChange={(e, index) =>
                  onChange("modelo", {
                    id: formFields.modelo.label,
                    label: index.props.children,
                    value: e.target.value,
                  })
                }
                error={formError.modelo}
                labelId="select-modelo"
                label={formFields.modelo.label}
                id="modelo-select"
                options={modelos}
                dependant={formData.marca.value}
              />
            </FormControl>
          </Box>

          <Box
            sx={{
              paddingX: "1rem",
              paddingBottom: "1rem",
            }}
          >
            <FormControl sx={{ width: greaterThanMid ? "20rem" : "100%" }}>
              <InputLabel
                id="select-label-anoModelo"
                sx={{ width: "100%", textAlign: "left" }}
              >
                Ano Modelo
              </InputLabel>
              <SelectComponent
                dependant={formData.modelo.value}
                value={formData.anoModelo.value}
                onChange={(e, index) =>
                  onChange("anoModelo", {
                    id: formFields.anoModelo.label,
                    label: index.props.children,
                    value: e.target.value,
                  })
                }
                error={formError.anoModelo}
                labelId="select-anoModelo"
                label={formFields.tipo.label}
                id="anoModelo-select"
                options={anoModelo}
              />
            </FormControl>
          </Box>
        </Box>

        <Button
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
          sx={{
            margin: "10px",
          }}
        >
          Enviar
        </Button>
      </FormComponent>
    </>
  );
}

export default FipeForm;
