import { DefaultResponseType, EventDetailResponse, EventListResponse } from '../../type/api';
import { EventListParamsType } from '../../type/event';
import { getCookie } from '../../utils/common/cookie';
import { client } from '../common/client';
import { ADMIN } from '../path';

export async function getEventList(params: EventListParamsType) {
  const { data } = await client.get<EventListResponse>(ADMIN.EVENT, {
    params: {
      page: params.page,
      limit: params.limit,
    },
  });

  return data;
}

export async function getEventDetail(eventId: number) {
  const { data } = await client.get<EventDetailResponse>(ADMIN.EVENT_DETAIL(eventId));

  return data.data;
}

export async function postEvent(formData: FormData) {
  const { data } = await client.post<DefaultResponseType>(ADMIN.EVENT, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${getCookie('accessToken')}`,
    },
  });

  return data.data;
}
