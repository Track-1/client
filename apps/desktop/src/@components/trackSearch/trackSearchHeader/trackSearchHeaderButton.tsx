import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { RightArrorIc } from "../../../assets";
import { ROLE } from "../../../core/common/roleType";
import { useGetProducerProfile, useGetVocalProfile } from "../../../hooks/queries/mypage";
import { loginUserId, loginUserType } from "../../../recoil/common/loginUserData";
import { checkIsLogin } from "../../../utils/common/checkIsLogined";

export default function TrackSearchHeaderButton() {
  const userType = useRecoilValue(loginUserType);
  const userId = useRecoilValue(loginUserId);

  const { vocalProfile } = useGetVocalProfile(userId);
  const { producerProfile } = useGetProducerProfile(userId);
  const prevURL = useLocation().pathname;

  const navigate = useNavigate();

  function getUserImage() {
    return userType === ROLE.PRODUCER
      ? producerProfile?.userProfile.userImageFile
      : vocalProfile?.userProfile.userImageFile;
  }

  function handleMoveToProfile() {
    if (userType === ROLE.PRODUCER) {
      navigate(`/producer-profile/${userId}`, {
        state: {
          prevURL: prevURL,
        },
      });
    } else {
      navigate(`/vocal-profile/${userId}`, {
        state: {
          prevURL: prevURL,
        },
      });
    }
  }

  return (
    <>
      {checkIsLogin() && (
        <HeaderButtonWrapper onClick={handleMoveToProfile}>
          {userType === ROLE.PRODUCER ? (
            <ProfileImageLayout>
              <ProfileImage src={getUserImage()} alt="유저 프로필 이미지" />
            </ProfileImageLayout>
          ) : (
            <VocalProfileImageWrapper>
              <VocalProfileImage src={getUserImage()} alt="유저 프로필 이미지" />
            </VocalProfileImageWrapper>
          )}

          <RightArrorIcon />
        </HeaderButtonWrapper>
      )}
    </>
  );
}

const VocalProfileImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  margin-left: 0.5rem;

  width: 4rem;
  height: 4rem;

  transform: rotate(45deg);
  overflow: hidden;
  border-radius: 0.5rem;
  border: 0.15rem solid ${({ theme }) => theme.colors.white};
`;

const VocalProfileImage = styled.img`
  height: 6rem;
  width: 6rem;

  border-radius: 50%;

  transform: rotate(-45deg);
`;

const HeaderButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
`;

const RightArrorIcon = styled(RightArrorIc)`
  margin-left: 1.4rem;
`;

export const ProfileImageLayout = styled.div`
  width: 4.6rem;
  height: 4.6rem;

  border-radius: 50%;
  border: 0.1rem solid ${({ theme }) => theme.colors.white};

  object-fit: cover;
  overflow: hidden;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
`;
