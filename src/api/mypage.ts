import { DefaultResponseType, MyInfoResponse } from "../type/api";
import { MyPageTitleParamsType } from "../type/mypage";
import { ParamsType } from "../type/profile";
import { client } from "./common/client";
import { MYPAGE } from "./path";

export async function getMyInfo(params: ParamsType) {
  const { data } = await client.get<MyInfoResponse>(MYPAGE.INFO, {
    params: {
      page: params.page,
      limit: params.limit,
    },
  });
  return data;
}

export async function postProducerPortfolio(uploadData: FormData) {
  const { data } = await client.post<DefaultResponseType>(MYPAGE.UPLOAD_PRODUCER_PORTFOLIO, uploadData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function postVocalPortfolio(uploadData: FormData) {
  const { data } = await client.post<DefaultResponseType>(MYPAGE.UPLOAD_VOCAL_PORTFOLIO, uploadData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function patchProducerPortfolio(trackId: number, uploadData: FormData) {
  const { data } = await client.patch<DefaultResponseType>(MYPAGE.PATCH_PRODUCER_PORTFOLIO(trackId), uploadData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function patchVocalPortfolio(trackId: number, uploadData: FormData) {
  const { data } = await client.patch<DefaultResponseType>(MYPAGE.PATCH_VOCAL_PORTFOLIO(trackId), uploadData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function patchProducerTitle(params: MyPageTitleParamsType) {
  const { data } = await client.patch(`${MYPAGE.PATCH_PRODUDCER_TITLE}bef=${params.bef}&aft=${params.aft}`);
  return data;
}

export async function patchVocalTitle(params: MyPageTitleParamsType) {
  const { data } = await client.patch(`${MYPAGE.PATCH_VOCAL_TITLE}bef=${params.bef}&aft=${params.aft}`);
  return data;
}

export async function deleteProducerPortfolio(portfolioId: number) {
  const { data } = await client.delete(MYPAGE.DELETE_PRODUCER_PORTFOLIO(portfolioId));
  return data;
}

export async function deleteVocalPortfolio(portfolioId: number) {
  const { data } = await client.delete(MYPAGE.DELETE_VOCAL_PORTFOLIO(portfolioId));
  return data;
}
