import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "react-query";
import { deleteEvent, getEventDetail, getEventList, patchEvent, postEvent } from "../../../api/admin/event";
import { QUERIES_KEY } from "../../../core/common/queriesKey";
import { EditEventInfoType, EventInfoType, EventListParamsType } from "../../../type/event";
import { useNavigate } from "react-router-dom";

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
        return lastPage.response.data[0].eventList.length === 0 ? undefined : lastPage.nextPage;
      },
      refetchOnWindowFocus: false,
    },
  );

  const eventListData = data?.pages.flatMap((data) =>
    data.response.data[0].eventList.map((eventInfo: EventInfoType) => eventInfo),
  );

  return {
    eventListData,
    fetchNextPage,
    hasNextPage,
    ...restValues,
  };
}

export function useGetEventDetail(eventId: number) {
  const { data: eventDetailData } = useQuery(["getEventDetail"], () => getEventDetail(eventId), {
    onError: (err) => {
      console.log(err);
    },
    enabled: eventId !== -1,
  });

  return { eventDetailData };
}

export function useUploadEvent() {
  const navigate = useNavigate();

  const { mutate, ...restValues } = useMutation({
    mutationFn: (formData: FormData) => postEvent(formData),
    onSuccess: () => {
      navigate(-1);
    },
    onError: () => {},
  });
  return {
    uploadEvent: mutate,
    ...restValues,
  };
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  const { mutate, ...restValues } = useMutation({
    mutationFn: (eventId: number) => deleteEvent(eventId),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES_KEY.GET_EVENT_LIST);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return {
    deleteEvent: mutate,
    ...restValues,
  };
}

export function usePatchEvent() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, ...restValues } = useMutation({
    mutationFn: (eventInfo: EditEventInfoType) => patchEvent(eventInfo),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES_KEY.GET_EVENT_LIST);
      navigate(-1);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return {
    patchEvent: mutate,
    ...restValues,
  };
}
