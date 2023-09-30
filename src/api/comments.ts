import { CommentsRequest, CommentsResponse, DefaultResponseType } from "../type/api";
import { CommentDataType } from "../type/trackPost/commentDataType";
import { client } from "./common/client";
import { COMMENTS } from "./path";

export async function getComments(params: CommentsRequest) {
  const { data } = await client.get<CommentsResponse>(COMMENTS.LIST(params.trackId), {
    params: {
      page: params.page,
      limit: params.limit,
    },
  });
  return data.data;
}

export async function postComment(trackId: number, formData: CommentDataType) {
  const { data } = await client.post<DefaultResponseType>(COMMENTS.POST(trackId), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function patchComment(commentId: number, formData: CommentDataType) {
  const { data } = await client.patch<DefaultResponseType>(COMMENTS.PATCH(commentId), formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function deleteComment(commentId: number) {
  const { data } = await client.delete<DefaultResponseType>(COMMENTS.DELETE(commentId));
  return data;
}
