import { useMutation, useQueryClient } from 'react-query';
import {
  deleteProducerPortfolio,
  deleteVocalPortfolio,
  patchProducerPortfolio,
  patchProducerTitle,
  patchVocalPortfolio,
  patchVocalTitle,
  postProducerPortfolio,
  postVocalPortfolio,
} from '../../api/mypage';
import { MyPageTitleParamsType } from '../../type/mypage';

import { useInfiniteQuery } from 'react-query';

import { getProducerPortfolio, getProducerVocalSearching, getVocalInfo } from '../../api/profile';
import { PortfoliosParamsType } from '../../type/vocals';

import { useQuery } from 'react-query';
import { getVocalProfile } from '../../api/profile';

import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { getProducerProfile } from '../../api/profile';
import { loginUserId } from '../../recoil/common/loginUserData';
import useModal from '../common/useModal';
import useUpdateModal from '../common/useUpdateModal';

export function useGetProducerProfile(userId: number) {
  const { data: producerProfile, ...restProps } = useQuery(
    'getProducerProfile',
    () =>
      getProducerProfile({
        userId: userId,
        page: 1,
        limit: 1,
      }),
    {
      onError: (err) => {
        // console.log(err);
      },
      enabled: userId > 0,
    }
  );

  return { producerProfile, ...restProps };
}

export function useGetProducerPortfolio(params: Omit<PortfoliosParamsType, 'page'>) {
  const fetchVocals = async (pageParams: number) => {
    const response = await getProducerPortfolio({ ...params, page: pageParams, userId: params.userId });

    return { response, nextPage: pageParams + 1 };
  };

  const { data, fetchNextPage, hasNextPage, ...restValues } = useInfiniteQuery(
    'producerPortfolios',
    ({ pageParam = 1 }) => fetchVocals(pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.response.data.length === 0 ? undefined : lastPage.nextPage;
      },
    }
  );

  const producerPortfolios = data?.pages.flatMap((data) =>
    data.response.data.filter((producerPortfolio: any) => producerPortfolio)
  );

  return {
    producerPortfolios,
    fetchNextPage,
    hasNextPage,
    ...restValues,
  };
}

export function useGetProducerVocalSearching(params: Omit<PortfoliosParamsType, 'page'>) {
  const fetchVocals = async (pageParams: number) => {
    const response = await getProducerVocalSearching({ ...params, page: pageParams, userId: params.userId });

    return { response, nextPage: pageParams + 1 };
  };

  const { data, fetchNextPage, hasNextPage, ...restValues } = useInfiniteQuery(
    'producerVocalSearchings',
    ({ pageParam = 1 }) => fetchVocals(pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.response.data.length === 0 ? undefined : lastPage.nextPage;
      },
    }
  );

  const producerVocalSearchings = data?.pages.flatMap((data) =>
    data.response.data.filter((producerVocalSearching: any) => producerVocalSearching)
  );

  return {
    producerVocalSearchings,
    fetchNextPage,
    hasNextPage,
    ...restValues,
  };
}

export function useGetVocalPortfolio(params: Omit<PortfoliosParamsType, 'page'>) {
  const fetchVocals = async (pageParams: number) => {
    const response = await getVocalInfo({ ...params, page: pageParams, userId: params.userId });

    return { response, nextPage: pageParams + 1 };
  };

  const { data, fetchNextPage, hasNextPage, ...restValues } = useInfiniteQuery(
    'vocalPortfolios',
    ({ pageParam = 1 }) => fetchVocals(pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.response.data.length === 0 ? undefined : lastPage.nextPage;
      },
    }
  );

  const vocalPortfolios = data?.pages.flatMap((data) => data.response.data.filter((vocalPortfolio) => vocalPortfolio));

  return {
    vocalPortfolios,
    fetchNextPage,
    hasNextPage,
    ...restValues,
  };
}

export function useGetVocalProfile(userId: number) {
  const { data: vocalProfile, ...restProps } = useQuery(
    ['getVocalProfile'],
    () =>
      getVocalProfile({
        userId: userId,
        page: 1,
        limit: 1,
      }),
    {
      onError: (err) => {
        console.log(err);
        alert(userId);
      },
      enabled: userId > 0,
    }
  );

  return { vocalProfile, ...restProps };
}

export function useUploadProducerPortfolio() {
  const navigate = useNavigate();
  const prevURL = useLocation().state?.prevURL;
  const userId = useRecoilValue(loginUserId);

  const { mutate, ...restValues } = useMutation({
    mutationFn: (formData: FormData) => postProducerPortfolio(formData),
    onSuccess: () => {
      setTimeout(() => {
        if (prevURL === '/signup/success') {
          navigate(`/producer-profile/${userId}`, {
            state: {
              prevURL: '/track-search',
            },
          });
        } else {
          navigate(-1);
        }
      }, 3000);
    },
    onError: () => {},
  });
  return {
    uploadProducerPortfolio: mutate,
    ...restValues,
  };
}

