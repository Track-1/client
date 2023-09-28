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

import { getVocalInfo } from "../../api/profile";
import { VocalsPortfoliosParamsType } from "../../type/vocals";

import { useQuery } from "react-query";
import { getVocalProfile } from "../../api/profile";

export function useGetVocalPortfolio(params: Omit<VocalsPortfoliosParamsType, "page">) {
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

  const vocalPortfolios = data?.pages.flatMap((data) => data.response.data.map((vocalPortfolio) => vocalPortfolio));

  return {
    vocalPortfolios,
    fetchNextPage,
    hasNextPage,
    ...restValues,
  };
}

export function useGetVocalProfile(userId: number) {
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
    },
  );

  return { vocalProfile };
}

export function useUploadProducerPortfolio() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (formData: FormData) => postProducerPortfolio(formData),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {},
  });
  return {
    uploadProducerPortfolio: mutate,
    ...restValues,
  };
}

export function useUploadVocalPortfolio() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (formData: FormData) => postVocalPortfolio(formData),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {},
  });
  return {
    uploadVocalPortfolio: mutate,
    ...restValues,
  };
}

export function useEditProducerPortfolio() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: ({ trackId, formData }: { trackId: number; formData: FormData }) =>
      patchProducerPortfolio(trackId, formData),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {},
  });
  return {
    editProducerPortfolio: mutate,
    ...restValues,
  };
}

export function useEditVocalPortfolio() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: ({ trackId, formData }: { trackId: number; formData: FormData }) =>
      patchVocalPortfolio(trackId, formData),
    onSuccess: (data) => {
      console.log(data);
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
