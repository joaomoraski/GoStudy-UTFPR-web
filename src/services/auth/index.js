

import axios from 'axios'

export default async function({email, password}){
    var data = JSON.stringify({
    'email':email,
    "password": password
    });

    var config = {
    method: 'post',
    url: process.env.URL_SERVER+'/auth',
    headers: { 
        'Content-Type': 'application/json'
    },
    data : data
    };

    const response = await axios(config)
    .then(function (response) {
        return {message:"Autenticação feita com sucesso",status:"success", data:{...response.data}}
    })
    .catch(function (error) {
        return {message:"Falha na autenticação", status:"error", data: error.response.data }
    });
    return response
}