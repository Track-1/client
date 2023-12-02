export interface CommentsParamsType {
  page: number;
  limit: number;
}

interface CommentsType {
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

export type CommentsListType = {
  commentList: CommentsType[];
  hasNextPage: boolean;
};
