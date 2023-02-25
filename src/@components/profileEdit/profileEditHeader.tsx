import styled from "styled-components";
import { BackBtnIc, ProfileEditSaveButtonIc } from "../../assets";

interface PropsType {
  saveEditDatas: () => void;
}
export default function ProfileEditHeader(props: PropsType) {
  const { saveEditDatas } = props;

  return (
    <HeaderContainer>
      <BackButtonWrapper>
        <BackBtnIcon />
        <ButtonText>Back</ButtonText>
      </BackButtonWrapper>
      <ProfileEditSaveButtonIcon onClick={saveEditDatas} />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;

  height: 13.8rem;
  width: 100%;
`;

const BackButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  margin-left: 7.6rem;
`;

const BackBtnIcon = styled(BackBtnIc)`
  margin-right: 1.8rem;
`;

const ButtonText = styled.div`
  ${({ theme }) => theme.fonts.caption_large}

  color: ${({ theme }) => theme.colors.white};
`;

const ProfileEditSaveButtonIcon = styled(ProfileEditSaveButtonIc)`
  margin: 5rem 6.9rem 0 0;
`;
