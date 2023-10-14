import { PropsWithChildren, ReactNode } from "react";
import styled from "styled-components";

interface HeaderProps {
  headerStyle?: React.CSSProperties;
  children?: ReactNode;
}

export default function Header(props: PropsWithChildren<HeaderProps>) {
  const { headerStyle, children } = props;

  return (
    <Container style={headerStyle}>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
}

const Container = styled.header`
  display: flex;
  justify-content: center;

  width: 100%;
  height: 14.3rem;

  background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 100%);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 177rem;
  height: 100%;
`;
