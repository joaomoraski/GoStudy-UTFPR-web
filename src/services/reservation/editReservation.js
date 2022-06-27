import axios from "axios";

export default async function ({
  id,
  token,
  id_room,
  id_user,
  id_schedule,
  reservationDate,
}) {
  let data = JSON.stringify({
    id: id,
    fk_id_room: id_room,
    fk_id_user: id_user,
    fk_id_schedule: id_schedule,
    reservationDate: reservationDate,
  });

  let config = {
    method: "put",
    url: process.env.URL_SERVER + `/reservation/${id}`,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    data: data,
  };

  const response = await axios(config)
    .then(function (response) {
      return {
        message: "Reserva alterada com sucesso",
        status: "success",
        data: { ...response.data },
      };
    })
    .catch(function (error) {
      return {
        message: "Falha ao alterar reserva",
        status: "error",
        data: error.response.data,
      };
    });
  return response;
}
