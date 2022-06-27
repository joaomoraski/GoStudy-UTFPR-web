import axios from "axios";

export default async function ({ token, id }) {
  var config = {
    method: "delete",
    url: process.env.URL_SERVER + `/institute/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  const response = await axios(config)
    .then(function (response) {
      return {
        message: "Instituição excluida com sucesso",
        status: "success",
        data: { ...response.data },
      };
    })
    .catch(function (error) {
      return {
        message: "Falha ao excluir instituição",
        status: "error",
        data: error.response.data,
      };
    });
  return response;
}
