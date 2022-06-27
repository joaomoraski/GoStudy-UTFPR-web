import axios from "axios";

export default async function ({ token, id_institute, number }) {
  let data = JSON.stringify({
    fk_id_institute: id_institute,
    number: number,
  });

  let config = {
    method: "post",
    url: process.env.URL_SERVER + "/room",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    data: data,
  };

  const response = await axios(config)
    .then(function (response) {
      return {
        message: "Sala criada com sucesso",
        status: "success",
        data: { ...response.data },
      };
    })
    .catch(function (error) {
      return {
        message: "Falha ao criar sala",
        status: "error",
        data: error.response.data,
      };
    });
  return response;
}
