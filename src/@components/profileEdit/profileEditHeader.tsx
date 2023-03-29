import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BackBtnIc, ProfileEditSaveButtonActiveIc, ProfileEditSaveButtonIc } from "../../assets";
import BackButton from "../@common/backButton";

interface PropsType {
  saveEditDatas: () => void;
  isMeetRequired: boolean;
}
export default function ProfileEditHeader(props: PropsType) {
  const { saveEditDatas, isMeetRequired } = props;
  const navigate = useNavigate();

  return (
    <HeaderContainer>
      <ButtonWrapper>
      <BackButton/>
      </ButtonWrapper>
      {isMeetRequired ? <ProfileEditSaveButtonActiveIcon onClick={saveEditDatas} /> : <ProfileEditSaveButtonIcon />}
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
  width: 24.6rem;
  margin: 5rem 6.9rem 0 0;
`;

const ProfileEditSaveButtonActiveIcon = styled(ProfileEditSaveButtonActiveIc)`
  width: 24.6rem;
  margin: 5rem 6.9rem 0 0;
`;

const ButtonWrapper=styled.div`
  margin: 5.9rem 0 0 7.6rem;
`