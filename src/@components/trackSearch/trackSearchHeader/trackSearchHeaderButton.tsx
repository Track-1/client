import { useRecoilValue } from "recoil";
import { useGetProducerProfile, useGetVocalProfile } from "../../../hooks/queries/mypage";
import { ProducerImageLayout, ProducerProfileImage } from "../../main/mypageButton";

import { loginUserId, loginUserType } from "../../../recoil/common/loginUserData";
import { ROLE } from "../../../core/common/roleType";
import styled from "styled-components";
import { RightArrorIc } from "../../../assets";
import { checkIsLogin } from "../../../utils/common/checkIsLogined";

export default function TrackSearchHeaderButton() {
  const userType = useRecoilValue(loginUserType);
  const userId = useRecoilValue(loginUserId);

  const { vocalProfile } = useGetVocalProfile(userId, userType);
  const { producerProfile } = useGetProducerProfile(userId, userType);

  function getUserImage() {
    return userType === ROLE.PRODUCER
      ? producerProfile?.userProfile.userImageFile
      : vocalProfile?.userProfile.userImageFile;
  }

  return (
    <>
      {checkIsLogin() ? (
        <HeaderButtonWrapper>
          <ProducerImageLayout>
            <ProducerProfileImage src={getUserImage()} alt="유저 프로필 이미지" />
          </ProducerImageLayout>
          <RightArrorIcon />
        </HeaderButtonWrapper>
      ) : (
        <div>hello~~</div>
      )}
    </>
  );
}

const HeaderButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
`;

const RightArrorIcon = styled(RightArrorIc)`
  margin-left: 1.4rem;
`;
