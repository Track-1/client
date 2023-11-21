import {
  DefaultResponseType,
  ProducerInfoResponse,
  ProducerPortfolioResponse,
  ProducerVocalSearchingResponse,
  VocalInfoResponse,
  VocalProfileResponse,
} from "../type/api";
import { ProducerInfoParamsType, ProfileEditType, VocalInfoParamsType, VocalProfileEditType } from "../type/profile";
import { client } from "./common/client";
import { PROFILE } from "./path";

export async function getProducerProfile(params: ProducerInfoParamsType) {
  const { data } = await client.get<ProducerInfoResponse>(PROFILE.PRODUCER_PROFILE(params.userId), {
    params: {
      page: 1,
      limit: 1,
    },
  });

  return data.data;
}

export async function getProducerPortfolio(params: ProducerInfoParamsType) {
  const { data } = await client.get<ProducerPortfolioResponse>(PROFILE.PRODUCER_INFO(params.userId), {
    params: {
      page: params.page,
      limit: params.limit,
    },
  });

  return data.data.portfolioList;
}

export async function getProducerVocalSearching(params: ProducerInfoParamsType) {
  const { data } = await client.get<ProducerVocalSearchingResponse>(PROFILE.PRODUCER_INFO(params.userId), {
    params: {
      page: params.page,
      limit: params.limit,
    },
  });
  return data.data.trackList;
}

export async function getVocalProfile(params: VocalInfoParamsType) {
  const { data } = await client.get<VocalProfileResponse>(PROFILE.VOCAL_PROFILE(params.userId), {
    params: {
      page: 1,
      limit: 1,
    },
  });

  return data.data;
}

export async function getVocalInfo(params: VocalInfoParamsType) {
  const { data } = await client.get<VocalInfoResponse>(PROFILE.VOCAL_INFO(params.userId), {
    params: {
      page: params.page,
      limit: params.limit,
    },
  });

  return data.data;
}

export async function patchProducerProfile(editData: ProfileEditType) {
  const { data } = await client.patch<DefaultResponseType>(PROFILE.PATCH_PRODUCER, editData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function patchVocalProfile(editData: VocalProfileEditType) {
  const { data } = await client.patch<DefaultResponseType>(PROFILE.PATCH_VOCAL, editData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}
