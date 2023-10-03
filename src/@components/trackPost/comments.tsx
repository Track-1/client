import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { AddCommentIc, CloseCommentsBtnIc, ClosedAddCommentIc } from "../../assets";
import { PlayerProvider } from "../../context/playerContext";
import useInfiniteScroll from "../../hooks/common/useInfiniteScroll";
import { useComments, useUploadComment } from "../../hooks/queries/comments";
import { useTrackDetail } from "../../hooks/queries/tracks";
import { commentWriteData } from "../../recoil/trackPost/commentWriteData";
import { CommentType } from "../../type/trackPost/commentType";
import Player from "../@common/player";
import CommentBox from "./commentBox";
import CommentLayout from "./commentLayout";
import CommentWrite from "./commentWrite";

interface CommentsProp {
  handleClosecomment: () => void;
}

const PAGE_LIMIT = 5;

export default function Comments(props: CommentsProp) {
  const { id } = useParams();
  const { handleClosecomment } = props;
  const { trackDetail } = useTrackDetail(Number(id));
  const [comment, setComment] = useRecoilState(commentWriteData);
  const { uploadComment } = useUploadComment();
  const { trackComments, fetchNextPage, hasNextPage } = useComments({
    limit: PAGE_LIMIT,
    trackId: Number(id),
  });
  const { observerRef } = useInfiniteScroll(fetchNextPage, hasNextPage);
  const [playingTrack, setPLayingTrack] = useState<CommentType["commentId"] | null>(null);

  function selectTrack(trackId: CommentType["commentId"]) {
    setPLayingTrack(trackId);
  }

  if (trackComments === undefined) return null;

  function handleUploadComment() {
    if (comment?.commentAudioFile && comment?.commentContent?.length > 0) {
      uploadComment({ trackId: Number(id), formData: comment });
    }
  }

  return (
    <PlayerProvider>
      <CommentLayout>
        <CloseCommentsBtnIcon onClick={handleClosecomment} />
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
      <Player />
    </PlayerProvider>
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
