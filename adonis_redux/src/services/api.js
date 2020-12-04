import axios from 'axios';

import store from '~/store';

const api = axios.create({
  baseURL: 'http://10.0.3.2:3333',
});

// adicionando um interceptor na requisição

api.interceptors.request.use((config) => {
  // pegando o token do auth

  const {token} = store.getState().auth;

  const {active: team} = store.getState().teams;

  // pegando todos os headers que eu já tenho na requisição

  const headers = {...config.headers};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (team) {
    headers.TEAM = team.slug;
  }

  return {...config, headers};
});

export default api;
