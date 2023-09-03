import { useMutation } from "react-query";
import { deleteComment, patchComment, postComment } from "../../api/comments";

export function useComments() {
  //무한스크롤 미적용
}

export function useUploadComment() {
  const { mutate, ...restValues } = useMutation({
    mutationFn: ({ trackId, formData }: { trackId: number; formData: FormData }) => postComment(trackId, formData),
    onSuccess: () => {},
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
