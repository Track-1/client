import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { CommentsPlayerContext } from ".";
import { AddCommentIc, CloseCommentsBtnIc, ClosedAddCommentIc } from "../../assets";
import useInfiniteScroll from "../../hooks/common/useInfiniteScroll";
import { useComments, useUploadComment } from "../../hooks/queries/comments";
import { useTrackDetail } from "../../hooks/queries/tracks";
import { commentWriteData } from "../../recoil/trackPost/commentWriteData";
import { CommentType } from "../../type/trackPost/commentType";
import { blockAccess } from "../../utils/common/privateRouter";
import CommentBox from "./commentBox";
import CommentLayout from "./commentLayout";
import CommentWrite from "./commentWrite";

interface CommentsProp {
  handleClosecomment: (quitCommentAudio: () => void) => void;
  trackContextPlaying: boolean;
}

const PAGE_LIMIT = 5;

export default function Comments(props: CommentsProp) {
  const { id } = useParams();
  const { handleClosecomment, trackContextPlaying } = props;
  const { trackDetail } = useTrackDetail(Number(id));
  const [comment, setComment] = useRecoilState(commentWriteData);
  const { uploadComment } = useUploadComment();
  const { trackComments, fetchNextPage, hasNextPage } = useComments({
    limit: PAGE_LIMIT,
    trackId: Number(id),
  });
  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);
  const [playingTrack, setPLayingTrack] = useState<CommentType["commentId"] | null>(null);
  const { quitAudioForMovePage } = useContext(CommentsPlayerContext);
  const navigate = useNavigate();

  function selectTrack(trackId: CommentType["commentId"]) {
    setPLayingTrack(trackId);
  }

  function handleUploadComment() {
    if (!blockAccess()) {
      if (comment?.commentAudioFile && comment?.commentContent?.length > 0) {
        uploadComment({ trackId: Number(id), formData: comment });
      }
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    if (!trackContextPlaying) return;

    quitAudioForMovePage();
  }, [trackContextPlaying]);

  if (trackComments === undefined) return null;

  return (
    <CommentLayout>
      <CloseCommentsBtnIcon
        onClick={() => {
          handleClosecomment(quitAudioForMovePage);
        }}
      />
      <CommentWrite isUpdate={false} />
      <AddCommentIconWrapper>
        {!trackDetail?.trackClosed ? <AddCommentIcon onClick={handleUploadComment} /> : <ClosedAddCommentIcon />}
      </AddCommentIconWrapper>
      {trackComments?.map((eachComment: CommentType) => (
        <CommentBox
          key={eachComment?.commentId}
          eachComment={eachComment}
          playingTrack={playingTrack}
          selectTrack={selectTrack}
        />
      ))}
      <Observer ref={observerRef} />
    </CommentLayout>
  );
}

const Observer = styled.div`
  width: 100%;
  height: 10px;
`;

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
