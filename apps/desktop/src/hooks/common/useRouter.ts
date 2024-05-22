import { stringify } from 'qs';
import { generatePath, useNavigate } from 'react-router';
import { DYNAMIC_ROUTES, STATIC_ROUTES } from '../../core/common/routes';

type Values<T extends object> = T[keyof T];
type StaticPath = Values<typeof STATIC_ROUTES>;
type DynamicPath = Values<typeof DYNAMIC_ROUTES>;
type PathParams<T extends string> = Parameters<typeof generatePath<T>>[1];
type RouterPush = {
  (path: StaticPath, options?: { search?: unknown }): void;
  <T extends DynamicPath>(path: T, options: { params: PathParams<T>; search?: unknown }): void;
};

const useRouter = () => {
  const navigate = useNavigate();

  const push: RouterPush = <T extends string>(path: T, options?: { params?: PathParams<T>; search?: unknown }) => {
    const { search, params } = options ?? {};

    navigate({
      pathname: generatePath(path, params),
      search: search ? stringify(search, { indices: false }) : undefined,
    });
  };

  return { push };
};

export { useRouter };
