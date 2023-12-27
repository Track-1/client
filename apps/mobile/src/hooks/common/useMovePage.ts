import { useNavigate } from 'react-router-dom';

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

  return { navigate, handleMovePage };
}
