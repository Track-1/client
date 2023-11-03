import { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { useParams } from "react-router";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CloseDownloadIc, ClosedDownloadIc, DownloadIc, OpenDownloadIc } from "../../assets";
import { PlayerContext } from "../../context/playerContext";
import { useCloseTrack, useTrackDetail, useTrackDownload } from "../../hooks/queries/tracks";
import { blockAccess } from "../../utils/common/privateRouter";

export default function Download() {
  const { id } = useParams();
  const prevURL = useLocation();
  const [isDownload, setIsDownload] = useState<boolean | undefined>(undefined);
  const queryClient = useQueryClient();
  const { trackDetail } = useTrackDetail(Number(id));
  const { closeTrack } = useCloseTrack();
  const { trackDownload } = useTrackDownload(Number(id), isDownload, getFileLink);
  const navigate = useNavigate();
  const { quitAudioForMovePage } = useContext(PlayerContext);

  function getFileLink(data: any) {
    let blob = new Blob([data?.data], { type: "audio/mpeg" });
    let url = window.URL.createObjectURL(blob); //s3링크
    console.log(blob);

    var a = document.createElement("a");
    a.href = url;
    a.download = `${trackDetail?.trackTitle}`;
    document.body.appendChild(a);
    a.click();
    setTimeout((_: any) => {
      window.URL.revokeObjectURL(url);
    }, 60000);
    a.remove();
    setIsDownload(undefined);
  }

  function checkIsMeOpen() {
    return trackDetail?.userSelf && !trackDetail?.trackClosed;
  }

  function checkIsMeClosed() {
    return trackDetail?.userSelf && trackDetail?.trackClosed;
  }

  function checkIsNotMeOpen() {
    return !trackDetail?.userSelf && !trackDetail?.trackClosed;
  }

  function checkIsNotMeClosed() {
    return !trackDetail?.userSelf && trackDetail?.trackClosed;
  }

  function closeTrackPost() {
    closeTrack(Number(id));
  }

  function openTrackPost() {
    closeTrack(Number(id));
  }

  function getFile() {
    if (blockAccess()) {
      quitAudioForMovePage();
      navigate("/login", {
        state: {
          prevURL: prevURL,
        },
      });
    } else {
      !isDownload && setIsDownload(true);
    }
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
