import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PlayerContext } from '../../context/playerContext';
import { useCloseTrack, useTrackDetail, useTrackDownload } from '../../hooks/queries/tracks';
import { blockAccess } from '../../utils/common/privateRouter';
import Text from '../common/Text';
import axios from 'axios';

interface DownloadProps {
  downloadId: number;
}

export default function Download(props: DownloadProps) {
  const { downloadId } = props;
  const prevURL = useLocation();
  const [isDownload, setIsDownload] = useState<boolean | undefined>(undefined);
  const { trackDetail } = useTrackDetail(Number(downloadId));
  const { closeTrack } = useCloseTrack();
  const { trackDownload, isSuccess } = useTrackDownload(Number(downloadId), isDownload);
  const navigate = useNavigate();
  const { quitAudioForMovePage } = useContext(PlayerContext);

  useEffect(() => {
    if (isSuccess) {
      trackDownload && getFileLink(trackDownload?.trackAudioFile);
    }
  }, [isSuccess]);

  async function getFileLink(audioFile: string) {
    console.log(audioFile);
    const audioFileBlob = await axios.get(audioFile, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'blob',
    });

    let blob = new Blob([audioFileBlob.data], { type: 'audio/mpeg' });
    let url = window.URL.createObjectURL(blob); //s3링크

    var a = document.createElement('a');
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
    closeTrack(Number(downloadId));
  }

  function openTrackPost() {
    closeTrack(Number(downloadId));
  }

  function getFile() {
    if (blockAccess()) {
      quitAudioForMovePage();
      navigate('/login', {
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
    <DownloadButton onClick={getFile}>
      <Text as="h5" font="Pre_16_R" color="black">
        Download
      </Text>
    </DownloadButton>
  );
}

const DownloadButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 28.8rem;
  height: 4.8rem;

  background-color: ${({ theme }) => theme.colors.neon_green};
  border-radius: 4rem;
`;
