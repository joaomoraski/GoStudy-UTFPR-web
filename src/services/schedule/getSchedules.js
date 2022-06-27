import axios from "axios";

export default async function ({ token }) {
  const config = {
    method: "get",
    url: `${process.env.URL_SERVER}/schedule`,
    headers: {
      Authorization: token,
    },
  };
  const response = await axios(config)
    .then(function (response) {
      return {
        message: "Lista de horários encontrada com sucesso",
        status: "success",
        data: [...response.data],
      };
    })
    .catch(function (error) {
      return {
        message: "Falha ao encontrar horários",
        status: "error",
        data: error.response.data,
      };
    });
  return response;
}
