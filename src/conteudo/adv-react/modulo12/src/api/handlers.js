export async function handler(method, params) {
  const corsServer =
    "https://nextjs-proxy-cors-19iayec1j-dexdevlab.vercel.app/api/cors?url=";
  const baseUrl = "http://veiculos.fipe.org.br/api/veiculos/";
  const param = {};
  const response = {};

  const apiFetch = async (param) => {
    const data = await fetch(param.url, {
      method: "POST",
      headers: {
        Host: "veiculos.fipe.org.br",
        Referer: "http://veiculos.fipe.org.br",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param.body),
    }).then((res) => {
      return res.json();
    });

    return data;
  };

  switch (method) {
    case "fetchFIPECode":
      Object.assign(param, {
        url: corsServer + baseUrl + "ConsultarTabelaDeReferencia",
      });
      const fetchData = await apiFetch(param);
      Object.assign(response, fetchData[0]);
      break;
    case "fetchMarcas":
      Object.assign(param, {
        url: corsServer + baseUrl + "ConsultarMarcas",
        body: params,
      });
      Object.assign(response, await apiFetch(param));
      break;
    case "fetchModelos":
      Object.assign(param, {
        url: corsServer + baseUrl + "ConsultarModelos",
        body: params,
      });
      Object.assign(response, await apiFetch(param));
      break;
    case "fetchAnoModelo":
      Object.assign(param, {
        url: corsServer + baseUrl + "ConsultarAnoModelo",
        body: params,
      });
      Object.assign(response, await apiFetch(param));
      break;
    case "fetchValorFipe":
      Object.assign(param, {
        url: corsServer + baseUrl + "ConsultarValorComTodosParametros",
        body: params,
      });
      Object.assign(response, await apiFetch(param));
      break;
    default:
      break;
  }

  return response;
}
