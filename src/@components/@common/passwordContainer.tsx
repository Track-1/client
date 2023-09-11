import { ReactNode } from "react";
import styled from "styled-components";
import { theme } from "../../style/theme";

interface PasswordContainerProps {
  containerInterval: number;
  title: string;
  titleInterval: number;
  children: ReactNode;
}

export default function PasswordContainer(props: PasswordContainerProps) {
  const { containerInterval, title, titleInterval, children } = props;

  return (
    <Container containerInterval={containerInterval}>
      <Title titleInterval={titleInterval}>{title}</Title>
      {children}
    </Container>
  );
}

const Container = styled.div<{ containerInterval: number }>`
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 77.9rem;
  height: 57rem;

  margin-top: ${(props) => props.containerInterval}rem;

  backdrop-filter: blur(1rem);
  border: 0.3rem solid transparent;
  border-radius: 5rem;
  background-image: linear-gradient(rgba(20, 21, 23, 0.6), rgba(20, 21, 23, 0.6)),
    linear-gradient(to top, transparent, #3e4045);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const Title = styled.h2<{ titleInterval: number }>`
  color: ${theme.colors.white};
  ${theme.fonts.box_title};

  margin-top: ${(props) => props.titleInterval}rem;
`;
