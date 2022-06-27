import axios from "axios";

export default async function ({ token, id }) {
  var data = JSON.stringify({
    id: id,
  });

  var config = {
    method: "delete",
    url: process.env.URL_SERVER + `/roomHasSchedule/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    data: data,
  };

  const response = await axios(config)
    .then(function (response) {
      return {
        message: "Sala-Horário excluída com sucesso",
        status: "success",
        data: { ...response.data },
      };
    })
    .catch(function (error) {
      return {
        message: "Falha ao excluir Sala-Horário",
        status: "error",
        data: error.response.data,
      };
    });
  return response;
}
