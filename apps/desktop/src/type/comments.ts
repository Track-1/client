export interface CommentsParamsType {
  page: number;
  limit: number;
}

interface CommentsType {
  commentId: string;
  commentAudioFile: string;
  userName: string;
  userImageFile: string;
  userSelf: boolean;
  commentContent: string;
  commentAudioFileLength: number;
  commentUserId: string;
  commentAudioFileName: string;
}

export type CommentsListType = {
  commentList: CommentsType[];
};
