import axios from "axios";

// 모듈에 주소로 붙일 때 instance로 저장
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default instance;