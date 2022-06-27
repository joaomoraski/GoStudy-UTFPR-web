import axios from "axios";

export default async function ({
  id,
  token,
  name,
  city,
  telephone,
  openingTime,
  closingTime,
}) {
  var data = JSON.stringify({
    id: id,
    name: name,
    city: city,
    telephone: telephone,
    openingTime: openingTime,
    closingTime: closingTime,
  });
  var config = {
    method: "put",
    url: process.env.URL_SERVER + `/institute/${id}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    data: data,
  };

  const response = await axios(config)
    .then(function (response) {
      return {
        message: "Instituição alterada com sucesso",
        status: "success",
        data: { ...response.data },
      };
    })
    .catch(function (error) {
      return {
        message: "Falha ao alterar instituição",
        status: "error",
        data: error.response.data,
      };
    });
  return response;
}
