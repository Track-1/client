import { useMutation } from "react-query";
import {
  deleteProducerPortfolio,
  deleteVocalPortfolio,
  patchProducerPortfolio,
  patchProducerTitle,
  patchVocalPortfolio,
  patchVocalTitle,
  postProducerPortfolio,
  postVocalPortfolio,
} from "../../api/mypage";
import { MyPageTitleParamsType } from "../../type/mypage";

import { useInfiniteQuery } from "react-query";

import { getProducerPortfolio, getProducerVocalSearching, getVocalInfo } from "../../api/profile";
import { PortfoliosParamsType } from "../../type/vocals";

import { useQuery } from "react-query";
import { getVocalProfile } from "../../api/profile";

import { getProducerProfile } from "../../api/profile";
import { ROLE } from "../../core/common/roleType";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginUserId } from "../../recoil/common/loginUserData";

export function useGetProducerProfile(userId: number, userType?: string) {
  const { data: producerProfile } = useQuery(
    "getProducerProfile",
    () =>
      getProducerProfile({
        userId: userId,
        page: 1,
        limit: 1,
      }),
    {
      onError: (err) => {
        console.log(err);
      },
      enabled: userType === undefined || userType === ROLE.PRODUCER,
    },
  );

  return { producerProfile };
}

export function useGetProducerPortfolio(params: Omit<PortfoliosParamsType, "page">) {
  const fetchVocals = async (pageParams: number) => {
    const response = await getProducerPortfolio({ ...params, page: pageParams, userId: params.userId });

    return { response, nextPage: pageParams + 1 };
  };

  const { data, fetchNextPage, hasNextPage, ...restValues } = useInfiniteQuery(
    "producerPortfolios",
    ({ pageParam = 1 }) => fetchVocals(pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.response.data.length === 0 ? undefined : lastPage.nextPage;
      },
    },
  );

  const producerPortfolios = data?.pages.flatMap((data) =>
    data.response.data.filter((producerPortfolio: any) => producerPortfolio),
  );

  return {
    producerPortfolios,
    fetchNextPage,
    hasNextPage,
    ...restValues,
  };
}

export function useGetProducerVocalSearching(params: Omit<PortfoliosParamsType, "page">) {
  const fetchVocals = async (pageParams: number) => {
    const response = await getProducerVocalSearching({ ...params, page: pageParams, userId: params.userId });

    return { response, nextPage: pageParams + 1 };
  };

  const { data, fetchNextPage, hasNextPage, ...restValues } = useInfiniteQuery(
    "producerVocalSearchings",
    ({ pageParam = 1 }) => fetchVocals(pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.response.data.length === 0 ? undefined : lastPage.nextPage;
      },
    },
  );

  const producerVocalSearchings = data?.pages.flatMap((data) =>
    data.response.data.filter((producerVocalSearching: any) => producerVocalSearching),
  );

  return {
    producerVocalSearchings,
    fetchNextPage,
    hasNextPage,
    ...restValues,
  };
}

export function useGetVocalPortfolio(params: Omit<PortfoliosParamsType, "page">) {
  const fetchVocals = async (pageParams: number) => {
    const response = await getVocalInfo({ ...params, page: pageParams, userId: params.userId });

    return { response, nextPage: pageParams + 1 };
  };

  const { data, fetchNextPage, hasNextPage, ...restValues } = useInfiniteQuery(
    "vocalPortfolios",
    ({ pageParam = 1 }) => fetchVocals(pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.response.data.length === 0 ? undefined : lastPage.nextPage;
      },
    },
  );

  const vocalPortfolios = data?.pages.flatMap((data) => data.response.data.filter((vocalPortfolio) => vocalPortfolio));

  return {
    vocalPortfolios,
    fetchNextPage,
    hasNextPage,
    ...restValues,
  };
}

export function useGetVocalProfile(userId: number, userType?: string) {
  const { data: vocalProfile } = useQuery(
    ["getVocalProfile"],
    () =>
      getVocalProfile({
        userId: userId,
        page: 1,
        limit: 1,
      }),
    {
      onError: (err) => {
        console.log(err);
      },
      enabled: userType === undefined || userType === ROLE.VOCAL,
    },
  );

  return { vocalProfile };
}

export function useUploadProducerPortfolio() {
  const navigate = useNavigate();
  const prevURL = useLocation().state?.prevURL;
  const userId = useRecoilValue(loginUserId);

  const { mutate, ...restValues } = useMutation({
    mutationFn: (formData: FormData) => postProducerPortfolio(formData),
    onSuccess: () => {
      setTimeout(() => {
        if (prevURL === "/signup/success") {
          navigate(`/producer-profile/${userId}`, {
            state: {
              prevURL: "/track-search",
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
  const { mutate, ...restValues } = useMutation({
    mutationFn: (formData: FormData) => postVocalPortfolio(formData),
    onSuccess: (data) => {
      setTimeout(() => {
        navigate(-1);
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
  const { mutate, ...restValues } = useMutation({
    mutationFn: (params: MyPageTitleParamsType) => patchProducerTitle(params),
    onSuccess: () => {},
    onError: () => {},
  });
  return {
    editProducerTitle: mutate,
    ...restValues,
  };
}

export function useEditVocalTitle() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (params: MyPageTitleParamsType) => patchVocalTitle(params),
    onSuccess: () => {
      alert("The title song has been changed.\n타이틀 곡이 변경되었습니다.");
    },
    onError: () => {},
  });
  return {
    editVocalTitle: mutate,
    ...restValues,
  };
}

export function useDeleteProducerPortfolio() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (portfolioId: number) => deleteProducerPortfolio(portfolioId),
    onSuccess: () => {},
    onError: () => {},
  });
  return {
    deleteProducerPortfolio: mutate,
    ...restValues,
  };
}

export function useDeleteVocalPortfolio() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (portfoiloId: number) => deleteVocalPortfolio(portfoiloId),
    onSuccess: () => {},
    onError: () => {},
  });
  return {
    deleteVocalPortfolio: mutate,
    ...restValues,
  };
}
