import axios from 'axios';

/* Headers Generator */
function getHeaders() {
  const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
  };

  return headers;
}

/* Create Instance */
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: getHeaders(),
});

/* Instance Interceptors */
instance.interceptors.request.use(
  (config) => {},
  (error) => {}
);
instance.interceptors.response.use(
  (response) => {},
  (error) => {
    const code = error.code;
    //const status = error.response?.status;

    if (code === 'ECONNABORTED' || error.status === 408) {
      alert('요청이 만료되었습니다.');
    }
    return Promise.reject(error);
  }
);

export default instance;