import axios from "axios";

export default async function ({
  token,
  id,
  id_institute,
  name,
  ra,
  telephone,
  email,
  password,
  isAdmin,
}) {
  let data = JSON.stringify({
    id: id,
    fk_id_institute: id_institute,
    name: name,
    ra: ra,
    telephone: telephone,
    email: email,
    password: password,
    isAdmin: isAdmin,
  });

  let config = {
    method: "put",
    url: process.env.URL_SERVER + `/user/${id}`,
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    data: data,
  };

  const response = await axios(config)
    .then(function (response) {
      return {
        message: "Usuário alterado com sucesso",
        status: "success",
        data: { ...response.data },
      };
    })
    .catch(function (error) {
      return {
        message: "Falha ao alterar usuário",
        status: "error",
        data: error.response.data,
      };
    });
  return response;
}
