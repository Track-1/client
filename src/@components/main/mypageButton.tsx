import { useEffect } from "react";
import styled from "styled-components";
import { ROLE } from "../../core/common/roleType";
import useModal from "../../hooks/common/useModal";
import ProfileBox from "./profileBox";

interface MypageButtonProps {
  userType: string;
  userImage: string | undefined;
  userName: string | undefined;
  userContact: string | undefined;
}

export default function MypageButton(props: MypageButtonProps) {
  const { userType, userImage, userName, userContact } = props;

  const { openModal, unShowModal, handleShowUpdateModal } = useModal();

  useEffect(() => {
    unShowModal();
  }, []);

  return (
    <>
      <Container userType={userType} onClick={handleShowUpdateModal}>
        {userType === ROLE.PRODUCER ? (
          <ProducerImageLayout>
            <ProducerProfileImage src={userImage} alt="유저 프로필 이미지" />
          </ProducerImageLayout>
        ) : (
          <VocalUploadImageContainer>
            <VocalImageFrame>
              <VocalUploadImageLayout src={userImage} alt="유저 프로필 이미지" />
            </VocalImageFrame>
          </VocalUploadImageContainer>
        )}

        <UserNameText>{userName}</UserNameText>
      </Container>
      {openModal && (
        <ProfileBox userType={userType} userImage={userImage} userName={userName} userContact={userContact} />
      )}
    </>
  );
}

const Container = styled.button<{ userType: string }>`
  display: flex;
  align-items: center;

  width: 100%;
  height: 5.2rem;

  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.id};

  border-radius: 3rem;

  padding: 1rem 1.2rem;

  background-color: ${(props) =>
    props.userType === ROLE.PRODUCER ? ({ theme }) => theme.colors.sub1 : ({ theme }) => theme.colors.sub2};
`;

const UserNameText = styled.p`
  margin-left: 1.2rem;
`;

export const ProducerImageLayout = styled.div`
  width: 3.2rem;
  height: 3.2rem;

  border-radius: 50%;
  border: 0.1rem solid ${({ theme }) => theme.colors.black};

  object-fit: cover;
  overflow: hidden;
`;

export const ProducerProfileImage = styled.img`
  width: 100%;
  height: 100%;
`;

const VocalUploadImageContainer = styled.div`
  display: flex;
  align-items: center;

  width: 3.2rem;
  height: 3.2rem;
`;

const VocalImageFrame = styled.div`
  height: 2.24rem;
  width: 2.24rem;

  margin-left: 0.3rem;

  border: 0.1rem solid ${({ theme }) => theme.colors.black};
  border-radius: 0.3rem;

  overflow: hidden;
  object-fit: cover;

  transform: rotate(-45deg);

  cursor: pointer;
`;

const VocalUploadImageLayout = styled.img`
  width: 3.2rem;
  height: 3.2rem;

  margin-top: -0.5rem;
  margin-left: -0.5rem;

  transform: rotate(45deg);
  object-fit: cover;
`;
