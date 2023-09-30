import styled, { css } from "styled-components";
import { ROLE } from "../../core/common/roleType";

interface MypageButtonProps {
  userType: string;
}

export default function MypageButton(props: MypageButtonProps) {
  const { userType } = props;

  return (
    <Container userType={userType}>
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
      <UserIdText>{"_Bepore"}</UserIdText>
    </Container>
  );
}

const Container = styled.button<{ userType: string }>`
  display: flex;
  align-items: center;

  width: 19.5rem;
  height: 5.2rem;

  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.id};

  border-radius: 3rem;

  padding: 1rem 1.3rem;

  background-color: ${(props) =>
    props.userType === ROLE.PRODUCER ? ({ theme }) => theme.colors.sub1 : ({ theme }) => theme.colors.sub2};
`;

const UserIdText = styled.p`
  margin-left: 1.2rem;
`;

const ProducerImageLayout = styled.div`
  width: 3.2rem;
  height: 3.2rem;

  border-radius: 50%;
  border: 0.1rem solid ${({ theme }) => theme.colors.black};

  object-fit: cover;
  overflow: hidden;
`;

const VocalImageLayout = styled.div`
  width: 3.2rem;
  height: 3.2rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.black};

  border-radius: 0.5rem;
  overflow: hidden;

  transform: rotate(-45deg);

  object-fit: cover;

  cursor: pointer;
`;

const VocalProfileImageWrapper = styled.div`
  width: 3.2rem;
  height: 3.2rem;
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
