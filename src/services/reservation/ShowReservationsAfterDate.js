import axios from "axios";

export default async function ({ token, idRoom, reservationDate}) {
  const config = {
    method: "get",
    url: `${process.env.URL_SERVER}/reservation/filter/afterDate/${idRoom}&${reservationDate}`,
    headers: {
      Authorization: token,
    },
  };
  const response = await axios(config)
    .then(function (response) {
      return {
        message: "ShowReservationsAfterDate encontrada com sucesso",
        status: "success",
        data: [...response.data],
      };
    })
    .catch(function (error) {
      return {
        message: "Falha ao encontrar ShowReservationsAfterDate",
        status: "error",
        data: error.response.data,
      };
    });
  return response;
}
