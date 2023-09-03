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

export function useMyInfo() {
  //무한스크롤 미적용
}

export function useUploadProducerPortfolio() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (formData: FormData) => postProducerPortfolio(formData),
    onSuccess: () => {},
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
    onSuccess: () => {},
    onError: () => {},
  });
  return {
    uploadVocalPortfolio: mutate,
    ...restValues,
  };
}

export function useEditProducerPortfolio() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: ({ portfolioId, formData }: { portfolioId: number; formData: FormData }) =>
      patchProducerPortfolio(portfolioId, formData),
    onSuccess: () => {},
    onError: () => {},
  });
  return {
    editProducerPortfolio: mutate,
    ...restValues,
  };
}

export function useEditVocalPortfolio() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: ({ portfolioId, formData }: { portfolioId: number; formData: FormData }) =>
      patchVocalPortfolio(portfolioId, formData),
    onSuccess: () => {},
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
    onSuccess: () => {},
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
