import axios from 'axios';

/* import * as customData from './../data/portfolio.json';
const portData = customData.data; */

/* Copiei o arquivo JSON da api, coloquei local na aplicação e rodei o Json Server

	Instalamos a biblioteca globalmente
	$ yarn add -g json-server

	Depois rodamos o comando:
	$ json-server --watch src/data/portfolio.json --p 3333

 */

// Setando url base para acesso ao backend
const api = axios.create({
  baseURL: 'http://localhost:3000/data',
});

export default api;
