import axios from "axios";

export default async function ({ token, id, idRoom, idSchedule }) {
  var data = JSON.stringify({
    id: id,
    fk_id_room: idRoom,
    fk_id_schedule: idSchedule,
  });

  var config = {
    method: "put",
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
        message: "Sala-Horário alterada com sucesso",
        status: "success",
        data: { ...response.data },
      };
    })
    .catch(function (error) {
      return {
        message: "Falha ao alterar Sala-Horário",
        status: "error",
        data: error.response.data,
      };
    });
  return response;
}
