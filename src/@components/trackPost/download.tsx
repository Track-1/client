import styled from "styled-components";
import { CloseDownloadIc, ClosedDownloadIc, DownloadIc, OpenDownloadIc } from "../../assets";
import useGetTrackInfo from "../../hooks/trackPost/useGetTrackInfo";

export default function Download() {
  const { isMe, isClosed } = useGetTrackInfo();

  function checkIsMeOpen() {
    return isMe && !isClosed;
  }

  function checkIsMeClosed() {
    return isMe && isClosed;
  }

  function checkIsNotMeOpen() {
    return !isMe && !isClosed;
  }

  function checkIsNotMeClosed() {
    return !isMe && isClosed;
  }

  return (
    <DownloadButtonWrapper>
      {checkIsMeOpen() && <OpenDownloadIcon onClick={closeTrackPost} />}
      {checkIsMeClosed() && <CloseDownloadIcon onClick={openTrackPost} />}
      {checkIsNotMeOpen() && <DownloadIcon onClick={getFile} />}
      {checkIsNotMeClosed() && <ClosedDownloadIcon />}
    </DownloadButtonWrapper>
  );
}

const DownloadButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const DownloadIcon = styled(DownloadIc)`
  height: 5.2rem;
  width: 24.6rem;

  margin-right: 2rem;
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
