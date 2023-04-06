import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BackBtnIc, ProfileEditSaveButtonActiveIc, ProfileEditSaveButtonIc } from "../../assets";
import BackButton from "../@common/backButton";

interface PropsType {
  editReady: boolean;
  editData: () => void;
}
export default function ProfileEditHeader(props: PropsType) {
  const { editReady, editData } = props;
  const navigate = useNavigate();

  function movePreviousPage() {
    navigate(-1);
  }
  return (
    <HeaderContainer>
      <BackButtonWrapper onClick={movePreviousPage}>
        <BackButton/>
      </BackButtonWrapper>
      {editReady ? <ProfileEditSaveButtonActiveIcon onClick={editData} /> : <ProfileEditSaveButtonIcon />}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;

  height: 13.8rem;
  width: 100%;

  position: sticky;
  z-index: 2;
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

  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  margin: 5.9rem 0 0 7.6rem;
`;
