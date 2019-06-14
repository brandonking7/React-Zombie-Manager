import axios from 'axios';

function init() {
  const api = axios.create({
    baseURL: 'http://localhost:4000'
  });

  return api;
}

export default init();
