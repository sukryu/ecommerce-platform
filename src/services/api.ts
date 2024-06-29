import axios from 'axios';

const Authapi = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true, // 모든 요청에 대해 쿠키를 포함합니다.
});

// 응답 인터셉터 추가
Authapi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // 리프레시 토큰을 사용하여 새 액세스 토큰 요청
        await Authapi.post('/auth/refresh-token');
        // 새 토큰으로 원래 요청 재시도
        return Authapi(originalRequest);
      } catch (refreshError) {
        // 리프레시 실패 시 로그아웃 처리
        // 여기에 로그아웃 로직 구현 (예: 로컬 상태 초기화, 리다이렉트 등)
        throw refreshError;
      }
    }
    return Promise.reject(error);
  }
);

export default Authapi;