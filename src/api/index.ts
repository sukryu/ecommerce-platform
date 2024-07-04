import axios from 'axios';
import { API_CONFIG } from './common/constants/api-url.config';

const Authapi = axios.create({
  baseURL: API_CONFIG.AUTH_URL,
  withCredentials: true,  // 모든 요청에 대해 쿠키 포함
});

// 요청 인터셉터
Authapi.interceptors.request.use(
  (config) => {
    // 필요한 경우 여기에서 요청을 수정할 수 있습니다.
    // 예: CSRF 토큰 추가 등
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
Authapi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 여기에서 공통적인 에러 처리를 할 수 있습니다.
    // 예: 401 에러 시 로그인 페이지로 리다이렉트 등
    if (error.response && error.response.status === 401) {
      // 인증 에러 처리
      console.log('Authentication error');
      // 로그인 페이지로 리다이렉트 또는 다른 처리
    }
    return Promise.reject(error);
  }
);

export default Authapi;