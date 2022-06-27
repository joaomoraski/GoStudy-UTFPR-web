import axios from "axios";

export default async function ({ token, idRoom, idSchedule }) {
  var data = JSON.stringify({
    fk_id_room: idRoom,
    fk_id_schedule: idSchedule,
  });

  var config = {
    method: "post",
    url: process.env.URL_SERVER + "/roomHasSchedule",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    data: data,
  };

  const response = await axios(config)
    .then(function (response) {
      return {
        message: "Sala-Horário criado com sucesso",
        status: "success",
        data: { ...response.data },
      };
    })
    .catch(function (error) {
      return {
        message: "Falha ao criar Sala-Horário",
        status: "error",
        data: error.response.data,
      };
    });
  return response;
}
