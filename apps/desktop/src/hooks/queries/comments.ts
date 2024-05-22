import { useMutation, useQueryClient, useQuery } from 'react-query';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { deleteComment, getComments, patchComment, postComment } from '../../api/comments';
import { QUERIES_KEY } from '../../core/common/queriesKey';
import { commentUpdateData, commentWriteData, editSelectId } from '../../recoil/trackPost/commentWriteData';
import { CommentsRequest } from '../../type/api';
import { CommentDataType } from '../../type/trackPost/commentDataType';
import useUploadAudioFile from '../common/useUploadAudioFile';

export function useComments(params: Omit<CommentsRequest, 'page'>) {
  const { data, ...restValues } = useQuery(QUERIES_KEY.GET_TRACK_COMMENT, getComments, {
    staleTime: Infinity,
  });

  return {
    trackComments: data,
    ...restValues,
  };
}

export function useUploadComment() {
  const queryClient = useQueryClient();
  const resetComment = useResetRecoilState(commentWriteData);
  const { resetAudio } = useUploadAudioFile();

  const { mutate, ...restValues } = useMutation({
    mutationFn: ({ trackId, formData }: { trackId: string; formData: CommentDataType }) =>
      postComment(trackId, formData),
    onSuccess: () => {
      resetAudio();
      resetComment();
      queryClient.invalidateQueries(QUERIES_KEY.GET_TRACK_COMMENT);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return {
    uploadComment: mutate,
    ...restValues,
  };
}

export function useEditComment(setIsEdit: (value: React.SetStateAction<boolean>) => void) {
  const queryClient = useQueryClient();
  const resetComment = useResetRecoilState(commentUpdateData);
  const [, setEditId] = useRecoilState(editSelectId);
  const { resetAudio } = useUploadAudioFile();

  const { mutate, ...restValues } = useMutation({
    mutationFn: ({ commentId, formData }: { commentId: string; formData: CommentDataType }) =>
      patchComment(commentId, formData),
    onSuccess: () => {
      resetAudio();
      setIsEdit(false);
      setEditId('');
      resetComment();
      queryClient.invalidateQueries(QUERIES_KEY.GET_TRACK_COMMENT);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return {
    editComment: mutate,
    ...restValues,
  };
}

export function useDeleteComment() {
  const queryClient = useQueryClient();
  const [, setEditId] = useRecoilState(editSelectId);

  const { mutate, ...restValues } = useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    onSuccess: () => {
      setEditId('');
      queryClient.invalidateQueries(QUERIES_KEY.GET_TRACK_COMMENT);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return {
    deleteComment: mutate,
    ...restValues,
  };
}
