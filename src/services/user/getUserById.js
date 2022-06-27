import axios from "axios";

export default async function ({ token, id }) {
  const config = {
    method: "get",
    url: `${process.env.URL_SERVER}/user/${id}`,
    headers: {
      Authorization: token,
    },
  };
  const response = await axios(config)
    .then(function (response) {
      return {
        message: "Usuário encontrado com sucesso",
        status: "success",
        data: response.data ,
      };
    })
    .catch(function (error) {
      console.log(error)
      return {
        message: "Falha ao encontrar usuário",
        status: "error",
        data: error.response.data,
      };
    });
  return response;
}
