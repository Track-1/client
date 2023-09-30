import { useState } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router";
import styled from "styled-components";
import { CloseDownloadIc, ClosedDownloadIc, DownloadIc, OpenDownloadIc } from "../../assets";
import { useCloseTrack, useTrackDownload } from "../../hooks/queries/tracks";
import useGetTrackInfo from "../../hooks/trackPost/useGetTrackInfo";

export default function Download() {
  const { userSelf, trackClosed, trackTitle } = useGetTrackInfo();
  const { id } = useParams();
  const [isDownload, setIsDownload] = useState<boolean | undefined>(undefined);
  const queryClient = useQueryClient();
  const { closeTrack } = useCloseTrack();
  const { trackDownload } = useTrackDownload(Number(id), isDownload, getFileLink);

  function getFileLink(data: any) {
    let blob = new Blob([data?.data], { type: "audio/mpeg" });
    let url = window.URL.createObjectURL(blob); //s3링크

    var a = document.createElement("a");
    a.href = url;
    a.download = `${trackTitle}`;
    document.body.appendChild(a);
    a.click();
    setTimeout((_: any) => {
      window.URL.revokeObjectURL(url);
    }, 60000);
    a.remove();
    setIsDownload(undefined);
  }

  function checkIsMeOpen() {
    return userSelf && !trackClosed;
  }

  function checkIsMeClosed() {
    return userSelf && trackClosed;
  }

  function checkIsNotMeOpen() {
    return !userSelf && !trackClosed;
  }

  function checkIsNotMeClosed() {
    return !userSelf && trackClosed;
  }

  function closeTrackPost() {
    closeTrack(Number(id));
  }

  function openTrackPost() {
    closeTrack(Number(id));
  }

  function getFile() {
    // 프라이빗 라우터 추후 적용
    // if (blockAccess()) {
    //   pauseAudio();
    //   navigate("/login");
    // } else {
    // !download && setDownload(true);
    // }
    setIsDownload(true);
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
