import styled, { css } from "styled-components";
import { LogoutIc, ProducerTextIc, VocalTextIc } from "../../assets";
import { ROLE } from "../../core/common/roleType";

interface ProfileBoxProps {
  userType: string;
}

export default function ProfileBox(props: ProfileBoxProps) {
  const { userType } = props;
  return (
    <ProfileBoxContainer>
      <ProfileWrapper>
        {userType === ROLE.PRODUCER ? (
          <ProducerImageLayout>
            <ProfileImage
              src="https://profile-image-bucket.s3.ap-northeast-2.amazonaws.com/producerProfileImage/1681374447463-70846061.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZGIYUFCC2F2RR2UJ%2F20230930%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20230930T051833Z&X-Amz-Expires=900&X-Amz-Signature=fc8a8c547f7e4792bc9162b57a68f1c5d38556c331caf2fbdc167124423bc12a&X-Amz-SignedHeaders=host"
              userType={userType}
            />
          </ProducerImageLayout>
        ) : (
          <VocalImageLayout>
            <ProfileImage
              src="https://profile-image-bucket.s3.ap-northeast-2.amazonaws.com/producerProfileImage/1681374447463-70846061.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAZGIYUFCC2F2RR2UJ%2F20230930%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Date=20230930T051833Z&X-Amz-Expires=900&X-Amz-Signature=fc8a8c547f7e4792bc9162b57a68f1c5d38556c331caf2fbdc167124423bc12a&X-Amz-SignedHeaders=host"
              userType={userType}
            />
          </VocalImageLayout>
        )}
        <ProfileContentWrapper>
          <UserIdText>_Bepore</UserIdText>
          {userType === ROLE.PRODUCER ? <ProducerTextIcon /> : <VocalTextIcon />}
          <UserEmailText>yes7076@naver.com</UserEmailText>
        </ProfileContentWrapper>
      </ProfileWrapper>
      <LogoutWrapper>
        Logout
        <LogoutIcon />
      </LogoutWrapper>
    </ProfileBoxContainer>
  );
}

const ProfileBoxContainer = styled.div`
  position: absolute;
  z-index: 2;

  top: 12.4rem;
  right: 7rem;

  width: 37.1rem;
  height: 17.1rem;

  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.colors.gray5};
`;

const ProducerImageLayout = styled.div`
  width: 8rem;
  height: 8rem;

  border-radius: 50%;

  object-fit: cover;
  overflow: hidden;

  margin-right: 1.8rem;
`;

const ProfileContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const VocalImageLayout = styled.div`
  width: 8rem;
  height: 8rem;

  border-radius: 0.5rem;

  overflow: hidden;

  transform: rotate(-45deg);

  object-fit: cover;
  margin-right: 1.8rem;
`;

const UserIdText = styled.p`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.id};
`;

const UserEmailText = styled.p`
  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.description};
`;

const ProfileWrapper = styled.div`
  display: flex;

  width: 100%;
  height: 11.4rem;

  padding: 1.5rem 2.2rem;

  border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray3};
`;

const LogoutWrapper = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.fonts.body1};
  color: ${({ theme }) => theme.colors.white};

  width: 100%;
  height: 5.7rem;

  padding: 0.9rem 2rem;
`;

const LogoutIcon = styled(LogoutIc)`
  width: 4rem;

  cursor: pointer;
`;

const ProducerTextIcon = styled(ProducerTextIc)`
  width: 7.9rem;

  margin-bottom: 0.9rem;
`;

const VocalTextIcon = styled(VocalTextIc)`
  width: 7.9rem;

  margin-bottom: 0.9rem;
`;

const ProfileImage = styled.img<{ userType: string }>`
  width: 100%;
  height: 100%;
  ${(props) =>
    props.userType === ROLE.VOCAL &&
    css`
      transform: rotate(45deg);
    `}
`;
