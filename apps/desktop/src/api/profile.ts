import {
  DefaultResponseType,
  ProducerInfoResponse,
  ProducerPortfolioResponse,
  ProducerVocalSearchingResponse,
  VocalInfoResponse,
  VocalProfileResponse,
} from '../type/api';
import { LoginUserDataType } from '../type/common/userType';
import { ProfileEditType, VocalInfoParamsType, VocalProfileEditType } from '../type/profile';
import { client } from './common/client';
import { PROFILE } from './path';

export async function getProducerProfile() {
  const { data } = await client.get<ProducerInfoResponse>(PROFILE.PRODUCER_PROFILE);

  return data.data;
}

export async function getProducerPortfolio() {
  const { data } = await client.get<ProducerPortfolioResponse>(PROFILE.PRODUCER_INFO);

  return data.data;
}

export async function getProducerVocalSearching() {
  const { data } = await client.get<ProducerVocalSearchingResponse>(PROFILE.PRODUCER_INFO);
  return data.data.trackList;
}

export async function getVocalProfile() {
  const { data } = await client.get<VocalProfileResponse>(PROFILE.VOCAL_PROFILE);

  return data.data;
}

export async function getVocalInfo(params: VocalInfoParamsType) {
  const { data } = await client.get<VocalInfoResponse>(PROFILE.VOCAL_INFO, {
    params: {
      page: params.page,
      limit: params.limit,
    },
  });

  return data.data;
}

export async function patchProducerProfile(editData: ProfileEditType) {
  const { data } = await client.patch<DefaultResponseType<LoginUserDataType>>(PROFILE.PATCH_PRODUCER, editData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}

export async function patchVocalProfile(editData: VocalProfileEditType) {
  const { data } = await client.patch<DefaultResponseType<LoginUserDataType>>(PROFILE.PATCH_VOCAL, editData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}
