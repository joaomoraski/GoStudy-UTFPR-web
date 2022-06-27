import axios from "axios";

export default async function ({ token, id }) {
  const config = {
    method: "get",
    url: `${process.env.URL_SERVER}/institute/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  const response = await axios(config)
    .then(function (response) {
      return {
        message: "Câmpus encontrado com sucesso",
        status: "success",
        data: response.data,
      };
    })
    .catch(function (error) {
      console.log(error)
      return {
        message: "Falha ao encontrar o câmpus",
        status: "error",
        data: error.response?.data,
      };
    });
    return response;
}

