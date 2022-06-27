import axios from "axios";

export default async function ({
  token,
  id_institute,
  name,
  ra,
  telephone,
  email,
  password,
  isAdmin,
}) {
  let data = JSON.stringify({
    fk_id_institute: id_institute,
    name: name,
    ra: ra,
    telephone: telephone,
    email: email,
    password: password,
    isAdmin: isAdmin,
  });

  let config = {
    method: "post",
    url: process.env.URL_SERVER + "/user",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    data: data,
  };

  const response = await axios(config)
    .then(function (response) {
      return {
        message: "Usuário criado com sucesso",
        status: "success",
        data: { ...response.data },
      };
    })
    .catch(function (error) {
      return {
        message: "Falha ao criar usuário",
        status: "error",
        data: error.response.data,
      };
    });
  return response;
}
