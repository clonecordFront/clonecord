import axios from 'axios';

function getHeaders() {
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  };

  return headers;
}

const instance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
export default instance;