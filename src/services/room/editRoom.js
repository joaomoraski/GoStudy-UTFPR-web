import axios from "axios";

export default async function ({ token, id, id_institute, number }) {
  let data = JSON.stringify({
    id: id,
    fk_id_institute: id_institute,
    number: number,
  });

  let config = {
    method: "put",
    url: process.env.URL_SERVER + `/room/${id}`,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    data: data,
  };

  const response = await axios(config)
    .then(function (response) {
      return {
        message: "Sala alterada com sucesso",
        status: "success",
        data: { ...response.data },
      };
    })
    .catch(function (error) {
      return {
        message: "Falha ao alterar sala",
        status: "error",
        data: error.response.data,
      };
    });
  return response;
}
