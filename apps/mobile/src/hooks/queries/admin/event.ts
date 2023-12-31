import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { getEventDetail, getEventList, postEvent } from '../../../api/admin/event';
import { QUERIES_KEY } from '../../../core/common/queriesKey';
import { EventInfoType, EventListParamsType } from '../../../type/event';

export function useGetEventList(params: EventListParamsType) {
  const fetchEvents = async (pageParams: number) => {
    const response = await getEventList({ ...params, page: pageParams });

    return { response, nextPage: pageParams + 1 };
  };

  const { data, fetchNextPage, hasNextPage, ...restValues } = useInfiniteQuery(
    [QUERIES_KEY.GET_EVENT_LIST, params.limit],
    ({ pageParam = 1 }) => fetchEvents(pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.response.data[0]?.eventList.length === 0 ? undefined : lastPage.nextPage;
      },
      refetchOnWindowFocus: false,
    }
  );

  const eventListData = data?.pages.flatMap(
    (data) => data.response.data[0]?.eventList.map((eventInfo: EventInfoType) => eventInfo)
  );

  return {
    eventListData,
    fetchNextPage,
    hasNextPage,
    ...restValues,
  };
}

export function useGetEventDetail(eventId: number) {
  const { data: eventDetailData } = useQuery(['getEventDetail'], () => getEventDetail(eventId), {
    onError: (err) => {
      console.log(err);
    },
  });

  return { eventDetailData };
}

export function useUploadEvent() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (formData: FormData) => postEvent(formData),
    onSuccess: () => {},
    onError: () => {},
  });
  return {
    uploadEvent: mutate,
    ...restValues,
  };
}
