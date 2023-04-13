import styled from "styled-components";
import { BackBtnIc, BackButtonIc } from "../../assets";
import { useNavigate } from "react-router-dom";

export default function SignUpBackButton() {
  const navigate = useNavigate();

  function movePreviousPage() {
    if (window.confirm('Are you sure to terminate to signing up?\n회원가입을 종료하시겠습니까?'))
    {
        navigate('/');
    }

  }

  return (
    <ButtonContainer onClick={movePreviousPage}>
      <BackButtonIcon/>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.div`
  width: 11.4rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  cursor: pointer;
`;

const ButtonText = styled.strong`
  ${({ theme }) => theme.fonts.id}

  color: ${({ theme }) => theme.colors.white};
`;


const BackButtonIcon=styled(BackButtonIc)`
  width: 11.4rem;
`