import { ReactNode } from "react";
import styled from "styled-components";
import { theme } from "../../style/theme";

interface PasswordContainerProps {
  height: number;
  containerInterval: number;
  title: string;
  titleIntervalTop: number;
  titleIntervalBottom: number;
  children: ReactNode;
}

export default function PasswordContainer(props: PasswordContainerProps) {
  const { height, containerInterval, title, titleIntervalTop, titleIntervalBottom, children } = props;

  return (
    <Container height={height} containerInterval={containerInterval}>
      <Title titleIntervalTop={titleIntervalTop} titleIntervalBottom={titleIntervalBottom}>
        {title}
      </Title>
      {children}
    </Container>
  );
}

const Container = styled.div<{ height: number; containerInterval: number }>`
  position: absolute;

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 77.9rem;
  height: ${(props) => props.height}rem;

  margin-top: ${(props) => props.containerInterval}rem;

  backdrop-filter: blur(1rem);
  border: 0.3rem solid transparent;
  border-radius: 5rem;
  background-image: linear-gradient(rgba(20, 21, 23, 0.6), rgba(20, 21, 23, 0.6)),
    linear-gradient(to top, transparent, #3e4045);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const Title = styled.h2<{ titleIntervalTop: number; titleIntervalBottom: number }>`
  color: ${theme.colors.white};
  ${theme.fonts.box_title};

  margin-top: ${(props) => props.titleIntervalTop}rem;
  margin-bottom: ${(props) => props.titleIntervalBottom}rem;
`;
