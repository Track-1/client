import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { PlayerContext } from '../../context/playerContext';
import { useTrackDetail, useTrackDownload } from '../../hooks/queries/tracks';
import Text from '../common/Text';
import { useMovePage } from '../../hooks/common/useMovePage';
import axios from 'axios';

interface DownloadProps {
  downloadId: number;
}

export default function Download(props: DownloadProps) {
  const { downloadId } = props;
  const { trackDetail, refetch: getTrackDetail } = useTrackDetail(Number(downloadId));
  const { data, refetch } = useTrackDownload(Number(downloadId));
  const { quitAudioForMovePage } = useContext(PlayerContext);
  const { checkUserPermission } = useMovePage();

  useEffect(() => {
    getTrackDetail();
    refetch();
  }, []);

  async function getDownloadLink(s3Link: string) {
    await axios
      .get(s3Link, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
        responseType: 'blob',
      })
      .then((response) => {
        let blob = new Blob([response?.data], { type: 'audio/mpeg' });
        let url = window.URL.createObjectURL(blob);

        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.target = '_blank';
        anchor.download = `${trackDetail?.trackTitle}`;
        document.body.appendChild(anchor);
        anchor.click();
        setTimeout((_: any) => {
          window.URL.revokeObjectURL(url);
        }, 1000);
        anchor.remove();
      });
  }

  function handleDownloadFile() {
    if (!checkUserPermission()) {
      quitAudioForMovePage();
    } else {
      if (data) {
        alert('파일의 용량에 따라 시간이 소요될 수 있습니다.');
        getDownloadLink(data.data.trackAudioFile);
      }
    }
  }

  return (
    <DownloadButton onClick={handleDownloadFile}>
      <Text as="span" font="Pre_16_R" color="black">
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
