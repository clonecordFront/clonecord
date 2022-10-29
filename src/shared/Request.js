import axios from 'axios';

function getHeaders() {
  /* 1. token getter로 token을 변수에 받기 */
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  };
  /* 2. token을 받은 변수 체크해서 헤더에 담을지 말지 결정 */

  return headers;
}

const instance = axios.create({ baseURL: process.env.REACT_APP_API_URL });
export default instance;
