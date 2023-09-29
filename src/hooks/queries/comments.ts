import { useInfiniteQuery, useMutation, useQueryClient } from "react-query";
import { useResetRecoilState } from "recoil";
import { deleteComment, getComments, patchComment, postComment } from "../../api/comments";
import { QUERIES_KEY } from "../../core/common/queriesKey";
import { commentWriteData } from "../../recoil/trackPost/commentWriteData";
import { CommentsRequest } from "../../type/api";
import { CommentDataType } from "../../type/trackPost/commentDataType";

export function useComments(params: Omit<CommentsRequest, "page">) {
  const fetchVocals = async (pageParams: number) => {
    const response = await getComments({ ...params, page: pageParams, trackId: params.trackId });

    return { response, nextPage: pageParams + 1 };
  };

  const { data, fetchNextPage, hasNextPage, ...restValues } = useInfiniteQuery(
    QUERIES_KEY.GET_TRACK_COMMENT,
    ({ pageParam = 1 }) => fetchVocals(pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.response.length === 0 ? undefined : lastPage.nextPage;
      },
    },
  );

  const trackComments = data?.pages.flatMap(({ response }) => response.flatMap(({ commentList }: any) => commentList));

  return {
    trackComments,
    fetchNextPage,
    hasNextPage,
    ...restValues,
  };
}

export function useUploadComment() {
  const queryClient = useQueryClient();
  const resetComment = useResetRecoilState(commentWriteData);

  const { mutate, ...restValues } = useMutation({
    mutationFn: ({ trackId, formData }: { trackId: number; formData: CommentDataType }) =>
      postComment(trackId, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES_KEY.GET_TRACK_COMMENT);
      resetComment();
    },
    onError: () => {},
  });
  return {
    uploadComment: mutate,
    ...restValues,
  };
}

export function useEditComment() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: ({ commentId, formData }: { commentId: number; formData: FormData }) =>
      patchComment(commentId, formData),
    onSuccess: () => {},
    onError: () => {},
  });
  return {
    editComment: mutate,
    ...restValues,
  };
}

export function useDeleteComment() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: (commentId: number) => deleteComment(commentId),
    onSuccess: () => {},
    onError: () => {},
  });
  return {
    deleteComment: mutate,
    ...restValues,
  };
}
