import axios from "axios";

export default async function ({ token }) {
  const config = {
    method: "get",
    url: `${process.env.URL_SERVER}/user`,
    headers: {
      Authorization: token,
    },
  };

  const response = await axios(config)
    .then(function (response) {
      return {
        message: "Usuários encontrados com sucesso",
        status: "success",
        data: [...response.data ],
      };
    })
    .catch(function (error) {
      return {
        message: "Falha ao encontrar usuários",
        status: "error",
        data: error.response.data,
      };
    });
  return response;
}
