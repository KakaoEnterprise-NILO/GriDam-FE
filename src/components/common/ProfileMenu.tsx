import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function ProfileMenu() {
  const { logoutUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (err) {
      alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
      console.error('로그아웃 실패:', err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoggedIn) {
    return (
      <div className="relative" ref={dropdownRef}>
        <div
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-300">
            <img src="/logo.png" alt="프로필" className="w-full h-full object-cover" />
          </div>
          <ChevronDownIcon className="w-5 h-5 text-gray-600" />
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-lg z-10">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={() => (window.location.href = '/login')}
      className="flex items-center space-x-2 px-3 py-2 border rounded-lg hover:bg-gray-100"
    >
      <img src="/logo.png" alt="로그인 아이콘" className="w-5 h-5" />
      <span className="text-sm font-semibold text-gray-800">로그인</span>
    </button>
  );
}
