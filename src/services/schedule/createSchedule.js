import axios from "axios";

export default async function ({ token, label, initial_time, final_time }) {
  var data = JSON.stringify({
    label: label,
    initial_time: initial_time,
    final_time: final_time,
  });
  var config = {
    method: "post",
    url: process.env.URL_SERVER + "/schedule",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    data: data,
  };

  const response = await axios(config)
    .then(function (response) {
      return {
        message: "Horário criado com sucesso",
        status: "success",
        data: { ...response.data },
      };
    })
    .catch(function (error) {
      return {
        message: "Falha ao criar horário",
        status: "error",
        data: error.response.data,
      };
    });
  return response;
}
