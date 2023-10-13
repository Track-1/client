import { useNavigate, useLocation } from "react-router";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useTrackDetail } from "../../hooks/queries/tracks";

export default function ProducerProfile() {
  const { id } = useParams();
  const { trackDetail } = useTrackDetail(Number(id));
  const navigate = useNavigate();
  const prevURL = useLocation().pathname;

  function handleMoveToProducerProfile() {
    // 플레이어 연결 후 작업 수정
    // pausesPlayerAudio();
    // closePlayer();

    navigate(`/producer-profile/${trackDetail?.trackUserId}`, {
      state: {
        prevURL: prevURL,
      },
    });
  }

  return (
    <ProducerBox>
      <ProfileImgWrapper>
        <ProducerProfileImage src={trackDetail?.userImageFile} alt="프로듀서 프로필 이미지" />
      </ProfileImgWrapper>
      <NickName onClick={handleMoveToProducerProfile}>{trackDetail?.trackUserName}</NickName>
    </ProducerBox>
  );
}

const ProducerBox = styled.div`
  display: flex;
  align-items: center;

  margin-top: 1.2rem;
  margin-bottom: 3.4rem;
`;

const ProfileImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 4.4rem;
  width: 4.4rem;
  margin-right: 1rem;

  border-radius: 6.5rem;
  overflow: hidden;
`;

const ProducerProfileImage = styled.img`
  height: 100%;
  width: 100%;
  transform: translate(50, 50);
  object-fit: cover;
  margin: auto;
`;

const NickName = styled.strong`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.id}

  cursor: pointer;
  :hover {
    color: ${({ theme }) => theme.colors.sub1};
  }
`;
