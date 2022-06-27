import axios from "axios";

export default async function ({
  token,
  id,
}) {
  let data = JSON.stringify({
    id: id,
  });

  let config = {
    method: "delete",
    url: process.env.URL_SERVER + `/user/${id}`,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    data: data,
  };

  const response = await axios(config)
    .then(function (response) {
      return {
        message: "Usuário excluído com sucesso",
        status: "success",
        data: { ...response.data },
      };
    })
    .catch(function (error) {
      return {
        message: "Falha ao excluir usuário",
        status: "error",
        data: error.response.data,
      };
    });
  return response;
}
