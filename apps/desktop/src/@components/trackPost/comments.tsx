import styled from 'styled-components';
import CommentBox from './commentBox';
import CommentLayout from './commentLayout';
import CommentWrite from './commentWrite';
import { useEffect, useState } from 'react';
import { CloseCommentsBtnIc } from '../../assets';
import { useComments } from '../../hooks/queries/comments';
import { CommentType } from '../../type/trackPost/commentType';
import { PlayUseContext } from '../../context/playerContext';

interface CommentsProp {
  handleClosecomment: (quitCommentAudio: () => void) => void;
  trackContextPlaying: boolean;
}

const PAGE_LIMIT = 5;

export default function Comments(props: CommentsProp) {
  const { handleClosecomment, trackContextPlaying } = props;
  const { trackComments } = useComments({
    limit: PAGE_LIMIT,
    trackId: -1,
  });
  const { quitAudioForMovePage } = PlayUseContext({ scope: 'comments' });
  const [playingTrack, setPLayingTrack] = useState<CommentType['commentId'] | null>(null);

  function selectTrack(trackId: CommentType['commentId']) {
    setPLayingTrack(trackId);
  }

  useEffect(() => {
    if (!trackContextPlaying) return;

    quitAudioForMovePage();
  }, [trackContextPlaying]);

  if (trackComments === undefined) return null;

  return (
    <>
      <CommentLayout>
        <CloseCommentsBtnIcon
          onClick={() => {
            handleClosecomment(quitAudioForMovePage);
          }}
        />
        <CommentWrite isUpdate={false} />
        {trackComments.commentList?.map((eachComment: CommentType) => (
          <CommentBox
            key={eachComment?.commentId}
            eachComment={eachComment}
            playingTrack={playingTrack}
            selectTrack={selectTrack}
          />
        ))}
      </CommentLayout>
    </>
  );
}

const CloseCommentsBtnIcon = styled(CloseCommentsBtnIc)`
  width: 20rem;

  margin-bottom: 2.7rem;

  cursor: pointer;
`;
