import axios from "axios";

export default async function ({ token, id }) {
  const config = {
    method: "get",
    url: `${process.env.URL_SERVER}/roomHasSchedule/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };
  const response = await axios(config)
    .then(function (response) {
      return {
        message: "Sala-Horário encontrado com sucesso",
        status: "success",
        data: response.data,
      };
    })
    .catch(function (error) {
      console.log(error)
      return {
        message: "Falha ao encontrar a Sala-Horário",
        status: "error",
        data: error.response?.data,
      };
    });
    return response;
}

