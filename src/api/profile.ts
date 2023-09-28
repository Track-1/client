import { DefaultResponseType, ProducerInfoResponse, VocalInfoResponse, VocalProfileResponse } from "../type/api";
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

export async function getProducerInfo(params: ProducerInfoParamsType) {
  const { data } = await client.get<ProducerInfoResponse>(PROFILE.PRODUCER_INFO(params.userId), {
    params: {
      page: params.page,
      limit: params.limit,
    },
  });
  return data;
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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YWJsZU5hbWUiOiJwcm9kdWNlciIsInVzZXJJZCI6MywiaWF0IjoxNjkyMjAwMDkxLCJleHAiOjE2OTczODQwOTF9.3WlB_9XRaf0_rGC3J8iY6qHkSOU7nMUL-YXO-_cIFH0`,
    },
  });
  return data;
}

export async function patchVocalProfile(editData: VocalProfileEditType) {
  const { data } = await client.patch<DefaultResponseType>(PROFILE.PATCH_VOCAL, editData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YWJsZU5hbWUiOiJ2b2NhbCIsInVzZXJJZCI6MSwiaWF0IjoxNjkyMTkzMzM3LCJleHAiOjE2OTczNzczMzd9.ORQNliZNoDmNF4S8KsmPnfkmN4QkUqLONKQQukX-za8`,
    },
  });
  return data;
}
