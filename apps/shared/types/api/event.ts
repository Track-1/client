export interface EventListParamsType {
  page: number;
  limit: number;
}

export interface EventInfoType {
  eventId: number;
  eventImageFile: string;
  eventTitle: string;
  eventDate: string;
  eventDday: string;
  eventInProgress: boolean;
  eventIntroduction?: string;
  eventNowOpen: boolean;
}

export interface EventListType {
  hasNextPage: boolean;
  eventList: EventInfoType[];
}
