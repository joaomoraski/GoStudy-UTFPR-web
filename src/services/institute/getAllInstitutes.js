import axios from "axios";

export default async function ({ token }) {
  const config = {
    method: "get",
    url: `${process.env.URL_SERVER}/institute`,
    headers: {
      Authorization: token ,
    },
  };
  const response = await axios(config)
    .then(function (response) {
      return {
        message: "Lista de Câmpus encontrado com sucesso",
        status: "success",
        data: [...response.data],
      };
    })
    .catch(function (error) {
      return {
        message: "Falha ao encontrar institutos",
        status: "error",
        data: error.response.data,
      };
    });
  return response;
}
