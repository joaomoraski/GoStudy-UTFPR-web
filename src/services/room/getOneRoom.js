import axios from "axios";

export default async function ({ token, id }) {
  const config = {
    method: "get",
    url: `${process.env.URL_SERVER}/room/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  const response = await axios(config)
    .then(function (response) {
      return {
        message: "Sala encontrada com sucesso",
        status: "success",
        data: response.data,
      };
    })
    .catch(function (error) {
      console.log(error)
      return {
        message: "Falha ao encontrar a sala",
        status: "error",
        data: error.response?.data,
      };
    });
    return response;
}

