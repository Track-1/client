import { ReactNode } from "react";
import styled from "styled-components";
import { theme } from "../../../style/theme";

interface StandardButtonProps {
  bgColor: string;
  fontColor: string;
  handleClickFunction: () => void;
  children?: ReactNode;
}

export default function StandardButton(props: StandardButtonProps) {
  const { bgColor, fontColor, handleClickFunction, children } = props;
  console.log(bgColor);
  return (
    <Container bgColor={bgColor} fontColor={fontColor} onClick={handleClickFunction}>
      {children}
    </Container>
  );
}

const Container = styled.button<{ bgColor: string; fontColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 55.9rem;
  height: 6.7rem;

  ${theme.fonts.body1};
  color: ${(props) => props.fontColor};
  background-color: ${(props) => props.bgColor};

  border-radius: 3.35rem;
`;
