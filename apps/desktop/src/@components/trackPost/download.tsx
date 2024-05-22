import styled from 'styled-components';
import { CloseDownloadIc, ClosedDownloadIc, OpenDownloadIc } from '../../assets';
import { useCloseTrack, useTrackDetail } from '../../hooks/queries/tracks';

export default function Download() {
  const { trackDetail } = useTrackDetail();
  const { closeTrack } = useCloseTrack();

  function checkIsMeOpen() {
    return trackDetail?.userSelf && !trackDetail?.trackClosed;
  }

  function checkIsMeClosed() {
    return trackDetail?.userSelf && trackDetail?.trackClosed;
  }

  function checkIsNotMeClosed() {
    return !trackDetail?.userSelf && trackDetail?.trackClosed;
  }

  function closeTrackPost() {
    closeTrack(-1);
  }

  function openTrackPost() {
    closeTrack(-1);
  }

  return (
    <DownloadButtonWrapper>
      {checkIsMeOpen() && <OpenDownloadIcon onClick={closeTrackPost} />}
      {checkIsMeClosed() && <CloseDownloadIcon onClick={openTrackPost} />}
      {checkIsNotMeClosed() && <ClosedDownloadIcon />}
    </DownloadButtonWrapper>
  );
}

const DownloadButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ClosedDownloadIcon = styled(ClosedDownloadIc)`
  height: 5.2rem;
  width: 24.6rem;

  margin-right: 2rem;
`;

const CloseDownloadIcon = styled(CloseDownloadIc)`
  height: 5.2rem;
  width: 17.6rem;

  margin-right: 2rem;
`;

const OpenDownloadIcon = styled(OpenDownloadIc)`
  height: 5.2rem;
  width: 17.6rem;

  margin-right: 2rem;
`;