export function useUploadVocalPortfolio() {
  const navigate = useNavigate();
  const prevURL = useLocation().state?.prevURL;
  const userId = useRecoilValue(loginUserId);

  const { mutate, ...restValues } = useMutation({
    mutationFn: (formData: FormData) => postVocalPortfolio(formData),
    onSuccess: () => {
      setTimeout(() => {
        if (prevURL === '/signup/success') {
          navigate(`/vocal-profile/${userId}`, {
            state: {
              prevURL: '/vocal-search',
            },
          });
        } else {
          navigate(-1);
        }
      }, 3000);
    },
    onError: () => {},
  });
  return {
    uploadVocalPortfolio: mutate,
    ...restValues,
  };
}

export function useEditProducerPortfolio() {
  const navigate = useNavigate();
  const { mutate, ...restValues } = useMutation({
    mutationFn: ({ trackId, formData }: { trackId: number; formData: FormData }) =>
      patchProducerPortfolio(trackId, formData),
    onSuccess: () => {
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    },
    onError: () => {},
  });
  return {
    editProducerPortfolio: mutate,
    ...restValues,
  };
}

export function useEditVocalPortfolio() {
  const navigate = useNavigate();

  const { mutate, ...restValues } = useMutation({
    mutationFn: ({ trackId, formData }: { trackId: number; formData: FormData }) =>
      patchVocalPortfolio(trackId, formData),
    onSuccess: () => {
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    },
    onError: () => {},
  });
  return {
    editVocalPortfolio: mutate,
    ...restValues,
  };
}

export function useEditProducerTitle() {
  const { unShowModal: unShowUpdateModal } = useUpdateModal();
  const { unShowModal } = useModal();
  const queryClient = useQueryClient();

  const { mutate, ...restValues } = useMutation({
    mutationFn: (params: MyPageTitleParamsType) => patchProducerTitle(params),
    onSuccess: () => {
      alert('The title song has been changed.\n타이틀 곡이 변경되었습니다.');
      queryClient.invalidateQueries('producerVocalSearchings');
      queryClient.invalidateQueries('producerPortfolios');

      unShowModal();
      unShowUpdateModal();
    },
    onError: () => {},
  });
  return {
    editProducerTitle: mutate,
    ...restValues,
  };
}

export function useEditVocalTitle() {
  const { unShowModal } = useUpdateModal();
  const queryClient = useQueryClient();

  const { mutate, ...restValues } = useMutation({
    mutationFn: (params: MyPageTitleParamsType) => patchVocalTitle(params),
    onSuccess: () => {
      alert('The title song has been changed.\n타이틀 곡이 변경되었습니다.');
      queryClient.invalidateQueries('vocalPortfolios');
      unShowModal();
    },
    onError: () => {},
  });
  return {
    editVocalTitle: mutate,
    ...restValues,
  };
}

export function useDeleteProducerPortfolio() {
  const { unShowModal: unShowUpdateModal } = useUpdateModal();
  const { unShowModal } = useModal();
  const queryClient = useQueryClient();

  const { mutate, ...restValues } = useMutation({
    mutationFn: (portfolioId: number) => deleteProducerPortfolio(portfolioId),
    onSuccess: () => {
      queryClient.invalidateQueries('producerVocalSearchings');
      queryClient.invalidateQueries('producerPortfolios');
      unShowModal();
      unShowUpdateModal();
    },
    onError: () => {},
  });
  return {
    deleteProducerPortfolio: mutate,
    ...restValues,
  };
}

export function useDeleteVocalPortfolio() {
  const { unShowModal } = useUpdateModal();
  const queryClient = useQueryClient();

  const { mutate, ...restValues } = useMutation({
    mutationFn: (portfoiloId: number) => deleteVocalPortfolio(portfoiloId),
    onSuccess: () => {
      queryClient.invalidateQueries('vocalPortfolios');
      unShowModal();
    },
    onError: () => {},
  });
  return {
    deleteVocalPortfolio: mutate,
    ...restValues,
  };
}

export async function deleteFirstVocal(params: MyPageTitleParamsType, portfolioId: number) {
  await patchVocalTitle(params);
  return deleteVocalPortfolio(portfolioId);
}

export async function deleteFirstProducer(params: MyPageTitleParamsType, portfolioId: number) {
  await patchProducerTitle(params);
  return deleteProducerPortfolio(portfolioId);
}
