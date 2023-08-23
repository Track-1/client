import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { postComment } from "../../api/trackPost/postComment";
import { AddCommentIc, CloseCommentsBtnIc, ClosedAddCommentIc } from "../../assets";
import { QUERIES_KEY } from "../../core/common/queriesKey";
import useGetComment from "../../hooks/trackPost/useGetComment";
import useGetTrackInfo from "../../hooks/trackPost/useGetTrackInfo";
import { commentWriteData } from "../../recoil/trackPost/commentWriteData";
import { CommentType } from "../../type/trackPost/commentType";
import CommentBox from "./commentBox";
import CommentLayout from "./commentLayout";
import CommentWrite from "./commentWrite";

interface CommentsProp {
  handleClosecomment: () => void;
}

export default function Comments(props: CommentsProp) {
  const { handleClosecomment } = props;
  const { trackComments } = useGetComment(1);
  const { trackClosed } = useGetTrackInfo();
  const [comment, setComment] = useRecoilState(commentWriteData);
  const resetComment = useResetRecoilState(commentWriteData);
  const { id } = useParams();

  const queryClient = useQueryClient();

  const { mutate: uploadComment } = useMutation(() => postComment(comment, Number(id)), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERIES_KEY.GET_TRACK_COMMENT);
      resetComment();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function handleUploadComment() {
    if (comment?.commentAudioFile && comment?.commentContent?.length > 0) {
      uploadComment();
    }
  }

  return (
    <CommentLayout>
      <CloseCommentsBtnIcon onClick={handleClosecomment} />
      <CommentWrite isUpdate={false} />
      <AddCommentIconWrapper>
        {!trackClosed ? <AddCommentIcon onClick={handleUploadComment} /> : <ClosedAddCommentIcon />}
      </AddCommentIconWrapper>
      {trackComments?.map((eachComment: CommentType) => (
        <CommentBox key={eachComment?.commentId} eachComment={eachComment} />
      ))}
    </CommentLayout>
  );
}

const CloseCommentsBtnIcon = styled(CloseCommentsBtnIc)`
  width: 20rem;

  margin-bottom: 2.7rem;

  cursor: pointer;
`;

const AddCommentIcon = styled(AddCommentIc)`
  width: 19.9rem;
  margin-top: 1.9rem;
  margin-bottom: 1.4rem;
  cursor: pointer;
`;

const ClosedAddCommentIcon = styled(ClosedAddCommentIc)`
  width: 19.9rem;
  margin-top: 1.9rem;
  margin-bottom: 1.4rem;
`;

const AddCommentIconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
