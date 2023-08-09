import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import styled from "styled-components";
import { closeTrack } from "../../api/trackPost/closeTrack";
import { getFileLink } from "../../api/trackPost/getFileLink";
import { CloseDownloadIc, ClosedDownloadIc, DownloadIc, OpenDownloadIc } from "../../assets";
import useGetTrackInfo from "../../hooks/trackPost/useGetTrackInfo";

export default function Download() {
  const { isMe, isClosed, title, producerId } = useGetTrackInfo();
  const { id } = useParams();
  const [isDownload, setIsDownload] = useState<boolean | undefined>(undefined);
  //   const [link, setLink] = useState<string>("");

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

  const queryClient = useQueryClient();

  const { mutate: closeOrOpenDownload } = useMutation(closeTrack, {
    onSuccess: () => {
      queryClient.invalidateQueries("closing");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  function closeTrackPost() {
    closeOrOpenDownload(Number(id));
  }

  function openTrackPost() {
    closeOrOpenDownload(Number(id));
  }

  const { data: fileLink } = useQuery(["download"], () => getFileLink(producerId), {
    onSuccess: (data) => {
      let blob = new Blob([data?.data], { type: "audio/mpeg" });
      let url = window.URL.createObjectURL(blob); //s3링크

      // setLink(url);
      var a = document.createElement("a");
      a.href = url;
      a.download = `${title}`;
      document.body.appendChild(a);
      a.click();
      setTimeout((_: any) => {
        window.URL.revokeObjectURL(url);
      }, 60000);
      a.remove();
      setIsDownload(undefined);
    },
    onError: (error) => {
      console.log(error);
    },
    enabled: !!isDownload,
  });

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
