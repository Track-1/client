import { DefaultResponseType, ProducerInfoResponse, VocalInfoResponse } from "../type/api";
import { ProducerInfoParamsType, VocalInfoParamsType } from "../type/profile";
import { client } from "./common/client";
import { PROFILE } from "./path";

export async function getProducerInfo(params: ProducerInfoParamsType) {
  const { data } = await client.get<ProducerInfoResponse>(PROFILE.PRODUCER_INFO(params.userId), {
    params: {
      page: params.page,
      limit: params.limit,
    },
  });
  return data;
}

export async function getVocalInfo(params: VocalInfoParamsType) {
  const { data } = await client.get<VocalInfoResponse>(PROFILE.VOCAL_INFO(params.userId), {
    params: {
      page: params.page,
      limit: params.limit,
    },
  });

  return data;
}

export async function patchProducerProfile(formData: FormData) {
  const { data } = await client.patch<DefaultResponseType>(PROFILE.PATCH_PRODUCER, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function patchVocalProfile(formData: FormData) {
  const { data } = await client.patch<DefaultResponseType>(PROFILE.PATCH_VOCAL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}
