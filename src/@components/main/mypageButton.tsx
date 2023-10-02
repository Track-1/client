import styled, { css } from "styled-components";
import { ROLE } from "../../core/common/roleType";
import ProfileBox from "./profileBox";
import useModal from "../../hooks/common/useModal";

interface MypageButtonProps {
  userType: string;
  userImage: string | undefined;
  userName: string | undefined;
  userContact: string | undefined;
}

export default function MypageButton(props: MypageButtonProps) {
  const { userType, userImage, userName, userContact } = props;

  const { openModal, handleShowUpdateModal } = useModal();

  return (
    <>
      <Container userType={userType} onClick={handleShowUpdateModal}>
        {userType === ROLE.PRODUCER ? (
          <ProducerImageLayout>
            <ProfileImage src={userImage} userType={userType} />
          </ProducerImageLayout>
        ) : (
          <VocalImageLayout>
            <ProfileImage src={userImage} userType={userType} />
          </VocalImageLayout>
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

  width: 19.5rem;
  height: 5.2rem;

  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.id};

  border-radius: 3rem;

  padding: 1rem 1.3rem;

  background-color: ${(props) =>
    props.userType === ROLE.PRODUCER ? ({ theme }) => theme.colors.sub1 : ({ theme }) => theme.colors.sub2};
`;

const UserNameText = styled.p`
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
