import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function NaverCallback() {
  const navigate = useNavigate();
  const hasRequestedRef = useRef(false); // ref로 변경

  useEffect(() => {
    if (hasRequestedRef.current) return; // ref로 중복 방지
    hasRequestedRef.current = true; // 한 번만 실행

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');

    if (code && state) {
      axios.get('/api/auth/login/naver', { params: { code, state } })
        .then(res => {
          const { accessToken, refreshToken } = res.data.result;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          alert('로그인 성공');
          navigate('/');
        })
        .catch(() => {
          alert('로그인 실패');
          navigate('/login');
        });
    } else {
      alert('인가 코드가 없습니다.');
      navigate('/login');
    }
  }, [navigate]);

  return <div>로그인 중입니다...</div>;
}
