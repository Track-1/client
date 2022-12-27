import Header from "../@components/@common/header";
import styled from "styled-components";
export default function MainPage() {
  return (
    <>
      <Container>
        <Header />
      </Container>
    </>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.sub3};
`;
