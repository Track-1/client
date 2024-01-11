import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../../utils/common/check';

type PagePathType =
  | 'home'
  | 'event'
  | 'about'
  | 'login'
  | 'signup'
  | 'track-search'
  | 'track-post'
  | 'vocal-search'
  | 'profile'
  | 'vocal-profile'
  | 'producer-profile';

export function useMovePage() {
  const navigate = useNavigate();

  function handleMovePage(pagePath: PagePathType, parameter?: number) {
    if (pagePath === 'home') {
      navigate('/');
      return;
    }

    parameter ? navigate(`/${pagePath}/${parameter}`) : navigate(`/${pagePath}`);
  }

  function checkUserPermission() {
    if (!isLoggedIn()) {
      alert('Please use this function after logging in.\n해당 기능은 로그인 후 이용해주세요.');
      navigate('/login');
      return false;
    }
    return true;
  }

  return { navigate, handleMovePage, checkUserPermission };
}

export function handleMovePage() {}
