import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PlayerContext } from '../../context/playerContext';
import { useCloseTrack, useTrackDetail, useTrackDownload } from '../../hooks/queries/tracks';
import Text from '../common/Text';
import { useMovePage } from '../../hooks/common/useMovePage';

interface DownloadProps {
  downloadId: number;
}

export default function Download(props: DownloadProps) {
  const { downloadId } = props;
  const prevURL = useLocation();
  const [isDownload, setIsDownload] = useState<boolean | undefined>(undefined);
  const { trackDetail } = useTrackDetail(Number(downloadId));
  const { closeTrack } = useCloseTrack();
  const { trackDownload } = useTrackDownload(Number(downloadId), isDownload, getFileLink);
  const navigate = useNavigate();
  const { quitAudioForMovePage } = useContext(PlayerContext);
  const { checkUserPermission } = useMovePage();

  function getFileLink(data: any) {
    let blob = new Blob([data?.data], { type: 'audio/mpeg' });
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

  function getFile() {
    if (checkUserPermission()) {
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
