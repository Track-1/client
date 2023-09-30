export interface CommentsParamsType {
  page: number;
  limit: number;
}

interface CommentsType {
  map(arg0: () => any): any;
  commentId: number;
  commentAudioFile: string;
  userName: string;
  userImageFile: string;
  userSelf: boolean;
  commentContent: string;
  commentAudioFileLength: number;
  commentUserId: number;
  commentAudioFileName: string;
}

export type CommentsListType = CommentsType[];
