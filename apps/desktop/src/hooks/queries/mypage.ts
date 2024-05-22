import useModal from '../common/useModal';
import useUpdateModal from '../common/useUpdateModal';
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
import { getProducerPortfolio } from '../../api/profile';
import { PortfoliosParamsType } from '../../type/vocals';
import { useQuery } from 'react-query';
import { getVocalProfile } from '../../api/profile';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { getProducerProfile } from '../../api/profile';
import { loginUserData } from '../../recoil/common/loginUserData';

export function useGetProducerProfile(userId: number) {
  const { data, ...restProps } = useQuery('getProducerProfile', () => getProducerProfile(), {
    onError: (err) => {
      console.log(err);
    },
  });

  return { data, ...restProps };
}

export function useGetProducerPortfolio(params: Omit<PortfoliosParamsType, 'page'>) {
  const { data, ...restValues } = useQuery('producerPortfolios', getProducerPortfolio);

  return {
    data: data?.portfolioList.data,
    ...restValues,
  };
}

export function useGetProducerVocalSearching(params: Omit<PortfoliosParamsType, 'page'>) {
  const { data, ...restValues } = useQuery('producerVocalSearchings', getProducerPortfolio);

  return {
    data: data?.trackList.data,
    ...restValues,
  };
}

export function useGetVocalPortfolio(params: Omit<PortfoliosParamsType, 'page'>) {
  const { data, ...restValues } = useQuery('vocalPortfolios', getVocalProfile);

  return {
    vocalPortfolios: data,
    ...restValues,
  };
}

export function useGetVocalProfile(userId: number) {
  const { data, ...restProps } = useQuery(['getVocalProfile'], getVocalProfile, {
    onError: (err) => {
      console.log(err);
    },
  });

  return { vocalProfile: data, ...restProps };
}

export function useUploadProducerPortfolio() {
  const navigate = useNavigate();
  const prevURL = useLocation().state?.prevURL;
  const userId = useRecoilValue(loginUserData).userId;

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
  const userId = useRecoilValue(loginUserData).userId;

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
    mutationFn: ({ trackId, uploadData }: { trackId: number; uploadData: FormData }) =>
      patchProducerPortfolio(trackId, uploadData),
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
    mutationFn: ({ trackId, uploadData }: { trackId: number; uploadData: FormData }) =>
      patchVocalPortfolio(trackId, uploadData),
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
    mutationFn: (portfolioId: string) => deleteProducerPortfolio(portfolioId),
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
    mutationFn: (portfoiloId: string) => deleteVocalPortfolio(portfoiloId),
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

export async function deleteFirstVocal(params: MyPageTitleParamsType, portfolioId: string) {
  await patchVocalTitle(params);
  return deleteVocalPortfolio(portfolioId);
}

export async function deleteFirstProducer(params: MyPageTitleParamsType, portfolioId: string) {
  await patchProducerTitle(params);
  return deleteProducerPortfolio(portfolioId);
}
