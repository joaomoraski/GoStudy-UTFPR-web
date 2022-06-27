import axios from "axios";

export default async function ({ token, id, label, initial_time, final_time }) {
  var data = JSON.stringify({
    id: id,
    label: label,
    initial_time: initial_time,
    final_time: final_time,
  });
  var config = {
    method: "delete",
    url: process.env.URL_SERVER + `/schedule/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    data: data,
  };

  const response = await axios(config)
    .then(function (response) {
      return {
        message: "Horário excluído com sucesso",
        status: "success",
        data: { ...response.data },
      };
    })
    .catch(function (error) {
      return {
        message: "Falha ao excluir horário",
        status: "error",
        data: error.response.data,
      };
    });
  return response;
}
