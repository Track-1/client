import { CommentsResponse, DefaultResponseType } from '../type/api';
import { CommentDataType } from '../type/trackPost/commentDataType';
import { client } from './common/client';
import { COMMENTS } from './path';

export async function getComments() {
  const { data } = await client.get<CommentsResponse>(COMMENTS.LIST);
  return data.data;
}

export async function postComment(trackId: string, formData: CommentDataType) {
  const { data } = await client.post<DefaultResponseType>(COMMENTS.POST, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}

export async function patchComment(commentId: string, formData: CommentDataType) {
  const { data } = await client.patch<DefaultResponseType>(COMMENTS.PATCH, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}

export async function deleteComment(commentId: string) {
  const { data } = await client.delete<DefaultResponseType>(COMMENTS.DELETE);
  return data;
}
