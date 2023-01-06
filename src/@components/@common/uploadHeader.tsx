import styled from "styled-components";
import { UploadBackIc, BackBtnIc, UploadBtnIc } from "../../assets";

export default function UploadHeader() {
  

  return (
    <Container>
      <HeaderWrapper>
        <LeftWrapper>
          <UploadBackIc />
          <UserClass>Vocal Searching</UserClass>
        </LeftWrapper>
        <UploadBtnIc />
      </HeaderWrapper>
    </Container>
  );
}

const Container = styled.header`
  height: 13.8rem;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  height: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 7.5rem;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UserClass = styled.div`
  ${({ theme }) => theme.fonts.comment};
  color: ${({ theme }) => theme.colors.gray3};
  margin-left: 6.1rem;
`;
